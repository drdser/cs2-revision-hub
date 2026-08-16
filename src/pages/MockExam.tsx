import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GradedQuestion, MockExamResult, QuestionType } from '../types';
import { gradedQuestions } from '../data/questions';
import { useProgress } from '../hooks/useProgress';
import { gradeQuestion } from '../utils/grading';
import { seededShuffle } from '../utils/filters';
import { CHAPTER_TITLE, TYPE_LABEL } from '../utils/labels';
import { QuestionCard } from '../components/questions/QuestionCard';
import { Button, Callout, Card, PageHeader, ProgressBar } from '../components/ui';

/**
 * Paper structure.
 *
 * The current review sheet is the guide: it is dominated by true/false and
 * multiple choice, with one output-tracing item, one missing-keyword item and
 * two code-completion items. The mock scales that shape up to a full paper.
 */
const BLUEPRINT: { type: QuestionType; count: number }[] = [
  { type: 'true-false', count: 10 },
  { type: 'mcq', count: 10 },
  { type: 'output', count: 3 },
  { type: 'fill-blank', count: 2 },
  { type: 'code-completion', count: 3 },
];

const TOTAL = BLUEPRINT.reduce((sum, b) => sum + b.count, 0);
const DEFAULT_MINUTES = 60;

type Phase = 'setup' | 'running' | 'review';

function buildPaper(seed: number): GradedQuestion[] {
  const paper: GradedQuestion[] = [];
  for (const { type, count } of BLUEPRINT) {
    const pool = gradedQuestions.filter((q) => q.type === type);
    // A distinct seed per section, so two sections never draw the same ordering.
    paper.push(...seededShuffle(pool, seed + type.length * 977).slice(0, count));
  }
  return paper;
}

function formatClock(totalSeconds: number): string {
  const m = Math.floor(Math.max(0, totalSeconds) / 60);
  const s = Math.max(0, totalSeconds) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function MockExam() {
  const { addMockResult, recordAttempt, mockResults } = useProgress();

  const [phase, setPhase] = useState<Phase>('setup');
  const [seed, setSeed] = useState(() => Date.now() % 100000);
  const [timed, setTimed] = useState(true);
  const [minutes, setMinutes] = useState(DEFAULT_MINUTES);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_MINUTES * 60);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<MockExamResult | null>(null);

  const paper = useMemo(() => buildPaper(seed), [seed]);

  const submit = useCallback(() => {
    const byChapter: Record<string, [number, number]> = {};
    const byType: Record<string, [number, number]> = {};
    let score = 0;

    for (const q of paper) {
      const raw = answers[q.id] ?? '';
      const isCorrect = raw.trim() !== '' && gradeQuestion(q, raw);
      if (isCorrect) score += 1;

      byChapter[q.chapter] ??= [0, 0];
      byType[q.type] ??= [0, 0];
      byChapter[q.chapter][1] += 1;
      byType[q.type][1] += 1;
      if (isCorrect) {
        byChapter[q.chapter][0] += 1;
        byType[q.type][0] += 1;
      }

      // Only answered questions feed the overall progress figures.
      if (raw.trim() !== '') {
        recordAttempt(q.id, isCorrect ? 'correct' : 'incorrect');
      }
    }

    const summary: MockExamResult = {
      id: `mock-${seed}-${paper.length}`,
      at: Date.now(),
      score,
      total: paper.length,
      byChapter,
      byType,
    };
    setResult(summary);
    addMockResult(summary);
    setPhase('review');
  }, [answers, paper, seed, addMockResult, recordAttempt]);

  // Countdown. Auto-submits when the clock reaches zero.
  useEffect(() => {
    if (phase !== 'running' || !timed) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          submit();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, timed, submit]);

  const start = () => {
    setSeed(Date.now() % 100000);
    setAnswers({});
    setResult(null);
    setSecondsLeft(minutes * 60);
    setPhase('running');
  };

  const answeredCount = paper.filter((q) => (answers[q.id] ?? '').trim() !== '').length;

  // ------------------------------------------------------------------ setup
  if (phase === 'setup') {
    return (
      <>
        <PageHeader
          icon="🧪"
          title="Mock Final Exam"
          subtitle={`A ${TOTAL}-question paper built to match the shape of the current review sheet. Answers stay hidden until you submit.`}
        />

        <Card className="p-5">
          <h2 className="mb-3 font-semibold text-ink">Paper structure</h2>
          <ul className="mb-5 space-y-1.5 text-sm text-ink-2">
            {BLUEPRINT.map((b) => (
              <li key={b.type} className="flex justify-between border-b border-line py-1.5">
                <span>{TYPE_LABEL[b.type]}</span>
                <span className="font-mono tabular-nums">{b.count}</span>
              </li>
            ))}
            <li className="flex justify-between py-1.5 font-semibold text-ink">
              <span>Total</span>
              <span className="font-mono tabular-nums">{TOTAL}</span>
            </li>
          </ul>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={timed}
                onChange={(e) => setTimed(e.target.checked)}
                className="h-4 w-4 accent-[color:var(--accent)]"
              />
              Use a timer
            </label>

            <label className="flex items-center gap-2 text-sm text-ink">
              Minutes
              <input
                type="number"
                min={5}
                max={180}
                value={minutes}
                disabled={!timed}
                onChange={(e) =>
                  setMinutes(Math.min(180, Math.max(5, Number(e.target.value) || DEFAULT_MINUTES)))
                }
                className="w-20 rounded-lg border border-line bg-card px-2 py-1 text-sm text-ink disabled:opacity-50"
              />
            </label>
          </div>

          <Callout>
            Exam mode: nothing is revealed until you submit. A different set of questions is
            drawn each time you start.
          </Callout>

          <div className="mt-5">
            <Button onClick={start}>Start exam</Button>
          </div>
        </Card>

        {mockResults.length > 0 && (
          <section aria-labelledby="history-heading" className="mt-8">
            <h2 id="history-heading" className="mb-3 text-lg font-semibold text-ink">
              Previous attempts
            </h2>
            <Card className="divide-y divide-line">
              {mockResults.map((r) => (
                <div key={r.id + r.at} className="flex items-center justify-between p-4">
                  <span className="text-sm text-ink-2">
                    {new Date(r.at).toLocaleString()}
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-ink">
                    {r.score}/{r.total} ({Math.round((r.score / r.total) * 100)}%)
                  </span>
                </div>
              ))}
            </Card>
          </section>
        )}
      </>
    );
  }

  // ---------------------------------------------------------------- running
  if (phase === 'running') {
    return (
      <>
        <div className="sticky top-14 z-10 -mx-4 mb-5 border-b border-line bg-page/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-ink">Mock Final Exam</span>
            {timed && (
              <span
                className={`rounded-lg px-2.5 py-1 font-mono text-sm font-semibold tabular-nums ${
                  secondsLeft <= 60 ? 'bg-bad-soft text-bad-text' : 'bg-sunken text-ink-2'
                }`}
                role="timer"
                aria-live="off"
              >
                {formatClock(secondsLeft)}
              </span>
            )}
            <span className="text-sm text-ink-2" aria-live="polite">
              {answeredCount} of {paper.length} answered
            </span>
            <Button size="sm" className="ml-auto" onClick={submit}>
              Submit exam
            </Button>
          </div>
          <div className="mt-2.5">
            <ProgressBar value={answeredCount} max={paper.length} label="Exam progress" />
          </div>
        </div>

        <div className="space-y-4">
          {paper.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={i + 1}
              mode="exam"
              answer={answers[q.id] ?? ''}
              onAnswer={(raw) => setAnswers((prev) => ({ ...prev, [q.id]: raw }))}
            />
          ))}
        </div>

        <div className="mt-6">
          <Button onClick={submit}>Submit exam</Button>
        </div>
      </>
    );
  }

  // ----------------------------------------------------------------- review
  const pct = result ? Math.round((result.score / result.total) * 100) : 0;
  const weakTopics = result
    ? Object.entries(result.byChapter)
        .filter(([, [c, t]]) => t > 0 && c / t < 0.7)
        .map(([ch]) => Number(ch))
    : [];

  return (
    <>
      <PageHeader icon="🧪" title="Mock Final Exam — Results" />

      {result && (
        <Card className="mb-6 p-5">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="text-3xl font-bold tabular-nums text-ink">
              {result.score}/{result.total}
            </p>
            <p className="text-xl font-semibold tabular-nums text-ink-2">{pct}%</p>
          </div>
          <div className="mt-3">
            <ProgressBar value={result.score} max={result.total} label="Exam score" />
          </div>
          <p className="mt-2 text-sm text-ink-2">
            {result.score} correct, {result.total - result.score} incorrect or unanswered.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-3">
                By chapter
              </h3>
              <ul className="space-y-1.5 text-sm">
                {Object.entries(result.byChapter).map(([ch, [c, t]]) => (
                  <li key={ch} className="flex justify-between text-ink-2">
                    <span>
                      Ch {ch} — {CHAPTER_TITLE[Number(ch)]}
                    </span>
                    <span className="font-mono tabular-nums">
                      {c}/{t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-3">
                By question type
              </h3>
              <ul className="space-y-1.5 text-sm">
                {Object.entries(result.byType).map(([t, [c, n]]) => (
                  <li key={t} className="flex justify-between text-ink-2">
                    <span>{TYPE_LABEL[t as QuestionType]}</span>
                    <span className="font-mono tabular-nums">
                      {c}/{n}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {weakTopics.length > 0 && (
            <div className="mt-5">
              <Callout tone="warn" title="Weak areas from this attempt">
                Chapter{weakTopics.length > 1 ? 's' : ''}{' '}
                {weakTopics.map((c) => `${c} (${CHAPTER_TITLE[c]})`).join(', ')} came in below
                70%. Those chapter pages are the place to go next.
              </Callout>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={start}>Retry with new questions</Button>
            <Button variant="secondary" onClick={() => setPhase('setup')}>
              Back to setup
            </Button>
          </div>
        </Card>
      )}

      <h2 className="mb-3 text-lg font-semibold text-ink">Review answers</h2>
      <div className="space-y-4">
        {paper.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i + 1}
            mode="exam"
            answer={answers[q.id] ?? ''}
            forceRevealed
          />
        ))}
      </div>
    </>
  );
}
