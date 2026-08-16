import type { Confidence, Difficulty, Priority, QuestionType } from '../types';

export const TYPE_LABEL: Record<QuestionType, string> = {
  mcq: 'Multiple Choice',
  'true-false': 'True / False',
  output: 'Output',
  'fill-blank': 'Fill in the Blank',
  'code-completion': 'Code Completion',
  programming: 'Programming',
};

export const TYPE_SHORT: Record<QuestionType, string> = {
  mcq: 'MCQ',
  'true-false': 'T/F',
  output: 'Output',
  'fill-blank': 'Fill Blank',
  'code-completion': 'Code',
  programming: 'Program',
};

export const TYPE_ORDER: QuestionType[] = [
  'mcq',
  'true-false',
  'output',
  'fill-blank',
  'code-completion',
  'programming',
];

/** Section letters A-F, matching the revision bank layout. */
export const TYPE_SECTION: Record<QuestionType, string> = {
  mcq: 'A',
  'true-false': 'B',
  output: 'C',
  'fill-blank': 'D',
  'code-completion': 'E',
  programming: 'F',
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  exam: 'Exam-Level',
};

export const DIFFICULTY_ORDER: Difficulty[] = ['easy', 'medium', 'hard', 'exam'];

export const CONFIDENCE_LABEL: Record<Confidence, string> = {
  'very-high': 'Very High',
  high: 'High',
  medium: 'Medium',
};

export const CONFIDENCE_ICON: Record<Confidence, string> = {
  'very-high': '🔥',
  high: '⭐',
  medium: '📘',
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  A: 'Priority A - Must Know',
  B: 'Priority B - Very Important',
  C: 'Priority C - Review If Time Allows',
};

export const CHAPTER_TITLE: Record<number, string> = {
  9: 'Inheritance',
  10: 'Polymorphism & Interfaces',
  11: 'Exception Handling',
  12: 'Not covered by the supplied material',
  13: 'Not covered by the supplied material',
  14: 'Not covered by the supplied material',
  15: 'Files & Streams',
};

export const OUTPUT_CATEGORY_LABEL: Record<string, string> = {
  inheritance: 'Inheritance Output',
  polymorphism: 'Polymorphism Output',
  interface: 'Interface Output',
  exception: 'Exceptions Output',
  'file-stream': 'File / Stream Output',
};

export const SCALE_LABEL: Record<string, string> = {
  short: 'Short Coding',
  medium: 'Medium Coding',
  full: 'Full Programming',
};

export const SCALE_HINT: Record<string, string> = {
  short: 'Roughly 3 to 10 lines of code.',
  medium: 'A method or a class to implement.',
  full: 'A multi-part, final-exam style task.',
};
