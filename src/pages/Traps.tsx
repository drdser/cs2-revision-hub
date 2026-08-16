import { useMemo, useState } from 'react';
import { traps } from '../data/traps';
import { coveredChapters } from '../data/chapters';
import { CHAPTER_TITLE } from '../utils/labels';
import { ChapterBadge } from '../components/Badges';
import { CodeBlock } from '../components/CodeBlock';
import { Card, PageHeader } from '../components/ui';

export function Traps() {
  const [chapter, setChapter] = useState<number | 'all'>('all');

  const visible = useMemo(
    () => (chapter === 'all' ? traps : traps.filter((t) => t.chapter === chapter)),
    [chapter],
  );

  return (
    <>
      <PageHeader
        icon="🪤"
        title="Common Exam Traps"
        subtitle="Each entry pairs the belief that costs marks with the correction. Every one is drawn from something that actually appears in the review sheet, the past papers or the lectures."
      />

      <div className="mb-5 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setChapter('all')}
          aria-pressed={chapter === 'all'}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            chapter === 'all'
              ? 'border-brand bg-brand text-white'
              : 'border-line bg-card text-ink-2 hover:bg-sunken'
          }`}
        >
          All ({traps.length})
        </button>
        {coveredChapters.map((ch) => (
          <button
            key={ch}
            type="button"
            onClick={() => setChapter(ch)}
            aria-pressed={chapter === ch}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              chapter === ch
                ? 'border-brand bg-brand text-white'
                : 'border-line bg-card text-ink-2 hover:bg-sunken'
            }`}
          >
            Ch {ch} — {CHAPTER_TITLE[ch]} ({traps.filter((t) => t.chapter === ch).length})
          </button>
        ))}
      </div>

      <ul className="space-y-4">
        {visible.map((trap) => (
          <Card as="li" key={trap.id} className="p-4 sm:p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <ChapterBadge chapter={trap.chapter} />
            </div>

            <h2 className="text-[15px] font-semibold text-ink sm:text-base">{trap.title}</h2>

            <div className="mt-3 space-y-2.5">
              <div className="rounded-lg border border-bad/30 bg-bad-soft px-3.5 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-bad-text">
                  What students believe
                </p>
                <p className="mt-1 text-sm leading-relaxed text-bad-text">{trap.wrongBelief}</p>
              </div>

              <div className="rounded-lg border border-ok/30 bg-ok-soft px-3.5 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ok-text">
                  What is actually true
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ok-text">{trap.reality}</p>
              </div>
            </div>

            {trap.code && <CodeBlock code={trap.code} />}
          </Card>
        ))}
      </ul>
    </>
  );
}
