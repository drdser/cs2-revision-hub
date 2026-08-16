import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { CHAPTER_TITLE, TYPE_LABEL, TYPE_ORDER } from '../utils/labels';
import { Button, Callout, Card, PageHeader, ProgressBar, SectionHeading } from '../components/ui';

function AccuracyRow({
  label,
  href,
  correct,
  answered,
  total,
}: {
  label: string;
  href?: string;
  correct: number;
  answered: number;
  total: number;
}) {
  const accuracy = answered ? Math.round((correct / answered) * 100) : null;

  return (
    <div className="border-b border-line py-3 last:border-b-0">
      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-medium text-ink">
          {href ? (
            <Link to={href} className="hover:text-brand-text hover:underline">
              {label}
            </Link>
          ) : (
            label
          )}
        </span>
        <span className="font-mono text-sm tabular-nums text-ink-2">
          {answered}/{total} attempted
          {accuracy !== null && ` • ${accuracy}% correct`}
        </span>
      </div>
      <ProgressBar value={answered} max={total} label={`${label} progress`} />
    </div>
  );
}

export function Progress() {
  const { stats, byChapter, byType, mistakes, bookmarks, mockResults, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <PageHeader
        icon="📊"
        title="Progress"
        subtitle="Everything here is stored in this browser only. No account, no server, no analytics."
      />

      <section aria-labelledby="overall-heading" className="mb-8">
        <SectionHeading id="overall-heading">Overall</SectionHeading>
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">Attempted</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-ink">{stats.answered}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">Correct</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-ok-text">{stats.correct}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">Incorrect</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-bad-text">
                {stats.incorrect}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">Accuracy</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-ink">
                {stats.answered ? `${stats.accuracy}%` : '—'}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <ProgressBar
              value={stats.answered}
              max={stats.gradable}
              label="Bank coverage"
            />
            <p className="mt-1.5 text-sm text-ink-3">
              {stats.remaining} of {stats.gradable} auto-graded questions still to attempt.
              Programming questions are self-marked, so they do not affect these figures.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-2">
            <Link to="/saved" className="hover:text-brand-text hover:underline">
              ⭐ {bookmarks.length} saved
            </Link>
            <Link to="/mistakes" className="hover:text-brand-text hover:underline">
              ❌ {mistakes.length} mistakes
            </Link>
            <Link to="/mock-exam" className="hover:text-brand-text hover:underline">
              🧪 {mockResults.length} mock exam{mockResults.length === 1 ? '' : 's'}
            </Link>
          </div>
        </Card>
      </section>

      <section aria-labelledby="chapter-heading" className="mb-8">
        <SectionHeading id="chapter-heading">Accuracy by chapter</SectionHeading>
        <Card className="px-5 py-1">
          {Object.entries(byChapter)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(([ch, s]) => (
              <AccuracyRow
                key={ch}
                label={`Chapter ${ch} — ${CHAPTER_TITLE[Number(ch)]}`}
                href={`/chapter/${ch}`}
                correct={s.correct}
                answered={s.answered}
                total={s.total}
              />
            ))}
        </Card>
      </section>

      <section aria-labelledby="type-heading" className="mb-8">
        <SectionHeading id="type-heading">Accuracy by question type</SectionHeading>
        <Card className="px-5 py-1">
          {TYPE_ORDER.filter((t) => byType[t]).map((t) => (
            <AccuracyRow
              key={t}
              label={TYPE_LABEL[t]}
              href={`/revision/${t}`}
              correct={byType[t].correct}
              answered={byType[t].answered}
              total={byType[t].total}
            />
          ))}
        </Card>
      </section>

      {mockResults.length > 0 && (
        <section aria-labelledby="mock-heading" className="mb-8">
          <SectionHeading id="mock-heading">Mock exam history</SectionHeading>
          <Card className="divide-y divide-line">
            {mockResults.map((r) => (
              <div key={r.id + r.at} className="flex items-center justify-between p-4">
                <span className="text-sm text-ink-2">{new Date(r.at).toLocaleString()}</span>
                <span className="font-mono text-sm font-semibold tabular-nums text-ink">
                  {r.score}/{r.total} ({Math.round((r.score / r.total) * 100)}%)
                </span>
              </div>
            ))}
          </Card>
        </section>
      )}

      <section aria-labelledby="reset-heading">
        <SectionHeading id="reset-heading">Reset</SectionHeading>
        {confirming ? (
          <Card className="p-5">
            <Callout tone="warn" title="This cannot be undone.">
              Resetting clears every answer, saved question, mistake and mock exam score stored
              in this browser.
            </Callout>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="danger"
                onClick={() => {
                  reset();
                  setConfirming(false);
                }}
              >
                Yes, reset everything
              </Button>
              <Button variant="secondary" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        ) : (
          <Button variant="danger" onClick={() => setConfirming(true)}>
            Reset progress
          </Button>
        )}
      </section>
    </>
  );
}
