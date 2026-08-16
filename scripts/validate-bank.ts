/**
 * Question-bank integrity check.
 *
 * Run with:  npm run validate
 *
 * Catches the failure modes that are invisible at compile time: duplicate ids,
 * an MCQ whose correct index is out of range, a prediction pointing at a question
 * that does not exist, an accepted-answer list that does not include the answer
 * shown to the student, and so on.
 */
import {
  allQuestions,
  codeCompletionQuestions,
  fillBlankQuestions,
  mcqQuestions,
  outputQuestions,
  programmingQuestions,
  trueFalseQuestions,
} from '../src/data/questions';
import { predictions, mostLikelyQuestionIds } from '../src/data/predictions';
import { chapters, coveredChapters } from '../src/data/chapters';
import { mustStudyItems } from '../src/data/mustStudy';
import { traps } from '../src/data/traps';
import { cheatSheet } from '../src/data/cheatSheet';
import { gradeQuestion } from '../src/utils/grading';
import type { GradedQuestion } from '../src/types';

const errors: string[] = [];
const warnings: string[] = [];

const fail = (msg: string) => errors.push(msg);
const warn = (msg: string) => warnings.push(msg);

// ------------------------------------------------------------- unique ids
const ids = new Map<string, number>();
for (const q of allQuestions) {
  ids.set(q.id, (ids.get(q.id) ?? 0) + 1);
}
for (const [id, count] of ids) {
  if (count > 1) fail(`Duplicate question id "${id}" appears ${count} times`);
}

// ------------------------------------------------- every question has basics
for (const q of allQuestions) {
  if (!q.question.trim()) fail(`${q.id}: empty question text`);
  if (!q.explanation.trim()) fail(`${q.id}: missing explanation`);
  if (!q.topic.trim()) fail(`${q.id}: missing topic`);
  if (!coveredChapters.includes(q.chapter)) {
    fail(`${q.id}: chapter ${q.chapter} has no verified source material`);
  }
}

// ------------------------------------------------------------------- MCQ
for (const q of mcqQuestions) {
  if (q.choices.length < 2) fail(`${q.id}: needs at least two choices`);
  if (q.correctIndex < 0 || q.correctIndex >= q.choices.length) {
    fail(`${q.id}: correctIndex ${q.correctIndex} is out of range`);
  }
  const unique = new Set(q.choices.map((c) => c.trim().toLowerCase()));
  if (unique.size !== q.choices.length) fail(`${q.id}: has duplicate choices`);
  for (const c of q.choices) {
    if (!c.trim()) fail(`${q.id}: has an empty choice`);
  }
  // Grading must agree with the declared correct answer.
  if (!gradeQuestion(q as GradedQuestion, String(q.correctIndex))) {
    fail(`${q.id}: grading disagrees with correctIndex`);
  }
}

// ------------------------------------------------------------ true / false
for (const q of trueFalseQuestions) {
  if (typeof q.correctAnswer !== 'boolean') fail(`${q.id}: correctAnswer must be a boolean`);
  if (!gradeQuestion(q as GradedQuestion, String(q.correctAnswer))) {
    fail(`${q.id}: grading disagrees with correctAnswer`);
  }
}

// ----------------------------------------------------------------- output
for (const q of outputQuestions) {
  if (!q.code.trim()) fail(`${q.id}: output question has no code`);
  if (!q.expectedOutput.trim()) fail(`${q.id}: output question has no expected output`);
  if (q.steps.length === 0) fail(`${q.id}: output question has no execution trace`);
  if (new Set(q.steps).size !== q.steps.length) {
    fail(`${q.id}: has duplicate trace steps (they are used as React keys)`);
  }
  if (!gradeQuestion(q as GradedQuestion, q.expectedOutput)) {
    fail(`${q.id}: expectedOutput does not grade as correct`);
  }
}

// ------------------------------------------- fill-blank / code-completion
for (const q of [...fillBlankQuestions, ...codeCompletionQuestions]) {
  if (q.acceptedAnswers.length === 0) fail(`${q.id}: no accepted answers`);
  if (!gradeQuestion(q as GradedQuestion, q.correctAnswer)) {
    fail(`${q.id}: correctAnswer "${q.correctAnswer}" is not in acceptedAnswers`);
  }
  if (q.type === 'code-completion' && !q.code.includes('_____')) {
    fail(`${q.id}: code-completion snippet has no _____ placeholder`);
  }
}

// ------------------------------------------------------------ programming
for (const q of programmingQuestions) {
  if (q.requirements.length === 0) fail(`${q.id}: no requirements listed`);
  if (new Set(q.requirements).size !== q.requirements.length) {
    fail(`${q.id}: has duplicate requirements (they are used as React keys)`);
  }
  if (!q.hint.trim()) fail(`${q.id}: missing hint`);
  if (!q.solution.trim()) fail(`${q.id}: missing solution`);
}

// ---------------------------------------------------- prediction integrity
const known = new Set(allQuestions.map((q) => q.id));
for (const p of predictions) {
  if (p.questionIds.length === 0) warn(`${p.id}: prediction links to no questions`);
  for (const qid of p.questionIds) {
    if (!known.has(qid)) fail(`${p.id}: links to unknown question id "${qid}"`);
  }
  if (!p.reason.trim()) fail(`${p.id}: missing reason`);
  if (p.evidence.length === 0) fail(`${p.id}: missing evidence`);
  if (!coveredChapters.includes(p.chapter)) {
    fail(`${p.id}: chapter ${p.chapter} has no verified source material`);
  }
  // A "very high" claim must rest on the current review sheet or on repetition
  // across past papers, never on the lectures alone.
  if (
    p.confidence === 'very-high' &&
    !p.evidence.includes('Current Final Review') &&
    !p.evidence.includes('Previous Final Exam')
  ) {
    fail(`${p.id}: very-high confidence without review-sheet or past-paper evidence`);
  }
}

const predIds = new Set(predictions.map((p) => p.id));
if (predIds.size !== predictions.length) fail('Duplicate prediction ids');

for (const qid of mostLikelyQuestionIds) {
  if (!known.has(qid)) fail(`mostLikelyQuestionIds: unknown question id "${qid}"`);
}
if (new Set(mostLikelyQuestionIds).size !== mostLikelyQuestionIds.length) {
  fail('mostLikelyQuestionIds contains duplicates');
}

// --------------------------------------------------------- other datasets
for (const c of chapters) {
  if (c.covered && c.summary.length === 0) fail(`Chapter ${c.chapter}: covered but no summary`);
  if (!c.covered && !c.coverageNote) fail(`Chapter ${c.chapter}: uncovered but no coverage note`);
}

const msIds = new Set(mustStudyItems.map((i) => i.id));
if (msIds.size !== mustStudyItems.length) fail('Duplicate must-study ids');

const trapIds = new Set(traps.map((t) => t.id));
if (trapIds.size !== traps.length) fail('Duplicate trap ids');

const csIds = new Set(cheatSheet.map((s) => s.id));
if (csIds.size !== cheatSheet.length) fail('Duplicate cheat-sheet section ids');

// --------------------------------------------------- near-duplicate check
// Output and code-completion questions deliberately share a stem ("What is the
// exact output of the following Java program?"), so the snippet is part of the key.
const seenText = new Map<string, string>();
for (const q of allQuestions) {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  const key = `${q.type}::${norm(q.question)}::${norm(q.code ?? '')}`;
  const prior = seenText.get(key);
  if (prior) warn(`${q.id} duplicates ${prior} (same prompt and same code)`);
  else seenText.set(key, q.id);
}

// -------------------------------------------------------------- reporting
const byType: Record<string, number> = {};
const byChapter: Record<number, number> = {};
const byDifficulty: Record<string, number> = {};
for (const q of allQuestions) {
  byType[q.type] = (byType[q.type] ?? 0) + 1;
  byChapter[q.chapter] = (byChapter[q.chapter] ?? 0) + 1;
  byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] ?? 0) + 1;
}

console.log('\nQuestion bank summary');
console.log('---------------------');
console.log(`Total questions:    ${allQuestions.length}`);
console.log('By type:            ', byType);
console.log('By chapter:         ', byChapter);
console.log('By difficulty:      ', byDifficulty);
console.log(`Predictions:        ${predictions.length}`);
console.log(`Most-likely set:    ${mostLikelyQuestionIds.length}`);
console.log(`Must-study items:   ${mustStudyItems.length}`);
console.log(`Exam traps:         ${traps.length}`);
console.log(`Cheat-sheet blocks: ${cheatSheet.length}`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  x ${e}`);
  process.exit(1);
}

console.log('\nAll checks passed.\n');
