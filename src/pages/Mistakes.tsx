import { useMemo, useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { seededShuffle } from '../utils/filters';
import { CHAPTER_TITLE, TYPE_LABEL } from '../utils/labels';
import { QuestionCard } from '../components/questions/QuestionCard';
import { Button, Card, EmptyState, PageHeader } from '../components/ui';

export function Mistakes() {
  const { mistakes } = useProgress();
  const [drillSeed, setDrillSeed] = useState(0);

  const drill = useMemo(
    () => (drillSeed === 0 ? [] : seededShuffle(mistakes, drillSeed)),
    [mistakes, drillSeed],
  );

  const byChapter = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const q of mistakes) counts[q.chapter] = (counts[q.chapter] ?? 0) + 1;
    return Object.entries(counts).sort((a, b) => Number(b[1]) - Number(a[1]));
  }, [mistakes]);

  const byType = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of mistakes) counts[q.type] = (counts[q.type] ?? 0) + 1;
    return Object.entries(counts).sort((a, b) => Number(b[1]) - Number(a[1]));
  }, [mistakes]);

  if (mistakes.length === 0) {
    return (
      <>
        <PageHeader
          icon="❌"
          title="My Mistakes"
          subtitle="Every question you answered incorrectly collects here, so you can re-drill exactly what you got wrong."
        />
        <EmptyState
          title="No mistakes recorded."
          hint="Either you have not answered anything yet, or you have got everything right so far. Answer more questions and anything you miss will appear here."
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        icon="❌"
        title="My Mistakes"
        subtitle={`${mistakes.length} question${mistakes.length === 1 ? '' : 's'} to fix. Answering one correctly moves it out of this list.`}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-3">
            Where they are
          </h2>
          <ul className="space-y-1 text-sm text-ink-2">
            {byChapter.map(([ch, count]) => (
              <li key={ch} className="flex justify-between">
                <span>
                  Chapter {ch} — {CHAPTER_TITLE[Number(ch)]}
                </span>
                <span className="font-mono tabular-nums">{count}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-3">
            What kind
          </h2>
          <ul className="space-y-1 text-sm text-ink-2">
            {byType.map(([type, count]) => (
              <li key={type} className="flex justify-between">
                <span>{TYPE_LABEL[type as keyof typeof TYPE_LABEL]}</span>
                <span className="font-mono tabular-nums">{count}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <Button onClick={() => setDrillSeed(Date.now() % 100000)}>
          {drillSeed === 0 ? 'Practise my mistakes' : 'Reshuffle'}
        </Button>
        {drillSeed !== 0 && (
          <Button variant="secondary" onClick={() => setDrillSeed(0)}>
            Show the full list
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {(drillSeed === 0 ? mistakes : drill).map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i + 1} />
        ))}
      </div>
    </>
  );
}
