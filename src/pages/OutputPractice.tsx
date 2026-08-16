import { useMemo, useState } from 'react';
import { outputQuestions } from '../data/questions';
import { OUTPUT_CATEGORY_LABEL } from '../utils/labels';
import { QuestionCard } from '../components/questions/QuestionCard';
import { Callout, EmptyState, PageHeader } from '../components/ui';

type Category = (typeof outputQuestions)[number]['outputCategory'];

const CATEGORIES: Category[] = [
  'inheritance',
  'polymorphism',
  'interface',
  'exception',
  'file-stream',
];

export function OutputPractice() {
  const [category, setCategory] = useState<Category | 'all'>('all');

  const visible = useMemo(
    () =>
      category === 'all'
        ? outputQuestions
        : outputQuestions.filter((q) => q.outputCategory === category),
    [category],
  );

  return (
    <>
      <PageHeader
        icon="🖥️"
        title="Output Practice"
        subtitle="Trace each program and type the exact console output. Every program here was compiled and run, so the expected output is the real thing, not a guess."
      />

      <div className="mb-5">
        <Callout>
          Capitalisation, spacing and line breaks all count. Watch for print versus println, and
          remember that a double prints with a decimal part.
        </Callout>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setCategory('all')}
          aria-pressed={category === 'all'}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            category === 'all'
              ? 'border-brand bg-brand text-white'
              : 'border-line bg-card text-ink-2 hover:bg-sunken'
          }`}
        >
          Mixed Output ({outputQuestions.length})
        </button>
        {CATEGORIES.map((c) => {
          const count = outputQuestions.filter((q) => q.outputCategory === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                category === c
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-card text-ink-2 hover:bg-sunken'
              }`}
            >
              {OUTPUT_CATEGORY_LABEL[c]} ({count})
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <EmptyState title="No output questions in this category." />
      ) : (
        <div className="space-y-4">
          {visible.map((q, i) => (
            <QuestionCard key={q.id} question={q} index={i + 1} />
          ))}
        </div>
      )}
    </>
  );
}
