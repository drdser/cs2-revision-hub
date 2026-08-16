import type { GradedQuestion, Question } from '../../types';
import { mcqQuestions } from './mcq';
import { trueFalseQuestions } from './trueFalse';
import { outputQuestions } from './output';
import { fillBlankQuestions } from './fillBlank';
import { codeCompletionQuestions } from './codeCompletion';
import { programmingQuestions } from './programming';

export {
  mcqQuestions,
  trueFalseQuestions,
  outputQuestions,
  fillBlankQuestions,
  codeCompletionQuestions,
  programmingQuestions,
};

/** Every question in the bank, in section order (A through F). */
export const allQuestions: Question[] = [
  ...mcqQuestions,
  ...trueFalseQuestions,
  ...outputQuestions,
  ...fillBlankQuestions,
  ...codeCompletionQuestions,
  ...programmingQuestions,
];

/**
 * Questions that can be graded automatically. Programming questions are excluded
 * because they are marked by the student, so they never affect accuracy figures.
 */
export const gradedQuestions: GradedQuestion[] = allQuestions.filter(
  (q): q is GradedQuestion => q.type !== 'programming',
);

export const questionById = new Map<string, Question>(
  allQuestions.map((q) => [q.id, q]),
);

export function getQuestion(id: string): Question | undefined {
  return questionById.get(id);
}
