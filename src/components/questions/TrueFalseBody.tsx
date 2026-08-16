import type { TrueFalseQuestion } from '../../types';

interface Props {
  question: TrueFalseQuestion;
  answer: string;
  onAnswer: (value: string) => void;
  revealed: boolean;
  disabled: boolean;
}

const OPTIONS: { value: string; label: string }[] = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];

export function TrueFalseBody({ question, answer, onAnswer, revealed, disabled }: Props) {
  return (
    <fieldset className="mt-3" disabled={disabled}>
      <legend className="sr-only">Choose true or false</legend>
      <div className="flex flex-wrap gap-2.5">
        {OPTIONS.map((opt) => {
          const isSelected = answer === opt.value;
          const isCorrect = (opt.value === 'true') === question.correctAnswer;

          let tone = 'border-line bg-card text-ink hover:border-line-strong hover:bg-sunken';
          if (revealed && isCorrect) {
            tone = 'border-ok/60 bg-ok-soft text-ok-text';
          } else if (revealed && isSelected) {
            tone = 'border-bad/60 bg-bad-soft text-bad-text';
          } else if (isSelected) {
            tone = 'border-brand bg-brand-soft text-brand-text';
          }

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onAnswer(opt.value)}
              aria-pressed={isSelected}
              className={`min-w-[7rem] rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-default ${tone}`}
            >
              {opt.label}
              {revealed && isCorrect && <span className="ml-1.5">✓</span>}
              {revealed && isSelected && !isCorrect && <span className="ml-1.5">✕</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
