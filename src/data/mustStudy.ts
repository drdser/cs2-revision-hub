import type { MustStudyItem } from '../types';

/**
 * Study priorities.
 *
 * Priority A = on the current review sheet and emphasised in the lectures, or
 * repeated across several previous papers. Priority B = strong supporting
 * evidence but not on the current review sheet. Priority C = covered in the
 * lectures and worth a look if time allows.
 */
export const mustStudyItems: MustStudyItem[] = [
  // ------------------------------------------------------------- Priority A
  {
    id: 'ms-01',
    chapter: 9,
    concept: 'The super keyword',
    priority: 'A',
    whyItMatters:
      'It does two different jobs: super(...) calls a superclass constructor and must come first in the subclass constructor, while super.method() reaches the superclass version of an overridden method. Both jobs appear on the current review sheet.',
    likelyStyles: ['mcq', 'output', 'code-completion', 'programming'],
  },
  {
    id: 'ms-02',
    chapter: 9,
    concept: 'private, protected and public in a hierarchy',
    priority: 'A',
    whyItMatters:
      'Three separate statements on the current review sheet hinge on who can see what. A subclass cannot touch a private superclass field by name, but protected and public members are directly usable.',
    likelyStyles: ['true-false', 'mcq', 'output'],
  },
  {
    id: 'ms-03',
    chapter: 9,
    concept: 'Reference assignment between superclass and subclass',
    priority: 'A',
    whyItMatters:
      'Subclass reference into a superclass variable is legal. The reverse is a compilation error, and that exact statement is a multiple-choice item on the current review sheet.',
    likelyStyles: ['mcq', 'true-false', 'output'],
  },
  {
    id: 'ms-04',
    chapter: 10,
    concept: 'Abstract classes cannot be instantiated',
    priority: 'A',
    whyItMatters:
      'The current review sheet asks this three times over: once as "is it possible", once as "is it a compilation error", and once as a fill-in-the-keyword whose answer is "compilation".',
    likelyStyles: ['true-false', 'mcq', 'fill-blank', 'output'],
  },
  {
    id: 'ms-05',
    chapter: 10,
    concept: 'Interface rules',
    priority: 'A',
    whyItMatters:
      'Methods are implicitly public and abstract, fields are implicitly public static final, a class may implement any number of interfaces, and a class that skips a method must be abstract. The review sheet packs several of these into one "choose the wrong statement" question.',
    likelyStyles: ['mcq', 'true-false', 'output', 'programming'],
  },
  {
    id: 'ms-06',
    chapter: 11,
    concept: 'try, catch and finally structure',
    priority: 'A',
    whyItMatters:
      'The current review sheet asks whether a try block can be followed by a finally block alone. Knowing the three valid shapes, and that finally runs even after return, covers a whole family of questions.',
    likelyStyles: ['true-false', 'mcq', 'output', 'code-completion'],
  },
  {
    id: 'ms-07',
    chapter: 11,
    concept: 'Multi-catch and the | separator',
    priority: 'A',
    whyItMatters:
      'A direct multiple-choice item on the current review sheet. The trap is the comma, which is what a throws clause uses instead.',
    likelyStyles: ['mcq', 'fill-blank', 'code-completion'],
  },
  {
    id: 'ms-08',
    chapter: 11,
    concept: 'throw versus throws',
    priority: 'A',
    whyItMatters:
      'The review sheet asks where the throws clause appears. Confusing the two keywords costs marks on both the theory questions and every exception programming question.',
    likelyStyles: ['mcq', 'fill-blank', 'code-completion', 'programming'],
  },
  {
    id: 'ms-09',
    chapter: 11,
    concept: 'The assert statement',
    priority: 'A',
    whyItMatters:
      'The review sheet asks how many versions Java provides AND asks students to write one with a message. Know both forms and the fact that assertions are disabled unless -ea is passed.',
    likelyStyles: ['mcq', 'code-completion', 'programming'],
  },
  {
    id: 'ms-10',
    chapter: 11,
    concept: 'try-with-resources and AutoCloseable',
    priority: 'A',
    whyItMatters:
      'Two items on the current review sheet target it, including the trap that it arrived in Java SE 7 rather than SE 6.',
    likelyStyles: ['mcq', 'true-false', 'code-completion', 'output'],
  },
  {
    id: 'ms-11',
    chapter: 11,
    concept: 'Preconditions and postconditions',
    priority: 'A',
    whyItMatters:
      'The review sheet asks how they are specified informally, and the answer is a comment BEFORE the method declaration, not inside the body.',
    likelyStyles: ['mcq', 'true-false', 'programming'],
  },
  {
    id: 'ms-12',
    chapter: 15,
    concept: 'read() returns -1, readLine() returns null',
    priority: 'A',
    whyItMatters:
      'The -1 question is the single most repeated item across every previous paper in the source set, and every file loop you write depends on picking the right sentinel.',
    likelyStyles: ['mcq', 'fill-blank', 'code-completion', 'programming'],
  },
  {
    id: 'ms-13',
    chapter: 15,
    concept: 'BufferedReader, BufferedWriter and PrintWriter',
    priority: 'A',
    whyItMatters:
      'PrintWriter is on the review sheet as the class that writes formatted output. Also memorise the wrapping: BufferedReader takes a FileReader, BufferedWriter takes a FileWriter.',
    likelyStyles: ['mcq', 'code-completion', 'output', 'programming'],
  },
  {
    id: 'ms-14',
    chapter: 15,
    concept: 'File.mkdir() and File.list()',
    priority: 'A',
    whyItMatters:
      'mkdir is a multiple-choice item on the review sheet, with makeDir and makeDirectory as the distractors. Its companion list() is worth learning at the same time.',
    likelyStyles: ['mcq', 'fill-blank', 'code-completion', 'programming'],
  },
  {
    id: 'ms-15',
    chapter: 15,
    concept: 'Byte streams, character streams and UTF-8',
    priority: 'A',
    whyItMatters:
      'Two true/false items on the review sheet cover 16-bit Unicode and the expansion of UTF. Byte streams handle 8-bit bytes; character streams handle 16-bit Unicode.',
    likelyStyles: ['true-false', 'mcq', 'fill-blank'],
  },
  {
    id: 'ms-16',
    chapter: 15,
    concept: 'Counting characters while reading a file',
    priority: 'A',
    whyItMatters:
      'The last question on the review sheet is exactly this: complete a BufferedReader loop that counts uppercase and lowercase characters and prints both totals.',
    likelyStyles: ['code-completion', 'programming', 'output'],
  },

  // ------------------------------------------------------------- Priority B
  {
    id: 'ms-17',
    chapter: 10,
    concept: 'Dynamic binding',
    priority: 'B',
    whyItMatters:
      'It is the mechanism behind nearly every inheritance output question. When a superclass variable holds a subclass object, the subclass override runs.',
    likelyStyles: ['output', 'mcq', 'true-false'],
  },
  {
    id: 'ms-18',
    chapter: 10,
    concept: 'instanceof and downcasting',
    priority: 'B',
    whyItMatters:
      'A superclass reference can only call superclass methods. Reaching a subclass-only member needs a cast, and the cast should be guarded with instanceof.',
    likelyStyles: ['mcq', 'code-completion', 'output'],
  },
  {
    id: 'ms-19',
    chapter: 9,
    concept: 'Constructor chaining order',
    priority: 'B',
    whyItMatters:
      'Superclass constructor bodies finish before subclass constructor bodies, which decides the printing order in a very common style of output question.',
    likelyStyles: ['output', 'mcq', 'code-completion'],
  },
  {
    id: 'ms-20',
    chapter: 11,
    concept: 'Writing a custom exception class',
    priority: 'B',
    whyItMatters:
      'The lectures give a full worked example. Extend Exception, take a String in the constructor, and pass it up with super(s).',
    likelyStyles: ['programming', 'code-completion', 'mcq'],
  },
  {
    id: 'ms-21',
    chapter: 15,
    concept: 'Writing to a file and reading it back',
    priority: 'B',
    whyItMatters:
      'A five-part programming question of exactly this shape appears on the previous final exam and again in the old question sets.',
    likelyStyles: ['programming'],
  },
  {
    id: 'ms-22',
    chapter: 10,
    concept: 'Writing an interface and implementing it',
    priority: 'B',
    whyItMatters:
      'Two programming questions on the previous final exam ask for this, including one that stores unrelated classes in an ArrayList and calls a shared method polymorphically.',
    likelyStyles: ['programming', 'output', 'code-completion'],
  },
  {
    id: 'ms-23',
    chapter: 9,
    concept: 'Creating a subclass from a given superclass',
    priority: 'B',
    whyItMatters:
      'A recurring programming task: add a private field, add a set method, and write a constructor that calls super(...).',
    likelyStyles: ['programming', 'code-completion'],
  },
  {
    id: 'ms-24',
    chapter: 10,
    concept: 'final methods and final classes',
    priority: 'B',
    whyItMatters:
      'A final method cannot be overridden, a final class cannot be extended, and private and static methods are implicitly final. These are the cases where binding is static, not dynamic.',
    likelyStyles: ['mcq', 'true-false'],
  },
  {
    id: 'ms-25',
    chapter: 15,
    concept: 'Exception types in file code',
    priority: 'B',
    whyItMatters:
      'FileNotFoundException is a subclass of IOException, which is why catching IOException is the standard answer when a question asks for the best suited exception.',
    likelyStyles: ['mcq', 'true-false', 'programming'],
  },
  {
    id: 'ms-26',
    chapter: 10,
    concept: 'Abstract versus concrete subclasses',
    priority: 'B',
    whyItMatters:
      'A concrete subclass must implement every inherited abstract method. If it leaves any unimplemented, it must be declared abstract too.',
    likelyStyles: ['mcq', 'true-false', 'programming'],
  },
  {
    id: 'ms-27',
    chapter: 11,
    concept: 'What the finally block does',
    priority: 'B',
    whyItMatters:
      'It runs whether or not an exception was thrown, and even after a return. The only escape is System.exit. Output questions love this.',
    likelyStyles: ['output', 'true-false', 'mcq'],
  },

  // ------------------------------------------------------------- Priority C
  {
    id: 'ms-28',
    chapter: 9,
    concept: 'is-a versus has-a',
    priority: 'C',
    whyItMatters:
      'A definition-level question. Inheritance is is-a, composition is has-a. Easy marks if it appears, but it has not shown up on any supplied exam paper.',
    likelyStyles: ['mcq', 'true-false'],
  },
  {
    id: 'ms-29',
    chapter: 9,
    concept: 'toString inherited from Object',
    priority: 'C',
    whyItMatters:
      'Worth knowing that the default returns the class name, an @ sign and a hexadecimal value, and that concatenating an object with a String calls it implicitly.',
    likelyStyles: ['mcq', 'output'],
  },
  {
    id: 'ms-30',
    chapter: 11,
    concept: 'The stack trace',
    priority: 'C',
    whyItMatters:
      'printStackTrace() prints the call history and getStackTrace() returns a StackTraceElement array. Covered in the lectures but absent from every supplied exam paper.',
    likelyStyles: ['mcq', 'fill-blank'],
  },
  {
    id: 'ms-31',
    chapter: 10,
    concept: 'getClass() and getName()',
    priority: 'C',
    whyItMatters:
      'A one-line idiom for reporting an object\'s real type inside a polymorphic loop.',
    likelyStyles: ['mcq', 'output'],
  },
  {
    id: 'ms-32',
    chapter: 15,
    concept: 'Unicode escapes and absolute paths',
    priority: 'C',
    whyItMatters:
      'A \\u escape takes four hexadecimal digits, and a Windows path needs doubled backslashes because a single one starts an escape sequence.',
    likelyStyles: ['output', 'mcq'],
  },
  {
    id: 'ms-33',
    chapter: 15,
    concept: 'The three standard streams',
    priority: 'C',
    whyItMatters:
      'System.in, System.out and System.err. Straightforward recall if it appears.',
    likelyStyles: ['mcq', 'true-false'],
  },
];

export const priorityA = mustStudyItems.filter((i) => i.priority === 'A');
export const priorityB = mustStudyItems.filter((i) => i.priority === 'B');
export const priorityC = mustStudyItems.filter((i) => i.priority === 'C');
