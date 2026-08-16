import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { QuestionType } from '../types';
import { allQuestions } from '../data/questions';
import { useProgress } from '../hooks/useProgress';
import { applyFilters, EMPTY_FILTERS, type FilterState } from '../utils/filters';
import { TYPE_LABEL, TYPE_ORDER, TYPE_SECTION } from '../utils/labels';
import { FilterBar } from '../components/FilterBar';
import { QuestionCard } from '../components/questions/QuestionCard';
import { EmptyState, PageHeader, SectionHeading } from '../components/ui';

const TYPE_BLURB: Record<QuestionType, string> = {
  mcq: 'Four options, exactly one best answer. Submit to see the correct choice and why the others are wrong.',
  'true-false':
    'Short statements. Several are near-misses where a single word makes the statement false, so read carefully.',
  output:
    'Trace the program and type the exact console output. Capitalisation, spacing and newlines all count.',
  'fill-blank': 'Supply the one missing keyword or value.',
  'code-completion':
    'Complete the highlighted gap in a real Java snippet so the code compiles and behaves correctly.',
  programming:
    'Full exam-style tasks. Read the requirements, attempt it on paper, then check the hint before the solution.',
};

/**
 * Section A-F of the revision bank. Without a `type` route parameter, every
 * section is shown in order; with one, only that section is shown.
 */
export function Revision() {
  const { type } = useParams<{ type?: string }>();
  const { attempts, bookmarks } = useProgress();
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const singleType = TYPE_ORDER.includes(type as QuestionType)
    ? (type as QuestionType)
    : undefined;

  const scoped = useMemo(
    () => (singleType ? allQuestions.filter((q) => q.type === singleType) : allQuestions),
    [singleType],
  );

  const visible = useMemo(
    () => applyFilters(scoped, filters, { attempts, bookmarks }),
    [scoped, filters, attempts, bookmarks],
  );

  const sections = singleType ? [singleType] : TYPE_ORDER;

  return (
    <>
      <PageHeader
        icon={singleType ? undefined : '📚'}
        title={singleType ? TYPE_LABEL[singleType] : 'Full Revision Question Bank'}
        subtitle={
          singleType
            ? TYPE_BLURB[singleType]
            : 'The complete bank, split into six sections by question type. Use the filters to narrow any section down to a single chapter or difficulty.'
        }
      />

      <FilterBar
        filters={filters}
        onChange={setFilters}
        hideTypes={Boolean(singleType)}
        resultCount={visible.length}
      />

      {visible.length === 0 ? (
        <EmptyState
          title="No questions match these filters."
          hint="Try clearing the search box or removing a chapter or difficulty filter."
        />
      ) : (
        sections.map((sectionType) => {
          const items = visible.filter((q) => q.type === sectionType);
          if (items.length === 0) return null;

          return (
            <section
              key={sectionType}
              aria-labelledby={`section-${sectionType}`}
              className="mb-10"
            >
              <SectionHeading id={`section-${sectionType}`} count={items.length}>
                {singleType ? (
                  TYPE_LABEL[sectionType]
                ) : (
                  <>
                    Section {TYPE_SECTION[sectionType]} — {TYPE_LABEL[sectionType]}
                  </>
                )}
              </SectionHeading>

              {!singleType && (
                <p className="mb-4 max-w-3xl text-sm text-ink-2">{TYPE_BLURB[sectionType]}</p>
              )}

              <div className="space-y-4">
                {items.map((q, i) => (
                  <QuestionCard key={q.id} question={q} index={i + 1} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </>
  );
}
