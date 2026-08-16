import type { Confidence, Difficulty, QuestionType } from '../types';
import {
  CONFIDENCE_ICON,
  CONFIDENCE_LABEL,
  DIFFICULTY_LABEL,
  TYPE_SHORT,
} from '../utils/labels';

const BASE =
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap';

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  easy: 'bg-ok-soft text-ok-text',
  medium: 'bg-brand-soft text-brand-text',
  hard: 'bg-warn-soft text-warn-text',
  exam: 'bg-bad-soft text-bad-text',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`${BASE} ${DIFFICULTY_STYLE[difficulty]}`}>
      {DIFFICULTY_LABEL[difficulty]}
    </span>
  );
}

export function ChapterBadge({ chapter }: { chapter: number }) {
  return <span className={`${BASE} bg-sunken text-ink-2`}>Ch {chapter}</span>;
}

export function TypeBadge({ type }: { type: QuestionType }) {
  return <span className={`${BASE} bg-sunken text-ink-2`}>{TYPE_SHORT[type]}</span>;
}

export function TopicBadge({ topic }: { topic: string }) {
  return <span className={`${BASE} bg-sunken text-ink-3`}>{topic}</span>;
}

const CONFIDENCE_STYLE: Record<Confidence, string> = {
  'very-high': 'bg-bad-soft text-bad-text',
  high: 'bg-warn-soft text-warn-text',
  medium: 'bg-brand-soft text-brand-text',
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span className={`${BASE} ${CONFIDENCE_STYLE[confidence]} font-semibold`}>
      <span aria-hidden="true">{CONFIDENCE_ICON[confidence]}</span>
      {CONFIDENCE_LABEL[confidence]} confidence
    </span>
  );
}

/**
 * Correct / incorrect indicator. It pairs a word, an icon and a colour so the
 * result never depends on colour alone.
 */
export function ResultBadge({ correct }: { correct: boolean }) {
  return (
    <span
      className={`${BASE} px-3 py-1 text-sm font-semibold ${
        correct ? 'bg-ok-soft text-ok-text' : 'bg-bad-soft text-bad-text'
      }`}
    >
      <span aria-hidden="true">{correct ? '✓' : '✕'}</span>
      {correct ? 'Correct' : 'Incorrect'}
    </span>
  );
}
