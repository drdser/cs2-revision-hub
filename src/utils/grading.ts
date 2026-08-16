import type { GradedQuestion, Question } from '../types';

/** Collapse whitespace and case so free-text answers can be compared fairly. */
function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/;+$/, '');
}

/**
 * Normalise expected console output for comparison: trims each line's trailing
 * whitespace and drops leading/trailing blank lines, but preserves internal
 * blank lines, leading indentation and letter case, all of which matter.
 */
function normalizeOutput(value: string): string {
  const lines = value.replace(/\r\n/g, '\n').split('\n').map((l) => l.replace(/\s+$/, ''));
  while (lines.length && lines[0] === '') lines.shift();
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n');
}

/** True when the student's typed output matches the expected output exactly. */
export function checkOutputAnswer(given: string, expected: string): boolean {
  return normalizeOutput(given) === normalizeOutput(expected);
}

/** True when the typed text matches any accepted answer. */
export function checkTextAnswer(given: string, accepted: string[]): boolean {
  const g = normalize(given);
  if (!g) return false;
  return accepted.some((a) => normalize(a) === g);
}

/** Grade any auto-gradable question against a raw student response. */
export function gradeQuestion(question: GradedQuestion, response: string): boolean {
  switch (question.type) {
    case 'mcq':
      return Number(response) === question.correctIndex;
    case 'true-false':
      return (response === 'true') === question.correctAnswer;
    case 'output':
      return checkOutputAnswer(response, question.expectedOutput);
    case 'fill-blank':
    case 'code-completion':
      return checkTextAnswer(response, question.acceptedAnswers);
  }
}

/** The answer to show the student after they submit or reveal. */
export function revealedAnswer(question: Question): string {
  switch (question.type) {
    case 'mcq':
      return `${String.fromCharCode(65 + question.correctIndex)}. ${question.choices[question.correctIndex]}`;
    case 'true-false':
      return question.correctAnswer ? 'True' : 'False';
    case 'output':
      return question.expectedOutput;
    case 'fill-blank':
    case 'code-completion':
      return question.correctAnswer;
    case 'programming':
      return question.solution;
  }
}
