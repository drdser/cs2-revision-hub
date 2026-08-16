import { useState } from 'react';
import type { ProgrammingQuestion } from '../../types';
import { CodeBlock } from '../CodeBlock';
import { Button } from '../ui';

/**
 * Programming questions are marked by the student, so they never feed the
 * accuracy figures. The hint is gated behind its own button so the solution is
 * not the first thing on screen.
 */
export function ProgrammingBody({ question }: { question: ProgrammingQuestion }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="mt-3">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-3">
        Requirements
      </h4>
      <ul className="mt-2 space-y-1.5">
        {question.requirements.map((req) => (
          <li key={req} className="flex gap-2 text-sm text-ink-2 sm:text-[15px]">
            <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-3" />
            <span>{req}</span>
          </li>
        ))}
      </ul>

      {question.starterCode && (
        <CodeBlock code={question.starterCode} label="Starter code" />
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {!showHint && (
          <Button variant="secondary" size="sm" onClick={() => setShowHint(true)}>
            Show hint
          </Button>
        )}
        {!showSolution && (
          <Button variant="secondary" size="sm" onClick={() => setShowSolution(true)}>
            Show solution
          </Button>
        )}
        {(showHint || showSolution) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowHint(false);
              setShowSolution(false);
            }}
          >
            Hide
          </Button>
        )}
      </div>

      {showHint && (
        <div className="animate-reveal mt-3 rounded-lg border border-warn/40 bg-warn-soft px-4 py-3 text-sm text-warn-text">
          <p className="mb-1 font-semibold">Hint</p>
          <p>{question.hint}</p>
        </div>
      )}

      {showSolution && (
        <div className="animate-reveal mt-3 border-t border-line pt-4">
          <CodeBlock code={question.solution} label="Solution" />

          {question.expectedOutput && (
            <CodeBlock code={question.expectedOutput} label="Expected output" plain />
          )}

          <div className="mt-3 rounded-lg border border-line bg-sunken px-4 py-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-3">
              Explanation
            </p>
            <p className="text-sm leading-relaxed text-ink-2">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
