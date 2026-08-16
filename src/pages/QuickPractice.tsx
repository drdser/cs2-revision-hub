import { useMemo, useState } from 'react';
import type { GradedQuestion } from '../types';
import { gradedQuestions } from '../data/questions';
import { useProgress } from '../hooks/useProgress';
import { seededShuffle } from '../utils/filters';
import { CHAPTER_TITLE } from '../utils/labels';
import { QuestionCard } from '../components/questions/QuestionCard';
import { Button, Callout, Card, EmptyState, PageHeader } from '../components/ui';

type Focus = 'any' | 'exam-level' | 'weak-areas' | 'output';

const FOCUS_OPTIONS: { value: Focus; label: string; hint: string }[] = [
  { value: 'any', label: 'Anything', hint: 'Drawn from the whole bank.' },
  {
    value: 'exam-level',
    label: 'Exam-level only',
    hint: 'Only questions tagged at the difficulty of the review sheet.',
  },
  {
    value: 'weak-areas',
    label: 'My weak areas',
    hint: 'Chapters where your accuracy is below 70%, plus anything you got wrong.',
  },
  {
    value: 'output',
    label: 'Random output questions',
    hint: 'Java code tracing only.',
  },
];

const SIZES = [5, 10, 20];

export function QuickPractice() {
  const { weakChapters, attempts } = useProgress();
  const [focus, setFocus] = useState<Focus>('any');
  const [size, setSize] = useState(10);
  const [seed, setSeed] = useState(0);

  const pool = useMemo<GradedQuestion[]>(() => {
    switch (focus) {
      case 'exam-level':
        return gradedQuestions.filter((q) => q.difficulty === 'exam');
      case 'output':
        return gradedQuestions.filter((q) => q.type === 'output');
      case 'weak-areas': {
        const wrong = new Set(
          Object.entries(attempts)
            .filter(([, a]) => a.result === 'incorrect')
            .map(([id]) => id),
        );
        return gradedQuestions.filter(
          (q) => weakChapters.includes(q.chapter) || wrong.has(q.id),
        );
      }
      default:
        return gradedQuestions;
    }
  }, [focus, weakChapters, attempts]);

  const questions = useMemo(
    () => (seed === 0 ? [] : seededShuffle(pool, seed).slice(0, size)),
    [pool, seed, size],
  );

  const activeFocus = FOCUS_OPTIONS.find((f) => f.value === focus);

  return (
    <>
      <PageHeader
        icon="⚡"
        title="Quick Practice"
        subtitle="A short, randomly drawn set. Answers and explanations appear as soon as you submit each one."
      />

      <Card className="mb-6 p-5">
        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-semibold text-ink">How many questions?</legend>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setSize(n)}
                aria-pressed={size === n}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  size === n
                    ? 'border-brand bg-brand text-white'
                    : 'border-line bg-card text-ink-2 hover:bg-sunken'
                }`}
              >
                {n} questions
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-semibold text-ink">What should they cover?</legend>
          <div className="flex flex-wrap gap-2">
            {FOCUS_OPTIONS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFocus(f.value)}
                aria-pressed={focus === f.value}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  focus === f.value
                    ? 'border-brand bg-brand text-white'
                    : 'border-line bg-card text-ink-2 hover:bg-sunken'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {activeFocus && <p className="mt-2 text-sm text-ink-3">{activeFocus.hint}</p>}
        </fieldset>

        {focus === 'weak-areas' && weakChapters.length === 0 && pool.length === 0 && (
          <div className="mb-4">
            <Callout tone="warn">
              No weak areas identified yet. Answer at least three questions in a chapter and this
              option will start targeting whatever you struggle with.
            </Callout>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setSeed(Date.now() % 100000)} disabled={pool.length === 0}>
            {seed === 0 ? 'Start practice' : 'New set'}
          </Button>
          <span className="text-sm text-ink-3">{pool.length} questions available</span>
        </div>
      </Card>

      {seed !== 0 &&
        (questions.length === 0 ? (
          <EmptyState
            title="Nothing to practise with these settings."
            hint="Try a different focus, or answer a few more questions first."
          />
        ) : (
          <>
            {focus === 'weak-areas' && weakChapters.length > 0 && (
              <p className="mb-4 text-sm text-ink-2">
                Targeting{' '}
                {weakChapters.map((c) => `Chapter ${c} (${CHAPTER_TITLE[c]})`).join(', ')} plus
                anything you previously got wrong.
              </p>
            )}
            <div className="space-y-4">
              {questions.map((q, i) => (
                <QuestionCard key={q.id} question={q} index={i + 1} />
              ))}
            </div>
          </>
        ))}
    </>
  );
}
