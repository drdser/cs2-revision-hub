import type { FillBlankQuestion } from '../../types';

/**
 * Section D - Fill in the Blank / Missing Keyword.
 *
 * Modelled on the review sheet's "Fill in the missing keyword in the space
 * provided" item. Answers are compared case-insensitively after trimming, and
 * `acceptedAnswers` lists the reasonable spellings a student might type.
 */
export const fillBlankQuestions: FillBlankQuestion[] = [
  {
    id: 'fb-01',
    chapter: 10,
    topic: 'Abstract classes',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'Attempting to instantiate an object of an abstract class is a __________ error.',
    correctAnswer: 'compilation',
    acceptedAnswers: ['compilation', 'compile', 'compile-time', 'compile time', 'compiler'],
    explanation:
      'The compiler rejects the new expression, so the problem is found before the program runs. It is not a runtime error.',
    sourceType: 'current-review',
  },
  {
    id: 'fb-02',
    chapter: 9,
    topic: 'super keyword',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'A subclass constructor calls one of its superclass constructors using the keyword __________.',
    correctAnswer: 'super',
    acceptedAnswers: ['super', 'super()'],
    explanation:
      'The call is written super(arguments) and must be the first statement in the subclass constructor body.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-03',
    chapter: 9,
    topic: 'extends keyword',
    type: 'fill-blank',
    difficulty: 'easy',
    question:
      'A class states that it inherits from another class by using the keyword __________.',
    correctAnswer: 'extends',
    acceptedAnswers: ['extends'],
    explanation:
      'For example: class Dog extends Animal { ... }. A class may extend exactly one direct superclass.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-04',
    chapter: 9,
    topic: 'Access modifiers',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'To let a subclass access a superclass instance variable directly, the variable must be declared __________ rather than private.',
    correctAnswer: 'protected',
    acceptedAnswers: ['protected'],
    explanation:
      'protected is the intermediate level of access between public and private. The trade-off is that the subclass can then bypass the validation in the set methods.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-05',
    chapter: 9,
    topic: 'Object class',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'The Java class hierarchy begins with class __________, in package java.lang.',
    correctAnswer: 'Object',
    acceptedAnswers: ['object', 'java.lang.object'],
    explanation:
      'Every class directly or indirectly extends Object, which is where inherited methods such as toString and getClass come from.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-06',
    chapter: 9,
    topic: 'is-a vs has-a',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'Inheritance represents the __________ relationship, while composition represents the has-a relationship.',
    correctAnswer: 'is-a',
    acceptedAnswers: ['is-a', 'is a', 'isa'],
    explanation:
      'In an is-a relationship an object of a subclass can also be treated as an object of its superclass.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-07',
    chapter: 10,
    topic: 'implements keyword',
    type: 'fill-blank',
    difficulty: 'easy',
    question:
      'A concrete class states that it provides an interface by using the keyword __________.',
    correctAnswer: 'implements',
    acceptedAnswers: ['implements'],
    explanation:
      'For example: public class Lion implements Predator { ... }. The class must then supply every method the interface declares.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-08',
    chapter: 10,
    topic: 'Abstract classes',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'A class that does not implement every method of the interface it implements must be declared __________.',
    correctAnswer: 'abstract',
    acceptedAnswers: ['abstract'],
    explanation:
      'Implementing an interface is a contract with the compiler: implement every method, or declare the class abstract so a concrete subclass can finish the job.',
    sourceType: 'current-review',
  },
  {
    id: 'fb-09',
    chapter: 10,
    topic: 'Dynamic binding',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'Choosing which version of an overridden method to run based on the type of the object at execution time is called __________ binding.',
    correctAnswer: 'dynamic',
    acceptedAnswers: ['dynamic', 'late', 'dynamic (late)'],
    explanation:
      'Dynamic binding is also called late binding. Calls to final, static and private methods use static binding instead, because they cannot be overridden.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-10',
    chapter: 10,
    topic: 'instanceof',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'The operator __________ determines whether the object referred to by a superclass variable belongs to a particular subclass.',
    correctAnswer: 'instanceof',
    acceptedAnswers: ['instanceof'],
    explanation:
      'It is normally used to guard a downcast, as in: if (e instanceof Hourly) { Hourly h = (Hourly) e; ... }',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-11',
    chapter: 10,
    topic: 'final keyword',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'A method declared __________ in a superclass cannot be overridden in a subclass.',
    correctAnswer: 'final',
    acceptedAnswers: ['final'],
    explanation:
      'A final class similarly cannot be extended, and all of its methods are implicitly final. String is the standard example of a final class.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-12',
    chapter: 10,
    topic: 'Interface fields',
    type: 'fill-blank',
    difficulty: 'hard',
    question:
      'Fields declared in an interface are implicitly public, __________ and final.',
    correctAnswer: 'static',
    acceptedAnswers: ['static'],
    explanation:
      'Because they are static they belong to the interface itself, and because they are final they are constants that cannot be reassigned.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-13',
    chapter: 11,
    topic: 'throw vs throws',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'The keyword __________ appears in a method heading to declare the exception types the method might raise.',
    correctAnswer: 'throws',
    acceptedAnswers: ['throws'],
    explanation:
      'throws goes after the parameter list and before the body. throw, without the s, is the statement that actually raises an exception object.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-14',
    chapter: 11,
    topic: 'throw vs throws',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'The statement __________ new IOException("file missing"); raises an exception object.',
    correctAnswer: 'throw',
    acceptedAnswers: ['throw'],
    explanation:
      'throw raises the exception immediately, and the rest of the method is skipped. throws only declares the possibility in the heading.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-15',
    chapter: 11,
    topic: 'finally block',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'The __________ block executes whether or not an exception is thrown in the corresponding try block, and normally contains resource-release code.',
    correctAnswer: 'finally',
    acceptedAnswers: ['finally'],
    explanation:
      'It also runs when the try block exits early with return or break. Only System.exit skips it.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-16',
    chapter: 11,
    topic: 'Multi-catch',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'In a multi-catch, exception types are separated by the __________ character.',
    correctAnswer: '|',
    acceptedAnswers: ['|', 'vertical bar', 'pipe', 'bar'],
    explanation:
      'The syntax is catch (Type1 | Type2 e). A throws clause, in contrast, separates its exception types with commas.',
    sourceType: 'current-review',
  },
  {
    id: 'fb-17',
    chapter: 11,
    topic: 'Assertions',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'The keyword __________ evaluates a boolean expression and throws an AssertionError if the expression is false.',
    correctAnswer: 'assert',
    acceptedAnswers: ['assert'],
    explanation:
      'Java has two forms: assert expression; and assert expression1 : expression2; where the second expression supplies the error message.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-18',
    chapter: 11,
    topic: 'try-with-resources',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'Each resource used in a try-with-resources statement must be an object of a class that implements the __________ interface.',
    correctAnswer: 'AutoCloseable',
    acceptedAnswers: ['autocloseable'],
    explanation:
      'That interface supplies the close method, which the try-with-resources statement calls implicitly at the end of the try block.',
    sourceType: 'current-review',
  },
  {
    id: 'fb-19',
    chapter: 11,
    topic: 'Custom exceptions',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'A user-defined exception class must extend the class __________ so that it works with the exception-handling mechanism.',
    correctAnswer: 'Exception',
    acceptedAnswers: ['exception'],
    explanation:
      'For example: public class InsufficientAccountBalanceException extends Exception, whose constructor calls super(s) to store the message.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-20',
    chapter: 11,
    topic: 'Stack trace',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'To display all the method invocations that led to an exception, call the method __________ on the exception object.',
    correctAnswer: 'printStackTrace()',
    acceptedAnswers: ['printstacktrace()', 'printstacktrace', 'e.printstacktrace()'],
    explanation:
      'To work with the same information programmatically, use getStackTrace(), which returns a StackTraceElement array.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-21',
    chapter: 15,
    topic: 'EOF handling',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'The read() method returns __________ when the end of the file has been reached.',
    correctAnswer: '-1',
    acceptedAnswers: ['-1', 'minus 1', 'negative 1'],
    explanation:
      'That is why the loop is written while ((ch = reader.read()) != -1). readLine(), in contrast, returns null at the end of the stream.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'fb-22',
    chapter: 15,
    topic: 'EOF handling',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      "BufferedReader's readLine() method returns __________ when there are no more lines to read.",
    correctAnswer: 'null',
    acceptedAnswers: ['null'],
    explanation:
      'Mixing this up with -1 is one of the most common mistakes in file questions. read() uses -1; readLine() uses null.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-23',
    chapter: 15,
    topic: 'Directories',
    type: 'fill-blank',
    difficulty: 'exam',
    question: 'The File class method used to create a directory is called __________.',
    correctAnswer: 'mkdir',
    acceptedAnswers: ['mkdir', 'mkdir()'],
    explanation:
      'It returns true on success and false on failure, for example when the directory already exists.',
    sourceType: 'current-review',
  },
  {
    id: 'fb-24',
    chapter: 15,
    topic: 'Directories',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'The File class method __________ returns a String array naming all the files and directories in a directory.',
    correctAnswer: 'list()',
    acceptedAnswers: ['list()', 'list'],
    explanation:
      'It is normally used as String[] filesordirs = file.list(); followed by an enhanced for loop.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'fb-25',
    chapter: 15,
    topic: 'java.io package',
    type: 'fill-blank',
    difficulty: 'easy',
    question:
      'The package __________ contains nearly every class needed to perform input and output.',
    correctAnswer: 'java.io',
    acceptedAnswers: ['java.io', 'io'],
    explanation:
      'File, FileReader, FileWriter, BufferedReader, BufferedWriter, PrintWriter, FileInputStream and FileOutputStream all live there.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'fb-26',
    chapter: 15,
    topic: 'PrintWriter',
    type: 'fill-blank',
    difficulty: 'exam',
    question:
      'The class __________ prints the formatted representation of objects of different types to a character-output stream.',
    correctAnswer: 'PrintWriter',
    acceptedAnswers: ['printwriter'],
    explanation:
      'It supplies print, println and printf, so values such as int, long, boolean and char arrays can be written straight to a file.',
    sourceType: 'current-review',
  },
  {
    id: 'fb-27',
    chapter: 15,
    topic: 'Unicode and UTF-8',
    type: 'fill-blank',
    difficulty: 'exam',
    question: 'In UTF-8, UTF stands for __________ Transformation Format.',
    correctAnswer: 'Unicode',
    acceptedAnswers: ['unicode'],
    explanation:
      '"Unified" is the classic wrong answer. The 8 means the encoding uses 8-bit blocks to represent a character.',
    sourceType: 'current-review',
  },
  {
    id: 'fb-28',
    chapter: 15,
    topic: 'Character streams',
    type: 'fill-blank',
    difficulty: 'medium',
    question:
      'Byte streams perform input and output of 8-bit bytes, while __________ streams perform input and output of 16-bit Unicode.',
    correctAnswer: 'character',
    acceptedAnswers: ['character', 'char'],
    explanation:
      'BufferedReader and BufferedWriter are the character-stream classes used most often; FileInputStream and FileOutputStream are the byte-stream equivalents.',
    sourceType: 'current-review',
  },
];
