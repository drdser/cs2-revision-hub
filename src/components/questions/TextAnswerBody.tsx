interface Props {
  id: string;
  answer: string;
  onAnswer: (value: string) => void;
  disabled: boolean;
  /** Multi-line for console output, single-line for a missing keyword. */
  multiline?: boolean;
  label: string;
  placeholder?: string;
  rows?: number;
}

export function TextAnswerBody({
  id,
  answer,
  onAnswer,
  disabled,
  multiline = false,
  label,
  placeholder,
  rows = 6,
}: Props) {
  const inputId = `answer-${id}`;
  const shared =
    'w-full rounded-lg border border-line bg-card px-3 py-2 font-mono text-[13px] text-ink placeholder:text-ink-3 focus:border-brand disabled:opacity-70 sm:text-sm';

  return (
    <div className="mt-3">
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={inputId}
          rows={rows}
          value={answer}
          disabled={disabled}
          spellCheck={false}
          placeholder={placeholder}
          onChange={(e) => onAnswer(e.target.value)}
          className={`${shared} scroll-slim resize-y leading-relaxed`}
        />
      ) : (
        <input
          id={inputId}
          type="text"
          value={answer}
          disabled={disabled}
          spellCheck={false}
          autoComplete="off"
          placeholder={placeholder}
          onChange={(e) => onAnswer(e.target.value)}
          className={shared}
        />
      )}
    </div>
  );
}
