import type { McqQuestion } from '../../types';

interface Props {
  question: McqQuestion;
  answer: string;
  onAnswer: (value: string) => void;
  revealed: boolean;
  disabled: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function McqBody({ question, answer, onAnswer, revealed, disabled }: Props) {
  const selected = answer === '' ? -1 : Number(answer);

  return (
    <fieldset className="mt-3" disabled={disabled}>
      <legend className="sr-only">Choose one answer</legend>
      <div className="space-y-2">
        {question.choices.map((choice, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === question.correctIndex;

          let tone = 'border-line bg-card hover:border-line-strong hover:bg-sunken';
          if (revealed && isCorrect) {
            tone = 'border-ok/50 bg-ok-soft';
          } else if (revealed && isSelected) {
            tone = 'border-bad/50 bg-bad-soft';
          } else if (isSelected) {
            tone = 'border-brand bg-brand-soft';
          }

          return (
            <label
              key={choice}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${tone} ${
                disabled ? 'cursor-default' : ''
              }`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={idx}
                checked={isSelected}
                onChange={() => onAnswer(String(idx))}
                className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--accent)]"
              />
              <span className="shrink-0 font-mono text-sm font-semibold text-ink-2">
                {LETTERS[idx]}.
              </span>
              <span className="text-sm text-ink sm:text-[15px]">{choice}</span>
              {revealed && isCorrect && (
                <span className="ml-auto shrink-0 text-sm font-semibold text-ok-text">
                  ✓ correct
                </span>
              )}
              {revealed && isSelected && !isCorrect && (
                <span className="ml-auto shrink-0 text-sm font-semibold text-bad-text">
                  ✕ your answer
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
