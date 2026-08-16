import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { allQuestions } from '../data/questions';
import { veryHighPredictions } from '../data/predictions';
import { coveredChapters } from '../data/chapters';
import { CHAPTER_TITLE, TYPE_LABEL, TYPE_ORDER } from '../utils/labels';
import { Button, Card, ProgressBar } from '../components/ui';

function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-ink">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-ink-3">{hint}</p>}
    </Card>
  );
}

function NavCard({
  to,
  icon,
  title,
  description,
  meta,
}: {
  to: string;
  icon: string;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <Card
      as="li"
      className="transition-colors hover:border-line-strong focus-within:border-brand"
    >
      <Link to={to} className="block h-full rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-xl leading-none">
            {icon}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-ink">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">{description}</p>
            {meta && <p className="mt-1.5 text-xs text-ink-3">{meta}</p>}
          </div>
        </div>
      </Link>
    </Card>
  );
}

export function Home() {
  const { stats, byChapter, weakChapters, mistakes, bookmarks, mockResults } = useProgress();

  const typeCounts = TYPE_ORDER.map((t) => ({
    type: t,
    count: allQuestions.filter((q) => q.type === t).length,
  }));

  // The recommendation list adapts to what the student has actually done so far.
  const recommendations: { to: string; label: string; why: string }[] = [];

  if (stats.answered === 0) {
    recommendations.push({
      to: '/expected',
      label: 'Start with the Very High confidence questions',
      why: 'These map directly to the current review sheet, so they are the highest-value hour of study.',
    });
  }
  if (mistakes.length >= 3) {
    recommendations.push({
      to: '/mistakes',
      label: `Practise your ${mistakes.length} mistakes`,
      why: 'Re-answering questions you got wrong is the fastest way to move your accuracy.',
    });
  }
  if (weakChapters.length > 0) {
    recommendations.push({
      to: `/chapter/${weakChapters[0]}`,
      label: `Review Chapter ${weakChapters[0]} - ${CHAPTER_TITLE[weakChapters[0]]}`,
      why: 'Your accuracy in this chapter is below 70%, so it is the weakest area right now.',
    });
  }
  recommendations.push({
    to: '/output-practice',
    label: 'Drill the output-tracing questions',
    why: 'The review sheet includes an output question, and tracing is where most marks are lost.',
  });
  if (stats.answered > 20 && mockResults.length === 0) {
    recommendations.push({
      to: '/mock-exam',
      label: 'Sit a timed mock final',
      why: 'You have covered enough of the bank to get a realistic score under exam conditions.',
    });
  } else if (mockResults.length > 0) {
    recommendations.push({
      to: '/mock-exam',
      label: 'Sit another mock final',
      why: `Your last attempt scored ${mockResults[0].score}/${mockResults[0].total}. A fresh set of questions is generated each time.`,
    });
  }

  return (
    <>
      {/* --------------------------------------------------------------- hero */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          CS2 Final Exam Revision Hub
        </h1>
        <p className="mt-2 text-ink-2">
          Chapters 9–15 • Practice • Output Tracing • Exam Predictions
        </p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          Master the concepts. Practise the exam style. Focus on the most likely topics.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link to="/revision">
            <Button>Start revision</Button>
          </Link>
          <Link to="/expected">
            <Button variant="secondary">Expected questions</Button>
          </Link>
          <Link to="/mock-exam">
            <Button variant="secondary">Take mock final</Button>
          </Link>
          <Link to="/output-practice">
            <Button variant="secondary">Practise output</Button>
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------------------- stats */}
      <section aria-labelledby="stats-heading" className="mb-8">
        <h2 id="stats-heading" className="mb-3 text-lg font-semibold text-ink">
          Your progress
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <StatTile label="Total questions" value={String(stats.total)} hint={`${stats.gradable} auto-graded`} />
          <StatTile label="Completed" value={String(stats.answered)} />
          <StatTile label="Correct" value={String(stats.correct)} />
          <StatTile
            label="Accuracy"
            value={stats.answered ? `${stats.accuracy}%` : '—'}
            hint={stats.answered ? undefined : 'Answer a question to start'}
          />
          <StatTile label="Remaining" value={String(stats.remaining)} />
        </div>

        <div className="mt-4">
          <ProgressBar
            value={stats.answered}
            max={stats.gradable}
            label="Questions attempted"
          />
          <p className="mt-1.5 text-xs text-ink-3">
            {stats.answered} of {stats.gradable} auto-graded questions attempted. No account
            needed; progress is saved in this browser only.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- where to start */}
      <section aria-labelledby="start-heading" className="mb-8">
        <h2 id="start-heading" className="mb-3 text-lg font-semibold text-ink">
          Where should I start?
        </h2>
        <Card className="divide-y divide-line">
          {recommendations.slice(0, 5).map((rec, i) => (
            <Link
              key={rec.to + rec.label}
              to={rec.to}
              className="flex items-start gap-3 p-4 transition-colors hover:bg-sunken"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-text">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-ink">{rec.label}</span>
                <span className="mt-0.5 block text-sm text-ink-2">{rec.why}</span>
              </span>
            </Link>
          ))}
        </Card>
      </section>

      {/* -------------------------------------------------------------- cards */}
      <section aria-labelledby="sections-heading" className="mb-8">
        <h2 id="sections-heading" className="mb-3 text-lg font-semibold text-ink">
          Everything in the hub
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <NavCard
            to="/revision"
            icon="📚"
            title="Full Revision"
            description="The whole question bank, split into six sections by question type."
            meta={`${allQuestions.length} questions`}
          />
          {typeCounts.slice(0, 2).map((t) => (
            <NavCard
              key={t.type}
              to={`/revision/${t.type}`}
              icon={t.type === 'mcq' ? '🔘' : '⚖️'}
              title={TYPE_LABEL[t.type]}
              description={
                t.type === 'mcq'
                  ? 'Four-option questions on the rules the instructor tests most.'
                  : 'Short statements, several of them deliberate near-misses.'
              }
              meta={`${t.count} questions`}
            />
          ))}
          <NavCard
            to="/output-practice"
            icon="🖥️"
            title="Output Questions"
            description="Trace Java programs and type the exact console output. Filter by topic."
            meta={`${typeCounts[2].count} questions`}
          />
          <NavCard
            to="/revision/code-completion"
            icon="🧩"
            title="Code Completion"
            description="Fill the missing fragment in a real Java snippet."
            meta={`${typeCounts[4].count} questions`}
          />
          <NavCard
            to="/coding-practice"
            icon="💻"
            title="Programming Questions"
            description="Short, medium and full exam-style tasks, each with a hint before the solution."
            meta={`${typeCounts[5].count} questions`}
          />
          <NavCard
            to="/expected"
            icon="🔥"
            title="Expected Final Questions"
            description="Topics ranked by the evidence across the review sheet, past papers and lectures."
            meta={`${veryHighPredictions.length} very high confidence topics`}
          />
          <NavCard
            to="/must-study"
            icon="🚨"
            title="Must Study"
            description="Concepts ranked A, B and C, with the question style each usually takes."
          />
          <NavCard
            to="/mock-exam"
            icon="🧪"
            title="Mock Final Exam"
            description="A balanced, timed paper with a full score breakdown and answer review."
          />
          <NavCard
            to="/quick-practice"
            icon="⚡"
            title="Quick Practice"
            description="5, 10 or 20 questions. Exam-level only, weak areas, or random output."
          />
          <NavCard
            to="/saved"
            icon="⭐"
            title="Saved Questions"
            description="Everything you flagged to review later."
            meta={`${bookmarks.length} saved`}
          />
          <NavCard
            to="/mistakes"
            icon="❌"
            title="My Mistakes"
            description="Every question you answered incorrectly, ready to re-drill."
            meta={`${mistakes.length} to fix`}
          />
          <NavCard
            to="/progress"
            icon="📊"
            title="Progress"
            description="Accuracy by chapter and by question type, plus your mock exam history."
          />
          <NavCard
            to="/cheat-sheet"
            icon="📄"
            title="Final Cheat Sheet"
            description="A condensed sheet you can read in 10 to 15 minutes."
          />
          <NavCard
            to="/traps"
            icon="🪤"
            title="Common Exam Traps"
            description="The specific wrong beliefs that cost marks, each with the correction."
          />
        </ul>
      </section>

      {/* ----------------------------------------------------------- chapters */}
      <section aria-labelledby="chapters-heading">
        <h2 id="chapters-heading" className="mb-3 text-lg font-semibold text-ink">
          Chapter practice
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {coveredChapters.map((ch) => {
            const s = byChapter[ch];
            return (
              <Card
                key={ch}
                as="li"
                className="transition-colors hover:border-line-strong focus-within:border-brand"
              >
                <Link to={`/chapter/${ch}`} className="block rounded-xl p-4">
                  <p className="font-semibold text-ink">
                    Chapter {ch} — {CHAPTER_TITLE[ch]}
                  </p>
                  <p className="mt-1 text-sm text-ink-2">
                    {s ? `${s.answered} of ${s.total} attempted` : 'Not started'}
                    {s && s.answered > 0
                      ? ` • ${Math.round((s.correct / s.answered) * 100)}% correct`
                      : ''}
                  </p>
                  {s && (
                    <div className="mt-2.5">
                      <ProgressBar
                        value={s.answered}
                        max={s.total}
                        label={`Chapter ${ch} progress`}
                      />
                    </div>
                  )}
                </Link>
              </Card>
            );
          })}
        </ul>
        <p className="mt-3 text-sm text-ink-3">
          Chapters 12, 13 and 14 have no questions here. No lecture material for them was
          supplied and nothing on the review sheet or the past papers maps to them, so nothing
          has been invented to fill the gap.
        </p>
      </section>
    </>
  );
}
