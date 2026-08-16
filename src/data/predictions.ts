import type { Prediction } from '../types';

/**
 * Exam predictions.
 *
 * These come from a concept-by-concept comparison across four evidence streams:
 * the current final review sheet, the previous final exam, the old question
 * collections, and the lecture decks. A topic reaches "very high" only when it
 * appears on the current review sheet AND is emphasised in the lectures, or when
 * it recurs across several previous papers as well as the lectures.
 *
 * `questionIds` point at the bank items that drill each prediction.
 */
export const predictions: Prediction[] = [
  // ------------------------------------------------------------- VERY HIGH
  {
    id: 'pred-01',
    chapter: 9,
    topic: 'The super keyword for an overridden method',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'output', 'code-completion'],
    reason:
      'Appears as a direct multiple-choice item on the current review sheet, drives the review sheet\'s own output-tracing question, and is one of the most repeated points across the Chapter 9 lectures.',
    evidence: ['Current Final Review', 'Lecture Slides', 'Old Question Collections'],
    questionIds: ['mcq-09-01', 'out-01', 'out-03', 'cc-03', 'tf-09-18'],
  },
  {
    id: 'pred-02',
    chapter: 9,
    topic: 'Assigning a superclass variable to a subclass variable',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'true-false', 'output'],
    reason:
      'A multiple-choice item on the current review sheet, and the lectures devote a full slide to the three legal reference assignments and the one illegal direction.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['mcq-09-02', 'tf-09-14', 'out-10'],
  },
  {
    id: 'pred-03',
    chapter: 10,
    topic: 'Instantiating an abstract class is a compilation error',
    confidence: 'very-high',
    likelyTypes: ['true-false', 'mcq', 'fill-blank'],
    reason:
      'Two separate true/false statements on the current review sheet cover this, plus the fill-in-the-keyword item whose answer is "compilation". The lectures repeat it in the abstract-class section.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['tf-10-01', 'tf-10-02', 'mcq-10-04', 'fb-01', 'out-17'],
  },
  {
    id: 'pred-04',
    chapter: 10,
    topic: 'A class not implementing every interface method must be abstract',
    confidence: 'very-high',
    likelyTypes: ['true-false', 'mcq', 'programming'],
    reason:
      'A true/false item on the current review sheet, a multiple-choice item in the old question collections, and an explicit "contract with the compiler" slide in the lectures. It is also part (d) of a programming question on a previous final.',
    evidence: [
      'Current Final Review',
      'Previous Final Exam',
      'Old Question Collections',
      'Lecture Slides',
    ],
    questionIds: ['tf-10-03', 'mcq-10-13', 'mcq-10-08', 'fb-08', 'prog-07'],
  },
  {
    id: 'pred-05',
    chapter: 11,
    topic: 'The multi-catch separator |',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'fill-blank', 'code-completion'],
    reason:
      'A multiple-choice item on the current review sheet with the vertical bar as the answer, and a dedicated multi-catch slide in the Chapter 11 lectures.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['mcq-11-01', 'fb-16', 'cc-15', 'out-25'],
  },
  {
    id: 'pred-06',
    chapter: 11,
    topic: 'Where the throws clause appears',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'fill-blank', 'code-completion'],
    reason:
      'A multiple-choice item on the current review sheet, and a lecture slide states explicitly that the clause goes after the parameter list and before the body.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['mcq-11-02', 'fb-13', 'cc-17', 'mcq-11-26'],
  },
  {
    id: 'pred-07',
    chapter: 11,
    topic: 'Preconditions and postconditions as comments before the method',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'true-false', 'programming'],
    reason:
      'A multiple-choice item on the current review sheet, matching a lecture slide almost word for word.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['mcq-11-03', 'mcq-11-21', 'tf-11-20', 'prog-19'],
  },
  {
    id: 'pred-08',
    chapter: 11,
    topic: 'Java provides 2 versions of the assert statement',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'code-completion', 'programming'],
    reason:
      'A multiple-choice item on the current review sheet, and the review sheet also asks students to write an assert statement with a message. The lectures state the count explicitly.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['mcq-11-04', 'mcq-11-18', 'cc-20', 'prog-02'],
  },
  {
    id: 'pred-09',
    chapter: 11,
    topic: 'try-with-resources requires AutoCloseable',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'true-false', 'code-completion'],
    reason:
      'One multiple-choice item and one true/false item on the current review sheet both target try-with-resources, and the lectures give the feature four slides.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['mcq-11-05', 'tf-11-02', 'cc-21', 'cc-22', 'out-28'],
  },
  {
    id: 'pred-10',
    chapter: 15,
    topic: 'PrintWriter writes formatted output',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'output', 'programming'],
    reason:
      'A multiple-choice item on the current review sheet with BufferedWriter and BufferedReader as the distractors, and a worked PrintWriter example with its exact file contents in the Chapter 15 lectures.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['mcq-15-01', 'fb-26', 'out-31', 'prog-16'],
  },
  {
    id: 'pred-11',
    chapter: 15,
    topic: 'File.mkdir() creates a directory',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'fill-blank', 'code-completion'],
    reason:
      'A multiple-choice item on the current review sheet with makeDir and makeDirectory as distractors, and a full worked example in the lectures.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['mcq-15-02', 'fb-23', 'cc-29', 'mcq-15-19', 'prog-18'],
  },
  {
    id: 'pred-12',
    chapter: 15,
    topic: 'read() returns -1 at end of file',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'fill-blank', 'code-completion'],
    reason:
      'The single most repeated question in the whole source set: it appears twice on the previous final exam and again in both old question collections, and every read loop in the lectures relies on it.',
    evidence: [
      'Previous Final Exam',
      'Old Question Collections',
      'Lecture Slides',
      'Current Final Review',
    ],
    questionIds: ['mcq-15-03', 'fb-21', 'cc-23', 'tf-15-03', 'out-32'],
  },
  {
    id: 'pred-13',
    chapter: 15,
    topic: 'Character streams handle 16-bit Unicode',
    confidence: 'very-high',
    likelyTypes: ['true-false', 'mcq'],
    reason:
      'A true/false item on the current review sheet taken almost verbatim from the lecture slide contrasting byte streams with character streams.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['tf-15-01', 'mcq-15-11', 'mcq-15-10', 'fb-28'],
  },
  {
    id: 'pred-14',
    chapter: 15,
    topic: 'UTF stands for Unicode Transformation Format',
    confidence: 'very-high',
    likelyTypes: ['true-false', 'mcq', 'fill-blank'],
    reason:
      'A true/false item on the current review sheet uses the wrong expansion "Unified" as the trap, and the lecture slide gives the correct one.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['tf-15-02', 'fb-27', 'mcq-15-21'],
  },
  {
    id: 'pred-15',
    chapter: 11,
    topic: 'A try block may be followed by a finally block only',
    confidence: 'very-high',
    likelyTypes: ['true-false', 'mcq'],
    reason:
      'A true/false item on the current review sheet, and a lecture slide lists the three valid try/catch/finally shapes explicitly.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['tf-11-01', 'mcq-11-09', 'cc-16'],
  },
  {
    id: 'pred-16',
    chapter: 9,
    topic: 'Output tracing: inheritance, super and print versus println',
    confidence: 'very-high',
    likelyTypes: ['output'],
    reason:
      'The current review sheet contains exactly one output-tracing question, and it is built on a subclass constructor calling super(name), an overridden method calling super.eat(), and a deliberate mix of print and println.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['out-01', 'out-03', 'out-07', 'out-08', 'out-02'],
  },
  {
    id: 'pred-17',
    chapter: 15,
    topic: 'Completing a file-reading loop that counts characters',
    confidence: 'very-high',
    likelyTypes: ['code-completion', 'programming'],
    reason:
      'The current review sheet ends with exactly this task: a BufferedReader read loop that must be completed to count uppercase and lowercase characters and print both totals.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['prog-11', 'cc-28', 'cc-23', 'mcq-15-26', 'out-32'],
  },
  {
    id: 'pred-18',
    chapter: 9,
    topic: 'private instance variables and subclass access',
    confidence: 'very-high',
    likelyTypes: ['true-false', 'mcq'],
    reason:
      'Two true/false items on the current review sheet cover this from both sides, one of which uses the word "only" as the trap. The lectures devote several slides to private versus protected.',
    evidence: ['Current Final Review', 'Lecture Slides', 'Old Question Collections'],
    questionIds: ['tf-09-02', 'tf-09-03', 'mcq-09-10', 'out-09', 'cc-04'],
  },
  {
    id: 'pred-19',
    chapter: 9,
    topic: 'A subclass can be a superclass of future subclasses',
    confidence: 'very-high',
    likelyTypes: ['true-false'],
    reason:
      'The opening true/false item on the current review sheet, quoting a lecture bullet directly.',
    evidence: ['Current Final Review', 'Lecture Slides'],
    questionIds: ['tf-09-01', 'mcq-09-20'],
  },
  {
    id: 'pred-20',
    chapter: 10,
    topic: 'Interface rules: implicitly public methods, constants, multiple interfaces',
    confidence: 'very-high',
    likelyTypes: ['mcq', 'true-false'],
    reason:
      'The "choose the wrong statement" item on the current review sheet packs all three rules into one question and answers "none of the above". The same three rules recur throughout the old question collections and the Chapter 10 lectures.',
    evidence: [
      'Current Final Review',
      'Old Question Collections',
      'Lecture Slides',
      'Previous Final Exam',
    ],
    questionIds: ['mcq-10-01', 'mcq-10-10', 'mcq-10-11', 'mcq-10-14', 'tf-10-11', 'out-19'],
  },

  // ------------------------------------------------------------------ HIGH
  {
    id: 'pred-21',
    chapter: 10,
    topic: 'Writing an interface and implementing it in a class',
    confidence: 'high',
    likelyTypes: ['programming'],
    reason:
      'Two separate programming questions on the previous final exam ask for exactly this, one with a Predator interface and one with a Greenhouse_Emission interface processed through an ArrayList. Both also reappear in the old question collections.',
    evidence: ['Previous Final Exam', 'Old Question Collections', 'Lecture Slides'],
    questionIds: ['prog-07', 'prog-13', 'out-18', 'out-21', 'cc-08', 'cc-10'],
  },
  {
    id: 'pred-22',
    chapter: 15,
    topic: 'Writing to a file and reading it back with exception handling',
    confidence: 'high',
    likelyTypes: ['programming'],
    reason:
      'A programming question with this exact five-part shape appears on the previous final exam and again in the old question collections, once with book records and once with student records.',
    evidence: ['Previous Final Exam', 'Old Question Collections', 'Lecture Slides'],
    questionIds: ['prog-14', 'prog-16', 'out-33', 'cc-25', 'cc-26'],
  },
  {
    id: 'pred-23',
    chapter: 9,
    topic: 'Creating a subclass with a private field and a constructor',
    confidence: 'high',
    likelyTypes: ['programming', 'code-completion'],
    reason:
      'A programming question on the previous final exam gives a superclass and asks for a subclass with a private field, a set method and a constructor. A similar three-part task appears in the old question collections.',
    evidence: ['Previous Final Exam', 'Old Question Collections', 'Lecture Slides'],
    questionIds: ['prog-06', 'prog-01', 'prog-12', 'cc-02', 'cc-01'],
  },
  {
    id: 'pred-24',
    chapter: 10,
    topic: 'Dynamic binding and polymorphic processing of an array',
    confidence: 'high',
    likelyTypes: ['output', 'mcq', 'true-false'],
    reason:
      'The Chapter 10 lectures build the whole chapter around this, including a worked payroll example with its printed output. It is the mechanism behind nearly every inheritance output question.',
    evidence: ['Lecture Slides', 'Current Final Review'],
    questionIds: ['mcq-10-02', 'tf-10-07', 'out-11', 'out-12', 'out-15', 'prog-15'],
  },
  {
    id: 'pred-25',
    chapter: 10,
    topic: 'instanceof and downcasting',
    confidence: 'high',
    likelyTypes: ['mcq', 'code-completion', 'output'],
    reason:
      'The lectures introduce instanceof and downcasting together with a corrected code line, and use them in the worked payroll example.',
    evidence: ['Lecture Slides'],
    questionIds: ['mcq-10-17', 'mcq-10-18', 'cc-11', 'cc-12', 'out-12', 'out-16'],
  },
  {
    id: 'pred-26',
    chapter: 11,
    topic: 'Writing a custom exception class',
    confidence: 'high',
    likelyTypes: ['programming', 'code-completion', 'mcq'],
    reason:
      'The Chapter 11 lectures give a complete InsufficientAccountBalanceException example including the super(s) call, and tie it to a bank account withdraw method.',
    evidence: ['Lecture Slides'],
    questionIds: ['prog-04', 'prog-09', 'cc-19', 'mcq-11-15', 'out-26'],
  },
  {
    id: 'pred-27',
    chapter: 11,
    topic: 'What the finally block does and when it is skipped',
    confidence: 'high',
    likelyTypes: ['true-false', 'output', 'mcq'],
    reason:
      'The lectures list the exact cases: finally runs on normal completion, on return and on break, but not after System.exit. That level of detail is usually a sign of an exam question.',
    evidence: ['Lecture Slides', 'Current Final Review'],
    questionIds: ['mcq-11-10', 'tf-11-06', 'tf-11-07', 'out-23', 'out-27'],
  },
  {
    id: 'pred-28',
    chapter: 15,
    topic: 'Stream method names: close, write, read',
    confidence: 'high',
    likelyTypes: ['mcq'],
    reason:
      'The previous final exam asks which method closes a file and which writes to a file, and both questions reappear in the old question collections with the same distractors.',
    evidence: ['Previous Final Exam', 'Old Question Collections'],
    questionIds: ['mcq-15-04', 'mcq-15-05', 'mcq-15-24', 'tf-15-20'],
  },
  {
    id: 'pred-29',
    chapter: 15,
    topic: 'Which package and which classes belong to java.io',
    confidence: 'high',
    likelyTypes: ['mcq'],
    reason:
      'Three separate questions across the previous final exam and the old question collections test this, including the trap that String is not a java.io class.',
    evidence: ['Previous Final Exam', 'Old Question Collections', 'Lecture Slides'],
    questionIds: ['mcq-15-06', 'mcq-15-07', 'mcq-15-09', 'fb-25'],
  },
  {
    id: 'pred-30',
    chapter: 15,
    topic: 'FileNotFoundException and IOException',
    confidence: 'high',
    likelyTypes: ['mcq', 'true-false', 'programming'],
    reason:
      'The previous final exam asks which exception is thrown when a file is not found, and every file-handling programming question in the sources asks students to catch the appropriate exception.',
    evidence: ['Previous Final Exam', 'Old Question Collections', 'Lecture Slides'],
    questionIds: ['mcq-15-08', 'tf-15-15', 'prog-14'],
  },
  {
    id: 'pred-31',
    chapter: 10,
    topic: 'final methods and final classes',
    confidence: 'high',
    likelyTypes: ['mcq', 'true-false'],
    reason:
      'The Chapter 10 lectures close with two dedicated slides on final methods and final classes, including the point that private and static methods are implicitly final and that String is a final class.',
    evidence: ['Lecture Slides'],
    questionIds: ['mcq-10-20', 'mcq-10-21', 'tf-10-17', 'tf-10-18', 'mcq-10-03', 'cc-13'],
  },
  {
    id: 'pred-32',
    chapter: 9,
    topic: 'Subclass constructors must call a superclass constructor',
    confidence: 'high',
    likelyTypes: ['output', 'code-completion', 'mcq'],
    reason:
      'A dedicated lecture slide states the rule and its failure case, an old multiple-choice item asks which keyword performs the call, and every subclass programming question in the sources depends on it.',
    evidence: ['Lecture Slides', 'Old Question Collections', 'Previous Final Exam'],
    questionIds: ['mcq-09-03', 'mcq-09-04', 'mcq-09-05', 'out-02', 'out-05', 'cc-02'],
  },
  {
    id: 'pred-33',
    chapter: 10,
    topic: 'Abstract versus concrete subclasses',
    confidence: 'high',
    likelyTypes: ['mcq', 'true-false', 'programming'],
    reason:
      'Two multiple-choice items in the old question collections ask what a non-abstract child must do about an inherited abstract method, and the lectures repeat the rule in both the abstract-class and the interface sections.',
    evidence: ['Old Question Collections', 'Lecture Slides', 'Current Final Review'],
    questionIds: ['mcq-10-08', 'mcq-10-09', 'mcq-10-06', 'tf-10-05', 'prog-10'],
  },
  {
    id: 'pred-34',
    chapter: 10,
    topic: 'Interface fields are constants',
    confidence: 'high',
    likelyTypes: ['output', 'true-false', 'fill-blank'],
    reason:
      'An old output question assigns a new value to an interface field and expects a compiler error as the answer, and a lecture slide states that all interface fields are implicitly public, static and final.',
    evidence: ['Old Question Collections', 'Lecture Slides', 'Current Final Review'],
    questionIds: ['out-19', 'tf-10-11', 'mcq-10-10', 'fb-12'],
  },
  {
    id: 'pred-35',
    chapter: 10,
    topic: 'Method overloading as compile-time polymorphism',
    confidence: 'high',
    likelyTypes: ['output', 'mcq', 'programming'],
    reason:
      'A programming question in the old question collections gives an Overload class and asks whether overloading is polymorphism and whether it shows static binding, with the answer being yes to both.',
    evidence: ['Old Question Collections', 'Lecture Slides'],
    questionIds: ['mcq-10-24', 'tf-10-21', 'out-14'],
  },

  // ---------------------------------------------------------------- MEDIUM
  {
    id: 'pred-36',
    chapter: 11,
    topic: 'The stack trace and printStackTrace()',
    confidence: 'medium',
    likelyTypes: ['mcq', 'fill-blank'],
    reason:
      'The Chapter 11 Part II lectures open with the stack trace, including the StackTraceElement array. It appears in lecture code samples but has not surfaced on any supplied exam paper.',
    evidence: ['Lecture Slides'],
    questionIds: ['mcq-11-16', 'mcq-11-17', 'fb-20', 'tf-11-16'],
  },
  {
    id: 'pred-37',
    chapter: 11,
    topic: 'The termination model and catch-block ordering',
    confidence: 'medium',
    likelyTypes: ['output', 'true-false'],
    reason:
      'The lectures name the termination model explicitly and describe how control moves to the first matching catch block, which makes it good output-question material.',
    evidence: ['Lecture Slides', 'Old Question Collections'],
    questionIds: ['mcq-11-12', 'tf-11-10', 'tf-11-11', 'out-22', 'out-24'],
  },
  {
    id: 'pred-38',
    chapter: 15,
    topic: 'Appending to a file with the two-argument constructor',
    confidence: 'medium',
    likelyTypes: ['mcq', 'output', 'code-completion'],
    reason:
      'Both file-writing examples in the lectures carry an inline comment about passing true to append, and one old solution relies on it. It is a natural distractor in an output question.',
    evidence: ['Lecture Slides', 'Previous Final Exam'],
    questionIds: ['mcq-15-17', 'tf-15-17', 'cc-27', 'out-33'],
  },
  {
    id: 'pred-39',
    chapter: 15,
    topic: 'readLine() returns null, not -1',
    confidence: 'medium',
    likelyTypes: ['mcq', 'fill-blank', 'code-completion'],
    reason:
      'The lectures show a read() loop and a readLine() loop on consecutive slides with different sentinels, which is exactly the kind of contrast that becomes a question.',
    evidence: ['Lecture Slides'],
    questionIds: ['mcq-15-13', 'fb-22', 'cc-24', 'tf-15-04'],
  },
  {
    id: 'pred-40',
    chapter: 15,
    topic: 'File.list() and directory contents',
    confidence: 'medium',
    likelyTypes: ['mcq', 'programming'],
    reason:
      'The lectures give list() its own worked example alongside mkdir(). Since mkdir() is on the current review sheet, its companion method is a reasonable candidate.',
    evidence: ['Lecture Slides'],
    questionIds: ['mcq-15-18', 'fb-24', 'prog-18', 'tf-15-12'],
  },
  {
    id: 'pred-41',
    chapter: 15,
    topic: 'Unicode escape sequences and absolute paths',
    confidence: 'medium',
    likelyTypes: ['output', 'mcq'],
    reason:
      'The final Chapter 15 lecture prints the year 2026 with \\u escapes, and an earlier slide explains that \\\\ produces one backslash in a path.',
    evidence: ['Lecture Slides'],
    questionIds: ['out-34', 'mcq-15-22', 'mcq-15-20', 'tf-15-14'],
  },
  {
    id: 'pred-42',
    chapter: 9,
    topic: 'is-a versus has-a',
    confidence: 'medium',
    likelyTypes: ['mcq', 'true-false'],
    reason:
      'The Chapter 9 lectures spend several slides on the distinction with the Employee, BirthDate and TelephoneNumber example, though no supplied exam paper tests it directly.',
    evidence: ['Lecture Slides'],
    questionIds: ['mcq-09-06', 'mcq-09-07', 'tf-09-08', 'tf-09-09', 'fb-06'],
  },
  {
    id: 'pred-43',
    chapter: 9,
    topic: 'toString inherited from Object',
    confidence: 'medium',
    likelyTypes: ['mcq', 'output'],
    reason:
      'A lecture note describes the default Object.toString format, and an old multiple-choice item asks what happens when an object is concatenated with a String.',
    evidence: ['Lecture Slides', 'Old Question Collections'],
    questionIds: ['mcq-09-17', 'mcq-09-18', 'tf-09-17', 'out-08'],
  },
  {
    id: 'pred-44',
    chapter: 10,
    topic: 'getClass().getName()',
    confidence: 'medium',
    likelyTypes: ['mcq', 'output'],
    reason:
      'The lectures give this its own slide as part of the polymorphic payroll example, but it does not appear on any supplied exam paper.',
    evidence: ['Lecture Slides'],
    questionIds: ['mcq-10-19', 'out-13'],
  },
  {
    id: 'pred-45',
    chapter: 15,
    topic: 'The three standard streams',
    confidence: 'medium',
    likelyTypes: ['mcq', 'true-false'],
    reason:
      'The Chapter 15 introduction lists System.in, System.out and System.err with a description of each, which makes it easy multiple-choice material.',
    evidence: ['Lecture Slides'],
    questionIds: ['mcq-15-16', 'tf-15-06', 'mcq-15-23', 'tf-15-18'],
  },
];

export const veryHighPredictions = predictions.filter((p) => p.confidence === 'very-high');
export const highPredictions = predictions.filter((p) => p.confidence === 'high');
export const mediumPredictions = predictions.filter((p) => p.confidence === 'medium');

/**
 * The "Most Likely Final Set": the strongest predicted questions, mixed across
 * every question type, sized so it can be worked through in one sitting.
 */
export const mostLikelyQuestionIds: string[] = [
  // True / false straight from the review sheet's own statements
  'tf-09-01',
  'tf-09-02',
  'tf-09-03',
  'tf-10-01',
  'tf-10-02',
  'tf-10-03',
  'tf-11-01',
  'tf-11-02',
  'tf-15-01',
  'tf-15-02',
  // Multiple choice on the rules the review sheet targets
  'mcq-09-01',
  'mcq-09-02',
  'mcq-10-01',
  'mcq-11-01',
  'mcq-11-02',
  'mcq-11-03',
  'mcq-11-04',
  'mcq-11-05',
  'mcq-15-01',
  'mcq-15-02',
  'mcq-15-03',
  // Output tracing in the review sheet's style
  'out-01',
  'out-03',
  'out-11',
  'out-22',
  'out-25',
  'out-31',
  'out-32',
  // Missing keyword and code completion
  'fb-01',
  'fb-16',
  'fb-21',
  'cc-20',
  'cc-23',
  'cc-28',
  // Programming
  'prog-02',
  'prog-11',
  'prog-06',
  'prog-07',
  'prog-14',
];
