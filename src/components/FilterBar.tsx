import type { Difficulty, QuestionType } from '../types';
import { coveredChapters } from '../data/chapters';
import {
  DIFFICULTY_LABEL,
  DIFFICULTY_ORDER,
  TYPE_LABEL,
  TYPE_ORDER,
} from '../utils/labels';
import { countActiveFilters, EMPTY_FILTERS, type FilterState, type StatusFilter } from '../utils/filters';
import { Button, Card } from './ui';

interface Props {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  /** Hide the type row on pages that already fix the question type. */
  hideTypes?: boolean;
  resultCount: number;
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'unattempted', label: 'Not attempted' },
  { value: 'correct', label: 'Correct' },
  { value: 'incorrect', label: 'Incorrect' },
  { value: 'bookmarked', label: 'Bookmarked' },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? 'border-brand bg-brand text-white'
          : 'border-line bg-card text-ink-2 hover:border-line-strong hover:bg-sunken'
      }`}
    >
      {children}
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wide text-ink-3">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function FilterBar({ filters, onChange, hideTypes = false, resultCount }: Props) {
  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const active = countActiveFilters(filters);

  return (
    <Card className="mb-5 p-4">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor="question-search" className="sr-only">
          Search questions
        </label>
        <input
          id="question-search"
          type="search"
          value={filters.search}
          placeholder="Search questions, topics, keywords or code..."
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-brand"
        />
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm text-ink-3" aria-live="polite">
            {resultCount} shown
          </span>
          {active > 0 && (
            <Button variant="ghost" size="sm" onClick={() => onChange(EMPTY_FILTERS)}>
              Clear ({active})
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        <Row label="Chapter">
          {coveredChapters.map((ch) => (
            <Chip
              key={ch}
              active={filters.chapters.includes(ch)}
              onClick={() => onChange({ ...filters, chapters: toggle(filters.chapters, ch) })}
            >
              Chapter {ch}
            </Chip>
          ))}
        </Row>

        {!hideTypes && (
          <Row label="Type">
            {TYPE_ORDER.map((t: QuestionType) => (
              <Chip
                key={t}
                active={filters.types.includes(t)}
                onClick={() => onChange({ ...filters, types: toggle(filters.types, t) })}
              >
                {TYPE_LABEL[t]}
              </Chip>
            ))}
          </Row>
        )}

        <Row label="Difficulty">
          {DIFFICULTY_ORDER.map((d: Difficulty) => (
            <Chip
              key={d}
              active={filters.difficulties.includes(d)}
              onClick={() =>
                onChange({ ...filters, difficulties: toggle(filters.difficulties, d) })
              }
            >
              {DIFFICULTY_LABEL[d]}
            </Chip>
          ))}
        </Row>

        <Row label="Status">
          {STATUS_OPTIONS.map((s) => (
            <Chip
              key={s.value}
              active={filters.status === s.value}
              onClick={() => onChange({ ...filters, status: s.value })}
            >
              {s.label}
            </Chip>
          ))}
        </Row>
      </div>
    </Card>
  );
}
