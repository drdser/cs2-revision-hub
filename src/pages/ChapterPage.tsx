import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { QuestionType } from '../types';
import { getChapter } from '../data/chapters';
import { allQuestions } from '../data/questions';
import { traps } from '../data/traps';
import { TYPE_LABEL, TYPE_ORDER } from '../utils/labels';
import { QuestionCard } from '../components/questions/QuestionCard';
import { Button, Callout, Card, EmptyState, PageHeader, SectionHeading } from '../components/ui';
import { CodeBlock } from '../components/CodeBlock';

function List({ title, items, tone }: { title: string; items: string[]; tone?: 'warn' }) {
  if (items.length === 0) return null;
  return (
    <Card className="p-4 sm:p-5">
      <h3 className="mb-2.5 font-semibold text-ink">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
            <span
              aria-hidden="true"
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                tone === 'warn' ? 'bg-warn' : 'bg-brand'
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function ChapterPage() {
  const { n } = useParams<{ n: string }>();
  const chapterNumber = Number(n);
  const info = getChapter(chapterNumber);
  const [activeType, setActiveType] = useState<QuestionType | 'all'>('all');

  const questions = useMemo(
    () => allQuestions.filter((q) => q.chapter === chapterNumber),
    [chapterNumber],
  );

  const chapterTraps = useMemo(
    () => traps.filter((t) => t.chapter === chapterNumber),
    [chapterNumber],
  );

  if (!info) {
    return (
      <>
        <PageHeader title="Chapter not found" />
        <EmptyState
          title="That chapter does not exist in this hub."
          hint="Use the sidebar to pick a chapter with material."
        />
      </>
    );
  }

  if (!info.covered) {
    return (
      <>
        <PageHeader title={`Chapter ${info.chapter}`} subtitle={info.title} />
        <Callout tone="warn" title="Source coverage for this chapter is limited.">
          {info.coverageNote}
        </Callout>
        <div className="mt-5">
          <Link to="/revision">
            <Button variant="secondary">Back to the question bank</Button>
          </Link>
        </div>
      </>
    );
  }

  const visible =
    activeType === 'all' ? questions : questions.filter((q) => q.type === activeType);

  const availableTypes = TYPE_ORDER.filter((t) => questions.some((q) => q.type === t));

  return (
    <>
      <PageHeader
        title={`Chapter ${info.chapter} — ${info.title}`}
        subtitle={`${questions.length} questions in this chapter.`}
      />

      {/* ------------------------------------------------------ quick revision */}
      <section aria-labelledby="summary-heading" className="mb-8">
        <SectionHeading id="summary-heading">Quick revision</SectionHeading>
        <Card className="p-4 sm:p-5">
          <ul className="space-y-2.5">
            {info.summary.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink-2 sm:text-[15px]">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ------------------------------------------------------------ keywords */}
      <section aria-labelledby="keywords-heading" className="mb-8">
        <SectionHeading id="keywords-heading">Key keywords</SectionHeading>
        <Card className="p-4 sm:p-5">
          <ul className="flex flex-wrap gap-2">
            {info.keywords.map((kw) => (
              <li
                key={kw}
                className="rounded-md border border-line bg-codebg px-2.5 py-1 font-mono text-sm text-brand-text"
              >
                {kw}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ------------------------------------------------- rules and mistakes */}
      <section aria-labelledby="rules-heading" className="mb-8">
        <SectionHeading id="rules-heading">Must-know rules, mistakes and traps</SectionHeading>
        <div className="grid gap-4 lg:grid-cols-2">
          <List title="Must-know rules" items={info.rules} />
          <List title="Common mistakes" items={info.mistakes} tone="warn" />
          <List title="Exam traps" items={info.traps} tone="warn" />
          {chapterTraps.length > 0 && (
            <Card className="p-4 sm:p-5">
              <h3 className="mb-2.5 font-semibold text-ink">Worked traps</h3>
              <div className="space-y-4">
                {chapterTraps.slice(0, 3).map((t) => (
                  <div key={t.id}>
                    <p className="text-sm font-medium text-ink">{t.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{t.reality}</p>
                    {t.code && <CodeBlock code={t.code} />}
                  </div>
                ))}
              </div>
              <Link
                to="/traps"
                className="mt-2 inline-block text-sm font-medium text-brand-text hover:underline"
              >
                See all exam traps →
              </Link>
            </Card>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------------- practice */}
      <section aria-labelledby="practice-heading">
        <SectionHeading id="practice-heading" count={visible.length}>
          Practice questions
        </SectionHeading>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveType('all')}
            aria-pressed={activeType === 'all'}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              activeType === 'all'
                ? 'border-brand bg-brand text-white'
                : 'border-line bg-card text-ink-2 hover:bg-sunken'
            }`}
          >
            All ({questions.length})
          </button>
          {availableTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveType(t)}
              aria-pressed={activeType === t}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                activeType === t
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-card text-ink-2 hover:bg-sunken'
              }`}
            >
              {TYPE_LABEL[t]} ({questions.filter((q) => q.type === t).length})
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {visible.map((q, i) => (
            <QuestionCard key={q.id} question={q} index={i + 1} />
          ))}
        </div>
      </section>
    </>
  );
}
