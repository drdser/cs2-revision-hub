import type { TrueFalseQuestion } from '../../types';

/**
 * Section B - True / False.
 *
 * The first block of each chapter mirrors the statement style used on the
 * instructor's review sheet: short, single-fact claims, several of which are
 * deliberately near-misses.
 */
export const trueFalseQuestions: TrueFalseQuestion[] = [
  // ---------------------------------------------------------------- Chapter 9
  {
    id: 'tf-09-01',
    chapter: 9,
    topic: 'Inheritance hierarchy',
    type: 'true-false',
    difficulty: 'exam',
    question: 'A subclass can be a superclass of future subclasses.',
    correctAnswer: true,
    explanation:
      'Hierarchies can be any depth. A class that extends another can itself be extended, which is how indirect superclasses arise.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-09-02',
    chapter: 9,
    topic: 'Access modifiers',
    type: 'true-false',
    difficulty: 'exam',
    question:
      'Only public methods in the superclass can allow the subclass to access the private instance variables in the superclass.',
    correctAnswer: false,
    explanation:
      'Private members can be reached through inherited public OR protected methods. The word "only" is what makes this statement false.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-09-03',
    chapter: 9,
    topic: 'Access modifiers',
    type: 'true-false',
    difficulty: 'exam',
    question:
      'For security purposes, the instance variables in the superclass should be declared as private.',
    correctAnswer: true,
    explanation:
      'Private instance variables force all access through get and set methods, so the validation in those methods cannot be bypassed by a subclass.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-09-04',
    chapter: 9,
    topic: 'Access modifiers',
    type: 'true-false',
    difficulty: 'medium',
    question:
      "A superclass's protected members can be accessed in the superclass and in its subclasses.",
    correctAnswer: true,
    explanation:
      'protected is the intermediate level of access between public and private, and exists precisely so subclasses can use inherited members directly.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-05',
    chapter: 9,
    topic: 'Access modifiers',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'All public and protected superclass members retain their original access modifier when they become members of the subclass.',
    correctAnswer: true,
    explanation:
      'Inheritance does not change the access level of an inherited member. A public superclass method is still public in the subclass.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-06',
    chapter: 9,
    topic: 'Single inheritance',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A Java class may extend more than one direct superclass.',
    correctAnswer: false,
    explanation:
      'Java supports single inheritance only: each class is derived from exactly one direct superclass. Multiple interfaces are the way to combine several types.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-07',
    chapter: 9,
    topic: 'Object class',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'If you do not explicitly specify which class a new class extends, it extends Object implicitly.',
    correctAnswer: true,
    explanation:
      'Every class directly or indirectly extends Object, which is why methods such as toString and getClass are always available.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-08',
    chapter: 9,
    topic: 'is-a vs has-a',
    type: 'true-false',
    difficulty: 'easy',
    question: 'The has-a relationship represents inheritance between a subclass and a superclass.',
    correctAnswer: false,
    explanation:
      'It is the other way around. is-a represents inheritance; has-a represents composition, where an object holds references to other objects as members.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-09',
    chapter: 9,
    topic: 'is-a vs has-a',
    type: 'true-false',
    difficulty: 'medium',
    question: 'In an is-a relationship, an object of a subclass can also be treated as an object of its superclass.',
    correctAnswer: true,
    explanation:
      'This is what allows a subclass object to be stored in a superclass variable and passed to a method that expects the superclass type.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-10',
    chapter: 9,
    topic: 'Constructor chaining',
    type: 'true-false',
    difficulty: 'exam',
    question:
      'A call to a superclass constructor using super(...) may appear anywhere inside the subclass constructor body.',
    correctAnswer: false,
    explanation:
      'It must be the first statement in the constructor body, so that the superclass part of the object is initialised before the subclass part.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-11',
    chapter: 9,
    topic: 'Constructor chaining',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'If a subclass constructor does not call a superclass constructor explicitly, the compiler attempts to insert a call to the superclass no-argument or default constructor.',
    correctAnswer: true,
    explanation:
      'If the superclass has no such constructor, that inserted call cannot be resolved and the compiler reports an error.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-12',
    chapter: 9,
    topic: 'Method overriding',
    type: 'true-false',
    difficulty: 'exam',
    question: 'It is a compilation error to override a method with a more restricted access modifier.',
    correctAnswer: true,
    explanation:
      'A public superclass method cannot become private or protected in the subclass, and a protected method cannot become private. Widening the access is allowed.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-13',
    chapter: 9,
    topic: 'Method signature',
    type: 'true-false',
    difficulty: 'medium',
    question: 'The return type is part of a method signature in Java.',
    correctAnswer: false,
    explanation:
      'A signature is the method name plus the number, type and order of the parameters. Return types are excluded, which is why two methods cannot differ by return type alone.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-14',
    chapter: 9,
    topic: 'Reference assignment',
    type: 'true-false',
    difficulty: 'exam',
    question: 'Assigning a subclass reference to a superclass variable is safe and compiles.',
    correctAnswer: true,
    explanation:
      'A subclass object is an object of its superclass, so this direction is always allowed. The superclass variable can then be used only to call superclass members.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-15',
    chapter: 9,
    topic: 'Inheritance benefits',
    type: 'true-false',
    difficulty: 'easy',
    question:
      'The main advantage of inheritance is that code already present in the superclass need not be rewritten in the subclass.',
    correctAnswer: true,
    explanation:
      'Inheritance is a form of software reuse. It also concentrates the shared logic in one place, so a change is made once rather than in every copy.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-16',
    chapter: 9,
    topic: 'protected instance variables',
    type: 'true-false',
    difficulty: 'hard',
    question:
      'Declaring superclass instance variables protected lets a subclass object assign an invalid value to an inherited variable.',
    correctAnswer: true,
    explanation:
      'Direct access bypasses the set methods and their validation. This is the trade-off for the convenience of protected access.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-17',
    chapter: 9,
    topic: 'toString',
    type: 'true-false',
    difficulty: 'medium',
    question: 'toString is inherited by every class, directly or indirectly, from class Object.',
    correctAnswer: true,
    explanation:
      'It is called implicitly whenever an object must be converted to a String, for example during string concatenation or in a println call.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-18',
    chapter: 9,
    topic: 'Method overriding',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'A subclass can access the superclass version of an overridden method by writing super followed by a dot and the method name.',
    correctAnswer: true,
    explanation:
      'For example super.toString() or super.earnings(). Without super, the call resolves to the overriding version and would recurse.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-19',
    chapter: 9,
    topic: 'Inheritance hierarchy',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'The set of objects represented by a superclass is typically larger than the set represented by any one of its subclasses.',
    correctAnswer: true,
    explanation:
      'Superclasses are more general and subclasses more specific. Every subclass object is also a superclass object, but not the reverse.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-09-20',
    chapter: 9,
    topic: 'Access modifiers',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A superclass private instance variable can be used directly by name inside a subclass method.',
    correctAnswer: false,
    explanation:
      'Private members are hidden from subclasses. Attempting to use one by name in a subclass is a compilation error; an inherited get method must be used instead.',
    sourceType: 'generated-from-course-material',
  },

  // --------------------------------------------------------------- Chapter 10
  {
    id: 'tf-10-01',
    chapter: 10,
    topic: 'Abstract classes',
    type: 'true-false',
    difficulty: 'exam',
    question: 'It is possible to instantiate an object from an abstract class.',
    correctAnswer: false,
    explanation:
      'Abstract classes are incomplete and exist only to be extended. They can still be used to declare variables that refer to concrete subclass objects.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-10-02',
    chapter: 10,
    topic: 'Abstract classes',
    type: 'true-false',
    difficulty: 'exam',
    question: 'Attempting to instantiate objects of an abstract class is a compilation error.',
    correctAnswer: true,
    explanation:
      'The compiler rejects the new expression, so the problem is caught before the program runs rather than at execution time.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-10-03',
    chapter: 10,
    topic: 'Interfaces',
    type: 'true-false',
    difficulty: 'exam',
    question:
      'A class that does not implement every method in the interface it implements must be declared as abstract.',
    correctAnswer: true,
    explanation:
      'Implementing an interface is a contract: implement every method, or declare the class abstract and leave the remaining methods to a concrete subclass.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-10-04',
    chapter: 10,
    topic: 'Abstract classes',
    type: 'true-false',
    difficulty: 'medium',
    question: 'An abstract class can be used to declare variables.',
    correctAnswer: true,
    explanation:
      'Those variables hold references to objects of any concrete subclass, which is exactly how subclass objects are manipulated polymorphically.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-05',
    chapter: 10,
    topic: 'Abstract methods',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A class that contains an abstract method may still be a concrete class if it also has concrete methods.',
    correctAnswer: false,
    explanation:
      'Any class containing an abstract method must itself be declared abstract, no matter how many concrete methods it has.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-06',
    chapter: 10,
    topic: 'Abstract methods',
    type: 'true-false',
    difficulty: 'medium',
    question: 'Constructors and static methods can be declared abstract.',
    correctAnswer: false,
    explanation:
      'Neither can be overridden by a subclass in the way an abstract method requires, so declaring either abstract is not allowed.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-07',
    chapter: 10,
    topic: 'Dynamic binding',
    type: 'true-false',
    difficulty: 'exam',
    question:
      'When a superclass variable holds a reference to a subclass object and calls an overridden method, the superclass version runs.',
    correctAnswer: false,
    explanation:
      'The subclass version runs. Dynamic binding uses the type of the object the variable actually refers to, not the declared type of the variable.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-08',
    chapter: 10,
    topic: 'Dynamic binding',
    type: 'true-false',
    difficulty: 'medium',
    question: 'Dynamic binding is also known as late binding.',
    correctAnswer: true,
    explanation:
      'Both names describe the same idea: the method to call is decided at execution time rather than at compile time.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-09',
    chapter: 10,
    topic: 'Polymorphism',
    type: 'true-false',
    difficulty: 'exam',
    question: 'A superclass object can be treated as a subclass object.',
    correctAnswer: false,
    explanation:
      'A superclass object is not an object of any of its subclasses, so it lacks the subclass members. Only the subclass-to-superclass direction is safe.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-10',
    chapter: 10,
    topic: 'Polymorphism',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'A method that takes a superclass object as an argument can also accept an object of any direct or indirect subclass.',
    correctAnswer: true,
    explanation:
      'This follows from the is-a relationship, and is what makes it possible to write one method that processes a whole hierarchy.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-11',
    chapter: 10,
    topic: 'Interface fields',
    type: 'true-false',
    difficulty: 'exam',
    question: 'A class that implements an interface can assign a new value to a field declared in that interface.',
    correctAnswer: false,
    explanation:
      'Interface fields are implicitly public, static and final, so they are constants. Assigning to one is a compilation error.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-12',
    chapter: 10,
    topic: 'Interface methods',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'The methods declared in the interfaces covered in this course must be written with the public and abstract keywords.',
    correctAnswer: false,
    explanation:
      'They are implicitly public and abstract, so writing the keywords is unnecessary. The implementing class, however, must declare the method public.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-13',
    chapter: 10,
    topic: 'Interfaces',
    type: 'true-false',
    difficulty: 'medium',
    question: 'An interface may specify implementation details such as instance variables and concrete method bodies.',
    correctAnswer: false,
    explanation:
      'An interface declaration contains only constants and abstract methods. Implementation details belong in an abstract or concrete class.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-14',
    chapter: 10,
    topic: 'Interfaces',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A class can implement any number of interfaces.',
    correctAnswer: true,
    explanation:
      'Java forbids multiple class inheritance but places no limit on interfaces. The names are listed comma-separated after implements.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-15',
    chapter: 10,
    topic: 'Interfaces',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A public interface must be declared in a file with the same name as the interface and a .java extension.',
    correctAnswer: true,
    explanation:
      'The same file-naming rule that applies to public classes applies to public interfaces.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-16',
    chapter: 10,
    topic: 'Interfaces as types',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'An interface can be used as a type, so a variable of an interface type can store a reference to any object of a class that implements it.',
    correctAnswer: true,
    explanation:
      'For example a Payable variable can refer to an Invoice or to a SalariedEmployee, which allows both to be processed in the same loop.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-17',
    chapter: 10,
    topic: 'final methods',
    type: 'true-false',
    difficulty: 'medium',
    question: 'Methods declared private or static are implicitly final.',
    correctAnswer: true,
    explanation:
      'Neither kind can be overridden by a subclass, so their calls are resolved at compile time using static binding.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-18',
    chapter: 10,
    topic: 'final classes',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A final class cannot be extended, and all of its methods are implicitly final.',
    correctAnswer: true,
    explanation:
      'String is the standard example. Because it cannot be subclassed, programs can rely on the behaviour documented in the Java API.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-19',
    chapter: 10,
    topic: 'Downcasting',
    type: 'true-false',
    difficulty: 'hard',
    question:
      'A superclass reference can be used to invoke methods that are declared only in the subclass, without any cast.',
    correctAnswer: false,
    explanation:
      'The compiler checks calls against the declared type of the variable. Reaching a subclass-only member requires a downcast, normally guarded by instanceof.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-20',
    chapter: 10,
    topic: 'Interfaces vs abstract classes',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'An abstract class is the better choice when related classes need to share instance variables and concrete method declarations.',
    correctAnswer: true,
    explanation:
      'Interfaces suit unrelated classes that only need a common set of method signatures. Abstract classes suit related classes that share implementation.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-10-21',
    chapter: 10,
    topic: 'Method overloading',
    type: 'true-false',
    difficulty: 'medium',
    question: 'Method overloading is resolved at execution time using dynamic binding.',
    correctAnswer: false,
    explanation:
      'Overloading is decided by the compiler from the argument types, so it is static binding. Overriding is what uses dynamic binding.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'tf-10-22',
    chapter: 10,
    topic: 'Interfaces',
    type: 'true-false',
    difficulty: 'easy',
    question: 'A Java interface is a class.',
    correctAnswer: false,
    explanation:
      'An interface is a separate kind of reference type. It is declared with the interface keyword and cannot be instantiated.',
    sourceType: 'historical-pattern',
  },

  // --------------------------------------------------------------- Chapter 11
  {
    id: 'tf-11-01',
    chapter: 11,
    topic: 'try block structure',
    type: 'true-false',
    difficulty: 'exam',
    question: 'It is possible for a try block to be followed by a finally block only.',
    correctAnswer: true,
    explanation:
      'The three valid shapes are try/catch, try/finally, and try/catch/finally. At least one catch block and/or a finally block must follow the try.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-11-02',
    chapter: 11,
    topic: 'try-with-resources',
    type: 'true-false',
    difficulty: 'exam',
    question: 'The try-with-resources statement was introduced in Java SE 6.',
    correctAnswer: false,
    explanation:
      'It was introduced in Java SE 7, in the same release as the multi-catch feature.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-11-03',
    chapter: 11,
    topic: 'Exception basics',
    type: 'true-false',
    difficulty: 'easy',
    question: 'An exception indicates a problem that occurs while a program executes.',
    correctAnswer: true,
    explanation:
      'The name suggests the problem occurs infrequently. Without exception handling, the program terminates as soon as it happens.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'tf-11-04',
    chapter: 11,
    topic: 'try and catch',
    type: 'true-false',
    difficulty: 'exam',
    question:
      'The catch block contains the code that might throw an exception, and the try block contains the code that handles it.',
    correctAnswer: false,
    explanation:
      'The roles are reversed. The try block holds the code that might throw; each catch block handles a particular exception type.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'tf-11-05',
    chapter: 11,
    topic: 'Multi-catch',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'The multi-catch feature lets several exception types with identical handling code share a single catch block.',
    correctAnswer: true,
    explanation:
      'The syntax is catch (ArithmeticException | InputMismatchException ex). It was introduced in Java SE 7.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-06',
    chapter: 11,
    topic: 'finally block',
    type: 'true-false',
    difficulty: 'exam',
    question: 'The finally block executes only when an exception is thrown in the corresponding try block.',
    correctAnswer: false,
    explanation:
      'finally executes whether or not an exception is thrown. That guarantee is what makes it the right place for resource-release code.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-07',
    chapter: 11,
    topic: 'finally block',
    type: 'true-false',
    difficulty: 'hard',
    question: 'The finally block still executes if the try block exits early using a return statement.',
    correctAnswer: true,
    explanation:
      'return and break do not skip finally. The only case in this course where finally is skipped is a call to System.exit.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-08',
    chapter: 11,
    topic: 'finally block',
    type: 'true-false',
    difficulty: 'hard',
    question: 'If a catch block throws an exception, the finally block does not execute.',
    correctAnswer: false,
    explanation:
      'The finally block still executes. It also runs when an exception in the try block matches no catch handler at all.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-09',
    chapter: 11,
    topic: 'Exception scope',
    type: 'true-false',
    difficulty: 'medium',
    question: 'Local variables declared in a try block are accessible in the corresponding catch blocks.',
    correctAnswer: false,
    explanation:
      'When a try block terminates, its local variables go out of scope. Anything the catch block needs must be declared before the try block.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-10',
    chapter: 11,
    topic: 'Termination model',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'After an exception is handled, control resumes at the statement inside the try block that caused it.',
    correctAnswer: false,
    explanation:
      'Java uses the termination model: control resumes after the last catch block, not at the point of the exception.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-11',
    chapter: 11,
    topic: 'Termination model',
    type: 'true-false',
    difficulty: 'medium',
    question: 'If no exception is thrown in a try block, the catch blocks are skipped.',
    correctAnswer: true,
    explanation:
      'Control continues with the first statement after the catch blocks, or with the finally block if there is one.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-12',
    chapter: 11,
    topic: 'throws clause',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'A throws clause may list more than one exception type, separated by commas.',
    correctAnswer: true,
    explanation:
      'For example: public void process() throws IOException, FileNotFoundException. Note this is a comma, unlike multi-catch which uses a vertical bar.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-13',
    chapter: 11,
    topic: 'throws clause',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'A throws clause informs the callers of a method what kind of exception parameter to specify in their catch block.',
    correctAnswer: true,
    explanation:
      'That is its purpose: it documents in the method heading which problems the caller may need to handle.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-14',
    chapter: 11,
    topic: 'Exception scope',
    type: 'true-false',
    difficulty: 'medium',
    question: 'When a method throws an exception, it still returns its declared value to the caller.',
    correctAnswer: false,
    explanation:
      'The method terminates without returning a value, and its local variables go out of scope.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-15',
    chapter: 11,
    topic: 'Custom exceptions',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'A user-defined exception class must extend Exception so that it works with the exception-handling mechanism.',
    correctAnswer: true,
    explanation:
      'For example: public class InsufficientAccountBalanceException extends Exception, with a constructor that calls super(s) to set the message.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-16',
    chapter: 11,
    topic: 'Stack trace',
    type: 'true-false',
    difficulty: 'medium',
    question: 'printStackTrace() displays the method invocations that led to the exception.',
    correctAnswer: true,
    explanation:
      'The trace runs from the start of the program to the point where the exception was generated, which is what makes it useful for debugging.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-17',
    chapter: 11,
    topic: 'Assertions',
    type: 'true-false',
    difficulty: 'exam',
    question: 'Assertions are enabled by default when a Java program runs.',
    correctAnswer: false,
    explanation:
      'They are disabled by default because they cost performance and are unnecessary for the end user. Enable them with the -ea command line option.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-18',
    chapter: 11,
    topic: 'Assertions',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A failed assert statement throws an AssertionError.',
    correctAnswer: true,
    explanation:
      'AssertionError is a subclass of Error. With the two-expression form, the second expression becomes the error message.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-19',
    chapter: 11,
    topic: 'Assertions',
    type: 'true-false',
    difficulty: 'medium',
    question: 'Preconditions and postconditions are two types of assertions.',
    correctAnswer: true,
    explanation:
      'An assertion is a boolean expression that should be true at a given point in a program unless there is a bug. Preconditions and postconditions state such conditions around a method.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-20',
    chapter: 11,
    topic: 'Preconditions and postconditions',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A postcondition is a statement that must be true after a method successfully returns.',
    correctAnswer: true,
    explanation:
      'It describes constraints on the return value and any other side effects. A precondition, in contrast, must hold when the method is invoked.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-21',
    chapter: 11,
    topic: 'try-with-resources',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'A try-with-resources statement releases its resources automatically, so no finally block is required for that purpose.',
    correctAnswer: true,
    explanation:
      "The statement implicitly calls each resource's close method at the end of the try block. Each resource must implement AutoCloseable.",
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-22',
    chapter: 11,
    topic: 'Exception scope',
    type: 'true-false',
    difficulty: 'hard',
    question: 'Exception handling is designed to process asynchronous events such as mouse clicks and keystrokes.',
    correctAnswer: false,
    explanation:
      'It handles synchronous errors, which occur while a statement executes: division by zero, out-of-range array indices, invalid method arguments and similar problems.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-23',
    chapter: 11,
    topic: 'Exception handling benefits',
    type: 'true-false',
    difficulty: 'easy',
    question:
      'With exception handling, a program can continue executing after dealing with a problem instead of terminating.',
    correctAnswer: true,
    explanation:
      'This is what is meant by a fault-tolerant program: it deals with problems as they arise and keeps running.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-11-24',
    chapter: 11,
    topic: 'throw vs throws',
    type: 'true-false',
    difficulty: 'exam',
    question: 'throw and throws are interchangeable and can be used in the same position.',
    correctAnswer: false,
    explanation:
      'throw raises an exception object inside the body. throws appears in the method heading and declares which exceptions the method might raise.',
    sourceType: 'generated-from-course-material',
  },

  // --------------------------------------------------------------- Chapter 15
  {
    id: 'tf-15-01',
    chapter: 15,
    topic: 'Character streams',
    type: 'true-false',
    difficulty: 'exam',
    question: 'Character streams are used to perform input and output for 16-bit Unicode.',
    correctAnswer: true,
    explanation:
      'Byte streams handle 8-bit bytes; character streams handle 16-bit Unicode. BufferedReader and BufferedWriter are the character-stream classes used most often.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-15-02',
    chapter: 15,
    topic: 'Unicode and UTF-8',
    type: 'true-false',
    difficulty: 'exam',
    question: 'In UTF-8, UTF stands for Unified Transformation Format.',
    correctAnswer: false,
    explanation:
      'UTF stands for Unicode Transformation Format. The 8 means the encoding uses 8-bit blocks to represent a character.',
    sourceType: 'current-review',
  },
  {
    id: 'tf-15-03',
    chapter: 15,
    topic: 'EOF handling',
    type: 'true-false',
    difficulty: 'exam',
    question: 'The read() method returns 0 when the end of the file is reached.',
    correctAnswer: false,
    explanation:
      'It returns -1. A return value of 0 would be indistinguishable from the byte value zero, which is why the sentinel is negative.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-04',
    chapter: 15,
    topic: 'EOF handling',
    type: 'true-false',
    difficulty: 'exam',
    question: "BufferedReader's readLine() method returns null when there are no more lines to read.",
    correctAnswer: true,
    explanation:
      'This is why read loops differ: while ((ch = br.read()) != -1) for characters, but while ((line = br.readLine()) != null) for lines.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-05',
    chapter: 15,
    topic: 'java.io package',
    type: 'true-false',
    difficulty: 'easy',
    question: 'The java.io package contains nearly every class needed to perform input and output.',
    correctAnswer: true,
    explanation:
      'File, FileReader, FileWriter, BufferedReader, BufferedWriter, PrintWriter, FileInputStream and FileOutputStream all live there.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-06',
    chapter: 15,
    topic: 'Standard streams',
    type: 'true-false',
    difficulty: 'medium',
    question: 'System.in, System.out and System.err are the three standard streams provided by Java.',
    correctAnswer: true,
    explanation:
      'System.in is normally the keyboard, System.out the screen for normal output, and System.err the screen for error output.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-07',
    chapter: 15,
    topic: 'Byte streams',
    type: 'true-false',
    difficulty: 'medium',
    question: 'FileInputStream and FileOutputStream are the byte-stream classes used most frequently.',
    correctAnswer: true,
    explanation:
      'The standard file-copy example opens a FileInputStream and a FileOutputStream and copies bytes until read() returns -1.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-08',
    chapter: 15,
    topic: 'BufferedReader',
    type: 'true-false',
    difficulty: 'medium',
    question: 'A BufferedReader object that reads a file requires a FileReader object.',
    correctAnswer: true,
    explanation:
      'The usual construction is new BufferedReader(new FileReader("f1.txt")). BufferedWriter similarly wraps a FileWriter.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-09',
    chapter: 15,
    topic: 'BufferedWriter',
    type: 'true-false',
    difficulty: 'medium',
    question: 'BufferedWriter performs the reverse operation of BufferedReader: it writes to a file rather than reads from one.',
    correctAnswer: true,
    explanation:
      'It provides a write method and buffers the output, which is more efficient than writing one character at a time.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-10',
    chapter: 15,
    topic: 'PrintWriter',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'PrintWriter can write primitive types such as int and long, as well as arrays, to a character-output stream.',
    correctAnswer: true,
    explanation:
      'It supplies print, println and printf, so the formatting facilities familiar from System.out are available for files.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-11',
    chapter: 15,
    topic: 'Directories',
    type: 'true-false',
    difficulty: 'medium',
    question: 'The mkdir() method returns false if the directory already exists.',
    correctAnswer: true,
    explanation:
      'It returns true only when the directory is actually created. Failure can also mean the entire path leading to it does not exist.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-12',
    chapter: 15,
    topic: 'Directories',
    type: 'true-false',
    difficulty: 'medium',
    question: 'The list() method of class File returns the names of the files and directories in a directory.',
    correctAnswer: true,
    explanation:
      'It returns a String array, which is normally traversed with an enhanced for loop.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-13',
    chapter: 15,
    topic: 'Absolute paths',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'If a file is located in the project folder, its absolute path must still be specified in the constructor.',
    correctAnswer: false,
    explanation:
      'Files in the project folder can be named directly, for example new FileReader("input.txt"). The absolute path is needed only when the file is elsewhere.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-14',
    chapter: 15,
    topic: 'Absolute paths',
    type: 'true-false',
    difficulty: 'medium',
    question: 'In a Java String literal, writing \\\\ produces a single backslash character.',
    correctAnswer: true,
    explanation:
      'A single backslash begins an escape sequence, so a Windows path is written "C:\\\\Users\\\\input.txt".',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-15',
    chapter: 15,
    topic: 'File exceptions',
    type: 'true-false',
    difficulty: 'medium',
    question: 'FileNotFoundException is a subclass of IOException.',
    correctAnswer: true,
    explanation:
      'That is why a catch block written for IOException also handles a missing file, and why catching IOException is the usual choice in file code.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-16',
    chapter: 15,
    topic: 'File I/O patterns',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'Resource-release code such as close() should be placed in a finally block so it runs whether or not an exception occurred.',
    correctAnswer: true,
    explanation:
      'The alternative is a try-with-resources statement, which closes each resource automatically and removes the need for that finally block.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-17',
    chapter: 15,
    topic: 'Appending to files',
    type: 'true-false',
    difficulty: 'hard',
    question:
      'new FileWriter("output.txt") appends to the file if it already exists.',
    correctAnswer: false,
    explanation:
      'The one-argument constructor replaces the existing contents. Appending requires the two-argument form: new FileWriter("output.txt", true).',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-18',
    chapter: 15,
    topic: 'Streams',
    type: 'true-false',
    difficulty: 'easy',
    question: 'A stream can be defined as a sequence of data.',
    correctAnswer: true,
    explanation:
      'Input and output sources are represented as streams, so files, the keyboard and the screen are all read and written the same way.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-19',
    chapter: 15,
    topic: 'Unicode and UTF-8',
    type: 'true-false',
    difficulty: 'medium',
    question:
      'Unicode is a 16-bit character set designed to cover the major living and dead languages, as well as scientific symbols.',
    correctAnswer: true,
    explanation:
      'Java character streams read and write this 16-bit character set, which is why they are described as handling 16-bit Unicode.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'tf-15-20',
    chapter: 15,
    topic: 'Stream methods',
    type: 'true-false',
    difficulty: 'medium',
    question: 'flush() and close() do the same thing to a stream.',
    correctAnswer: false,
    explanation:
      'flush() pushes buffered data out but leaves the stream open. close() releases the stream, and typically flushes it as part of closing.',
    sourceType: 'generated-from-course-material',
  },
];
