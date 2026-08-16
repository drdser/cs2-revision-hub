/** Question type identifiers, matching the sections of the revision bank. */
export type QuestionType =
  | 'mcq'
  | 'true-false'
  | 'output'
  | 'fill-blank'
  | 'code-completion'
  | 'programming';

/** Difficulty tiers. `exam` means "as hard as the instructor's own review sheet". */
export type Difficulty = 'easy' | 'medium' | 'hard' | 'exam';

/** Chapters covered by the final. Only chapters with verified source material carry questions. */
export type Chapter = 9 | 10 | 11 | 12 | 13 | 14 | 15;

/** Where the question's content came from, for internal provenance tracking. */
export type SourceType =
  | 'current-review' // adapted directly from the instructor's final review sheet
  | 'generated-from-course-material' // written from the lecture slides
  | 'historical-pattern'; // modelled on a repeated old-exam question

export interface BaseQuestion {
  id: string;
  chapter: Chapter;
  topic: string;
  type: QuestionType;
  difficulty: Difficulty;
  /** The prompt shown to the student. */
  question: string;
  /** Optional Java snippet rendered in a highlighted code block above the answer area. */
  code?: string;
  /** Why the correct answer is correct. Required on every question. */
  explanation: string;
  sourceType: SourceType;
}

export interface McqQuestion extends BaseQuestion {
  type: 'mcq';
  choices: string[];
  /** Index into `choices`. */
  correctIndex: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

export interface OutputQuestion extends BaseQuestion {
  type: 'output';
  code: string;
  /** Exact expected console output, newlines and spacing preserved. */
  expectedOutput: string;
  /** Ordered execution trace shown after the answer is revealed. */
  steps: string[];
  /** Sub-category used by the Output Practice page filters. */
  outputCategory:
    | 'inheritance'
    | 'polymorphism'
    | 'interface'
    | 'exception'
    | 'file-stream';
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  /** Accepted answers, compared case-insensitively after whitespace trimming. */
  acceptedAnswers: string[];
  /** The canonical answer shown in the reveal. */
  correctAnswer: string;
}

export interface CodeCompletionQuestion extends BaseQuestion {
  type: 'code-completion';
  code: string;
  /** Accepted answers for the `_____` placeholder(s) in `code`. */
  acceptedAnswers: string[];
  correctAnswer: string;
}

export interface ProgrammingQuestion extends BaseQuestion {
  type: 'programming';
  /** Bullet list of what the solution must do. */
  requirements: string[];
  /** Optional scaffold given to the student. */
  starterCode?: string;
  /** A hint revealed before the full solution. */
  hint: string;
  solution: string;
  /** Present only when the program's output is deterministic. */
  expectedOutput?: string;
  /** Size band used by the Coding Practice page. */
  scale: 'short' | 'medium' | 'full';
}

export type Question =
  | McqQuestion
  | TrueFalseQuestion
  | OutputQuestion
  | FillBlankQuestion
  | CodeCompletionQuestion
  | ProgrammingQuestion;

/** Questions that are graded automatically and therefore count towards accuracy. */
export type GradedQuestion =
  | McqQuestion
  | TrueFalseQuestion
  | OutputQuestion
  | FillBlankQuestion
  | CodeCompletionQuestion;

export type Confidence = 'very-high' | 'high' | 'medium';

export type EvidenceSource =
  | 'Current Final Review'
  | 'Previous Final Exam'
  | 'Old Question Collections'
  | 'Lecture Slides';

export interface Prediction {
  id: string;
  chapter: Chapter;
  topic: string;
  confidence: Confidence;
  /** Which question format this topic is most likely to appear as. */
  likelyTypes: QuestionType[];
  /** Concise evidence summary shown on the card. */
  reason: string;
  evidence: EvidenceSource[];
  /** Ids of bank questions that drill this prediction. */
  questionIds: string[];
}

export type Priority = 'A' | 'B' | 'C';

export interface MustStudyItem {
  id: string;
  chapter: Chapter;
  concept: string;
  priority: Priority;
  whyItMatters: string;
  likelyStyles: QuestionType[];
}

export interface ChapterInfo {
  chapter: Chapter;
  title: string;
  /** False for chapters with no dedicated source material. */
  covered: boolean;
  /** Shown instead of content when `covered` is false. */
  coverageNote?: string;
  summary: string[];
  keywords: string[];
  rules: string[];
  mistakes: string[];
  traps: string[];
}

export interface TrapItem {
  id: string;
  title: string;
  chapter: Chapter;
  wrongBelief: string;
  reality: string;
  code?: string;
}

export interface CheatSheetSection {
  id: string;
  title: string;
  chapter: Chapter | 'all';
  items: { label: string; detail: string; code?: string }[];
}

/** Result of grading one attempt. */
export type AttemptResult = 'correct' | 'incorrect';

export interface AttemptRecord {
  result: AttemptResult;
  /** Epoch millis of the most recent attempt. */
  at: number;
}

export interface MockExamResult {
  id: string;
  at: number;
  score: number;
  total: number;
  /** Chapter -> [correct, attempted] */
  byChapter: Record<string, [number, number]>;
  byType: Record<string, [number, number]>;
}

export interface ProgressState {
  attempts: Record<string, AttemptRecord>;
  bookmarks: string[];
  mockResults: MockExamResult[];
}
