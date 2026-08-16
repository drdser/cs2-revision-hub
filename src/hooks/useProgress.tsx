import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AttemptResult, MockExamResult, ProgressState, Question } from '../types';
import { allQuestions, gradedQuestions, questionById } from '../data/questions';

const STORAGE_KEY = 'cs2hub.progress.v1';

const EMPTY: ProgressState = { attempts: {}, bookmarks: [], mockResults: [] };

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      attempts: parsed.attempts ?? {},
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      mockResults: Array.isArray(parsed.mockResults) ? parsed.mockResults : [],
    };
  } catch {
    // Corrupt or unavailable storage: start fresh rather than crash the app.
    return EMPTY;
  }
}

export interface Stats {
  total: number;
  gradable: number;
  answered: number;
  correct: number;
  incorrect: number;
  remaining: number;
  accuracy: number;
}

interface ProgressContextValue {
  attempts: ProgressState['attempts'];
  bookmarks: string[];
  mockResults: MockExamResult[];
  recordAttempt: (id: string, result: AttemptResult) => void;
  clearAttempt: (id: string) => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addMockResult: (result: MockExamResult) => void;
  reset: () => void;
  stats: Stats;
  byChapter: Record<number, { correct: number; answered: number; total: number }>;
  byType: Record<string, { correct: number; answered: number; total: number }>;
  mistakes: Question[];
  bookmarkedQuestions: Question[];
  weakChapters: number[];
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked; progress simply will not persist this session.
    }
  }, [state]);

  const recordAttempt = useCallback((id: string, result: AttemptResult) => {
    setState((prev) => ({
      ...prev,
      attempts: { ...prev.attempts, [id]: { result, at: Date.now() } },
    }));
  }, []);

  const clearAttempt = useCallback((id: string) => {
    setState((prev) => {
      const next = { ...prev.attempts };
      delete next[id];
      return { ...prev, attempts: next };
    });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(id)
        ? prev.bookmarks.filter((b) => b !== id)
        : [...prev.bookmarks, id],
    }));
  }, []);

  const addMockResult = useCallback((result: MockExamResult) => {
    setState((prev) => ({ ...prev, mockResults: [result, ...prev.mockResults].slice(0, 25) }));
  }, []);

  const reset = useCallback(() => setState(EMPTY), []);

  const value = useMemo<ProgressContextValue>(() => {
    const { attempts, bookmarks, mockResults } = state;
    const entries = Object.entries(attempts);
    const correct = entries.filter(([, a]) => a.result === 'correct').length;
    const answered = entries.length;

    const byChapter: Record<number, { correct: number; answered: number; total: number }> = {};
    const byType: Record<string, { correct: number; answered: number; total: number }> = {};

    for (const q of gradedQuestions) {
      byChapter[q.chapter] ??= { correct: 0, answered: 0, total: 0 };
      byType[q.type] ??= { correct: 0, answered: 0, total: 0 };
      byChapter[q.chapter].total += 1;
      byType[q.type].total += 1;

      const attempt = attempts[q.id];
      if (!attempt) continue;
      byChapter[q.chapter].answered += 1;
      byType[q.type].answered += 1;
      if (attempt.result === 'correct') {
        byChapter[q.chapter].correct += 1;
        byType[q.type].correct += 1;
      }
    }

    const mistakes = Object.entries(attempts)
      .filter(([, a]) => a.result === 'incorrect')
      .map(([id]) => questionById.get(id))
      .filter((q): q is Question => Boolean(q));

    const bookmarkedQuestions = bookmarks
      .map((id) => questionById.get(id))
      .filter((q): q is Question => Boolean(q));

    // A chapter counts as weak once at least three questions have been attempted
    // and fewer than 70% of them were correct.
    const weakChapters = Object.entries(byChapter)
      .filter(([, s]) => s.answered >= 3 && s.correct / s.answered < 0.7)
      .map(([chapter]) => Number(chapter))
      .sort((a, b) => {
        const ra = byChapter[a].correct / byChapter[a].answered;
        const rb = byChapter[b].correct / byChapter[b].answered;
        return ra - rb;
      });

    return {
      attempts,
      bookmarks,
      mockResults,
      recordAttempt,
      clearAttempt,
      toggleBookmark,
      isBookmarked: (id: string) => bookmarks.includes(id),
      addMockResult,
      reset,
      stats: {
        total: allQuestions.length,
        gradable: gradedQuestions.length,
        answered,
        correct,
        incorrect: answered - correct,
        remaining: Math.max(0, gradedQuestions.length - answered),
        accuracy: answered ? Math.round((correct / answered) * 100) : 0,
      },
      byChapter,
      byType,
      mistakes,
      bookmarkedQuestions,
      weakChapters,
    };
  }, [state, recordAttempt, clearAttempt, toggleBookmark, addMockResult, reset]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside a ProgressProvider');
  return ctx;
}
