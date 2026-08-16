import { useMemo } from 'react';
import { TOKEN_CLASS, tokenizeJava } from '../utils/highlight';

interface CodeBlockProps {
  code: string;
  /** Label announced to screen readers and shown above the block. */
  label?: string;
  /** Plain output rather than Java source: no syntax highlighting. */
  plain?: boolean;
  className?: string;
}

/**
 * A horizontally scrollable code block. The overflow lives on this element, so a
 * wide snippet never forces the page itself to scroll sideways.
 */
export function CodeBlock({ code, label, plain = false, className = '' }: CodeBlockProps) {
  const tokens = useMemo(() => (plain ? null : tokenizeJava(code)), [code, plain]);

  return (
    <figure className={`my-3 ${className}`}>
      {label && (
        <figcaption className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-3">
          {label}
        </figcaption>
      )}
      <div className="overflow-hidden rounded-lg border border-line bg-codebg">
        <pre
          className="scroll-slim overflow-x-auto p-3.5 text-[13px] leading-relaxed sm:p-4 sm:text-sm"
          tabIndex={0}
          aria-label={label ?? 'Java code'}
        >
          <code className="font-mono text-[color:var(--code-plain)]">
            {tokens
              ? tokens.map((t, idx) => {
                  const cls = TOKEN_CLASS[t.kind];
                  return cls ? (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={idx} className={cls}>
                      {t.text}
                    </span>
                  ) : (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={idx}>{t.text}</span>
                  );
                })
              : code}
          </code>
        </pre>
      </div>
    </figure>
  );
}
