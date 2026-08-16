import type { Difficulty, Question, QuestionType } from '../types';

export type StatusFilter = 'all' | 'unattempted' | 'correct' | 'incorrect' | 'bookmarked';

export interface FilterState {
  chapters: number[];
  types: QuestionType[];
  difficulties: Difficulty[];
  status: StatusFilter;
  search: string;
}

export const EMPTY_FILTERS: FilterState = {
  chapters: [],
  types: [],
  difficulties: [],
  status: 'all',
  search: '',
};

interface StatusLookup {
  attempts: Record<string, { result: 'correct' | 'incorrect' }>;
  bookmarks: string[];
}

/** Text a question can be matched against by the search box. */
function searchableText(q: Question): string {
  const parts = [q.question, q.topic, q.explanation, q.id];
  if (q.code) parts.push(q.code);
  if (q.type === 'mcq') parts.push(...q.choices);
  if (q.type === 'output') parts.push(q.expectedOutput);
  if (q.type === 'programming') parts.push(...q.requirements, q.solution);
  return parts.join(' \n ').toLowerCase();
}

export function applyFilters(
  questions: Question[],
  filters: FilterState,
  lookup: StatusLookup,
): Question[] {
  const term = filters.search.trim().toLowerCase();

  return questions.filter((q) => {
    if (filters.chapters.length && !filters.chapters.includes(q.chapter)) return false;
    if (filters.types.length && !filters.types.includes(q.type)) return false;
    if (filters.difficulties.length && !filters.difficulties.includes(q.difficulty)) {
      return false;
    }

    if (filters.status !== 'all') {
      const attempt = lookup.attempts[q.id];
      if (filters.status === 'unattempted' && attempt) return false;
      if (filters.status === 'correct' && attempt?.result !== 'correct') return false;
      if (filters.status === 'incorrect' && attempt?.result !== 'incorrect') return false;
      if (filters.status === 'bookmarked' && !lookup.bookmarks.includes(q.id)) return false;
    }

    if (term && !searchableText(q).includes(term)) return false;

    return true;
  });
}

export function countActiveFilters(filters: FilterState): number {
  return (
    filters.chapters.length +
    filters.types.length +
    filters.difficulties.length +
    (filters.status === 'all' ? 0 : 1) +
    (filters.search.trim() ? 1 : 0)
  );
}

/**
 * Deterministic shuffle driven by a numeric seed, so a generated mock exam can be
 * reproduced and does not reshuffle on every React render.
 */
export function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let state = seed || 1;
  const nextRandom = () => {
    // xorshift32: small, fast, and good enough for shuffling a question list
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return Math.abs(state) / 2 ** 31;
  };
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(nextRandom() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
