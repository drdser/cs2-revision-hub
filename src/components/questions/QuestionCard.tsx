import { useEffect, useState } from 'react';
import type { GradedQuestion, Question } from '../../types';
import { useProgress } from '../../hooks/useProgress';
import { gradeQuestion, revealedAnswer } from '../../utils/grading';
import { CodeBlock } from '../CodeBlock';
import { ChapterBadge, DifficultyBadge, ResultBadge, TopicBadge, TypeBadge } from '../Badges';
import { Button, Card } from '../ui';
import { McqBody } from './McqBody';
import { TrueFalseBody } from './TrueFalseBody';
import { TextAnswerBody } from './TextAnswerBody';
import { ProgrammingBody } from './ProgrammingBody';

export type CardMode = 'study' | 'exam';

interface QuestionCardProps {
  question: Question;
  /** Display number, e.g. "12" for the twelfth question in a list. */
  index?: number;
  mode?: CardMode;
  /** Exam mode only: the currently selected answer, owned by the parent. */
  answer?: string;
  onAnswer?: (raw: string) => void;
  /** Exam mode only: force the answer and explanation open, for the review pass. */
  forceRevealed?: boolean;
}

/**
 * One question, in a card.
 *
 * In study mode the card owns its own answer state and reveals the explanation
 * as soon as the student submits. In exam mode the parent owns the answer and
 * nothing is revealed until `forceRevealed` is set during the review pass.
 */
export function QuestionCard({
  question,
  index,
  mode = 'study',
  answer: controlledAnswer,
  onAnswer,
  forceRevealed = false,
}: QuestionCardProps) {
  const { recordAttempt, toggleBookmark, isBookmarked } = useProgress();

  const [localAnswer, setLocalAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [peeked, setPeeked] = useState(false);

  // Reset when the card is reused for a different question (quick practice, mocks).
  useEffect(() => {
    setLocalAnswer('');
    setSubmitted(false);
    setPeeked(false);
  }, [question.id]);

  const isExam = mode === 'exam';
  const answer = isExam ? (controlledAnswer ?? '') : localAnswer;
  const setAnswer = (value: string) => {
    if (isExam) onAnswer?.(value);
    else setLocalAnswer(value);
  };

  const gradable = question.type !== 'programming';
  const revealed = isExam ? forceRevealed : submitted || peeked;
  const correct =
    gradable && (submitted || forceRevealed)
      ? gradeQuestion(question as GradedQuestion, answer)
      : false;

  const bookmarked = isBookmarked(question.id);

  const handleSubmit = () => {
    if (!gradable || !answer.trim()) return;
    const isCorrect = gradeQuestion(question as GradedQuestion, answer);
    setSubmitted(true);
    recordAttempt(question.id, isCorrect ? 'correct' : 'incorrect');
  };

  const handleRetry = () => {
    setLocalAnswer('');
    setSubmitted(false);
    setPeeked(false);
  };

  const answerLabel =
    question.type === 'output' ? 'Your answer (exact output)' : 'Your answer';

  return (
    <Card as="article" className="p-4 sm:p-5">
      {/* ------------------------------------------------------------ header */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {index !== undefined && (
          <span className="mr-0.5 font-mono text-sm font-semibold text-ink-3">
            Q{index}
          </span>
        )}
        <ChapterBadge chapter={question.chapter} />
        <TypeBadge type={question.type} />
        <DifficultyBadge difficulty={question.difficulty} />
        <TopicBadge topic={question.topic} />

        <button
          type="button"
          onClick={() => toggleBookmark(question.id)}
          aria-pressed={bookmarked}
          aria-label={
            bookmarked
              ? `Remove question ${question.id} from saved questions`
              : `Save question ${question.id} to review later`
          }
          title={bookmarked ? 'Saved for later' : 'Save for later'}
          className={`ml-auto rounded-lg px-2 py-1 text-lg leading-none transition-colors ${
            bookmarked ? 'text-warn' : 'text-ink-3 hover:bg-sunken hover:text-ink-2'
          }`}
        >
          <span aria-hidden="true">{bookmarked ? '★' : '☆'}</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- prompt */}
      <p className="text-[15px] font-medium leading-relaxed text-ink sm:text-base">
        {question.question}
      </p>

      {question.code && question.type !== 'programming' && (
        <CodeBlock code={question.code} />
      )}

      {/* --------------------------------------------------------------- body */}
      {question.type === 'mcq' && (
        <McqBody
          question={question}
          answer={answer}
          onAnswer={setAnswer}
          revealed={revealed}
          disabled={revealed && !isExam}
        />
      )}

      {question.type === 'true-false' && (
        <TrueFalseBody
          question={question}
          answer={answer}
          onAnswer={setAnswer}
          revealed={revealed}
          disabled={revealed && !isExam}
        />
      )}

      {question.type === 'output' && (
        <TextAnswerBody
          id={question.id}
          answer={answer}
          onAnswer={setAnswer}
          disabled={revealed && !isExam}
          multiline
          label={answerLabel}
          placeholder="Type the exact console output, line by line"
        />
      )}

      {(question.type === 'fill-blank' || question.type === 'code-completion') && (
        <TextAnswerBody
          id={question.id}
          answer={answer}
          onAnswer={setAnswer}
          disabled={revealed && !isExam}
          label={answerLabel}
          placeholder="Type the missing code"
        />
      )}

      {question.type === 'programming' && <ProgrammingBody question={question} />}

      {/* ------------------------------------------------------------ actions */}
      {gradable && !isExam && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!submitted && !peeked && (
            <>
              <Button onClick={handleSubmit} disabled={!answer.trim()} size="sm">
                Check answer
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setPeeked(true)}>
                {question.type === 'output' ? 'Show output' : 'Show answer'}
              </Button>
            </>
          )}
          {(submitted || peeked) && (
            <Button variant="secondary" size="sm" onClick={handleRetry}>
              Try again
            </Button>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- reveal */}
      {gradable && revealed && (
        <div className="animate-reveal mt-4 border-t border-line pt-4">
          {(submitted || (isExam && forceRevealed && answer.trim())) && (
            <div className="mb-3">
              <ResultBadge correct={correct} />
            </div>
          )}

          {isExam && forceRevealed && !answer.trim() && (
            <p className="mb-3 text-sm font-medium text-ink-3">Not answered</p>
          )}

          {question.type === 'output' ? (
            <>
              <CodeBlock code={question.expectedOutput} label="Expected output" plain />
              {answer.trim() && !correct && (
                <CodeBlock code={answer} label="Your answer" plain />
              )}
            </>
          ) : (
            <p className="text-sm text-ink sm:text-[15px]">
              <span className="font-semibold">Correct answer: </span>
              <span className="font-mono">{revealedAnswer(question)}</span>
            </p>
          )}

          {question.type === 'output' && question.steps.length > 0 && (
            <div className="mt-3 rounded-lg border border-line bg-sunken px-4 py-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">
                Execution trace
              </p>
              <ol className="space-y-1.5">
                {question.steps.map((step, i) => (
                  <li key={step} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                    <span className="shrink-0 font-mono text-xs text-ink-3">
                      Step {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-3 rounded-lg border border-line bg-sunken px-4 py-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-3">
              Explanation
            </p>
            <p className="text-sm leading-relaxed text-ink-2">{question.explanation}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
