import type { CheatSheetSection } from '../types';

/** A condensed study sheet, sized for a 10-15 minute final pass. */
export const cheatSheet: CheatSheetSection[] = [
  {
    id: 'cs-09-syntax',
    title: 'Chapter 9 - Inheritance syntax',
    chapter: 9,
    items: [
      {
        label: 'Declare a subclass',
        detail: 'One direct superclass only. Java supports single inheritance.',
        code: `class Dog extends Animal { }`,
      },
      {
        label: 'Call a superclass constructor',
        detail: 'Must be the FIRST statement in the subclass constructor body.',
        code: `public Dog(String name, String breed) {
    super(name);
    this.breed = breed;
}`,
      },
      {
        label: 'Call the superclass version of an overridden method',
        detail: 'Without super, the call would resolve to the override and recurse.',
        code: `@Override
public String toString() {
    return "piece worker: " + super.toString();
}`,
      },
      {
        label: 'Access levels',
        detail:
          'public: everywhere. protected: superclass + subclasses. private: superclass only.',
        code: `public    int a;   // everywhere
protected int b;   // this class and its subclasses
private   int c;   // this class only`,
      },
    ],
  },
  {
    id: 'cs-09-rules',
    title: 'Chapter 9 - Rules worth memorising',
    chapter: 9,
    items: [
      {
        label: 'Signature',
        detail:
          'Name + number, type and order of parameters. The return type is NOT part of it.',
      },
      {
        label: 'Overriding access',
        detail:
          'It is a compilation error to override a method with a more restricted access modifier.',
      },
      {
        label: 'Reference assignment',
        detail:
          'Subclass reference into a superclass variable: legal. Superclass reference into a subclass variable: compilation error.',
      },
      {
        label: 'Constructor order',
        detail:
          'Superclass constructor bodies finish first, so their output appears before the subclass output.',
      },
      {
        label: 'Implicit superclass',
        detail:
          'A class with no extends clause extends Object, which supplies toString, getClass and equals.',
      },
      {
        label: 'is-a vs has-a',
        detail: 'Inheritance is is-a. Composition is has-a.',
      },
    ],
  },
  {
    id: 'cs-10-abstract',
    title: 'Chapter 10 - Abstract classes',
    chapter: 10,
    items: [
      {
        label: 'Declare an abstract class and method',
        detail:
          'An abstract method has no body. Any class containing one must be abstract.',
        code: `public abstract class Shape {
    public abstract double area();      // no body

    public void print() {               // concrete methods allowed
        System.out.println(area());
    }
}`,
      },
      {
        label: 'Cannot instantiate',
        detail:
          'new Shape() is a COMPILATION error. Shape s = new Circle(3); is fine.',
      },
      {
        label: 'Concrete subclass',
        detail:
          'Must implement every inherited abstract method, or be declared abstract itself.',
      },
      {
        label: 'Cannot be abstract',
        detail: 'Constructors and static methods.',
      },
    ],
  },
  {
    id: 'cs-10-interface',
    title: 'Chapter 10 - Interfaces',
    chapter: 10,
    items: [
      {
        label: 'Declare and implement',
        detail:
          'Methods are implicitly public abstract. The implementing class MUST write public.',
        code: `public interface Payable {
    double getPaymentAmount();
}

public class Invoice implements Payable {
    @Override
    public double getPaymentAmount() { return 100.0; }
}`,
      },
      {
        label: 'Interface fields',
        detail:
          'Implicitly public static final. They are constants; assigning to one does not compile.',
        code: `interface Discount { double RATE = 0.10; }`,
      },
      {
        label: 'Multiple interfaces',
        detail: 'One superclass, any number of interfaces, comma-separated.',
        code: `class Robot extends Machine implements Movable, Stoppable { }`,
      },
      {
        label: 'Incomplete implementation',
        detail:
          'A class that does not implement every interface method must be declared abstract.',
      },
      {
        label: 'Interface or abstract class?',
        detail:
          'Interface: unrelated classes need common methods. Abstract class: related classes share instance variables and concrete methods.',
      },
    ],
  },
  {
    id: 'cs-10-poly',
    title: 'Chapter 10 - Polymorphism',
    chapter: 10,
    items: [
      {
        label: 'Dynamic binding',
        detail:
          'The OBJECT decides which override runs, not the declared type of the variable. Also called late binding.',
      },
      {
        label: 'Static binding',
        detail:
          'final, static and private methods cannot be overridden, so their calls are resolved at compile time. Overloading is also compile-time.',
      },
      {
        label: 'instanceof + downcast',
        detail:
          'A superclass reference can only call superclass methods. Cast to reach subclass-only members.',
        code: `if (e instanceof Hourly) {
    Hourly h = (Hourly) e;
    System.out.println(h.getHours());
}`,
      },
      {
        label: 'Report the real type',
        detail: 'Inherited from Object, so it works through any variable.',
        code: `System.out.println(obj.getClass().getName());`,
      },
      {
        label: 'final class',
        detail: 'Cannot be extended; all its methods are implicitly final. String is one.',
      },
    ],
  },
  {
    id: 'cs-11-structure',
    title: 'Chapter 11 - try / catch / finally',
    chapter: 11,
    items: [
      {
        label: 'The three valid shapes',
        detail:
          'try + catch, try + finally, try + catch + finally. A try block alone does not compile.',
      },
      {
        label: 'Multi-catch (Java SE 7)',
        detail: 'Vertical bar between types, NOT a comma.',
        code: `catch (ArithmeticException | InputMismatchException ex) {
    System.out.println("bad input");
}`,
      },
      {
        label: 'finally',
        detail:
          'Runs whether or not an exception is thrown, and even after return or break. Skipped only by System.exit.',
      },
      {
        label: 'Termination model',
        detail:
          'The try block ends immediately, control goes to the FIRST matching catch, then resumes after the last catch.',
      },
      {
        label: 'Scope',
        detail:
          'Variables declared inside try are not visible in the catch blocks. Declare them before the try.',
      },
    ],
  },
  {
    id: 'cs-11-throw',
    title: 'Chapter 11 - throw, throws and custom exceptions',
    chapter: 11,
    items: [
      {
        label: 'throws clause',
        detail:
          'In the method HEADING, after the parameter list. Types are comma-separated.',
        code: `public void read() throws IOException, SQLException { }`,
      },
      {
        label: 'throw statement',
        detail: 'In the BODY. Raises the object; the rest of the method is skipped.',
        code: `throw new IllegalArgumentException("too young");`,
      },
      {
        label: 'Custom exception',
        detail: 'Extend Exception and pass the message up with super(s).',
        code: `public class InsufficientAccountBalanceException extends Exception {
    public InsufficientAccountBalanceException(String s) {
        super(s);
    }
}`,
      },
      {
        label: 'Stack trace',
        detail:
          'printStackTrace() prints it. getStackTrace() returns a StackTraceElement[].',
      },
    ],
  },
  {
    id: 'cs-11-assert',
    title: 'Chapter 11 - Assertions and try-with-resources',
    chapter: 11,
    items: [
      {
        label: 'Two versions of assert',
        detail:
          'The second expression becomes the AssertionError message. AssertionError extends Error.',
        code: `assert expression;
assert expression1 : expression2;

assert (number % 5 == 0) : "number must be divisible by 5";`,
      },
      {
        label: 'Enabling assertions',
        detail: 'Disabled by default. Enable with the -ea option.',
        code: `java -ea AssertTest`,
      },
      {
        label: 'Precondition / postcondition',
        detail:
          'Precondition: true when the method is invoked. Postcondition: true after it returns. Specified informally as comments BEFORE the method declaration.',
      },
      {
        label: 'try-with-resources (Java SE 7)',
        detail:
          'Each resource must implement AutoCloseable. Multiple resources are separated by SEMICOLONS. No finally block needed.',
        code: `try (BufferedReader br =
         new BufferedReader(new FileReader(file))) {
    return br.readLine();
}
catch (IOException e) { }`,
      },
    ],
  },
  {
    id: 'cs-15-classes',
    title: 'Chapter 15 - Which class does what',
    chapter: 15,
    items: [
      {
        label: 'Byte streams (8-bit)',
        detail: 'FileInputStream and FileOutputStream.',
      },
      {
        label: 'Character streams (16-bit Unicode)',
        detail: 'FileReader / FileWriter, wrapped by BufferedReader / BufferedWriter.',
      },
      {
        label: 'Formatted output',
        detail:
          'PrintWriter. It has print, println and printf for primitives, objects and arrays.',
      },
      {
        label: 'The wrapping pattern',
        detail: 'BufferedReader takes a FileReader. BufferedWriter takes a FileWriter.',
        code: `BufferedReader br = new BufferedReader(new FileReader("f1.txt"));
BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"));
PrintWriter    pw = new PrintWriter(new FileWriter("out.txt"));`,
      },
      {
        label: 'Standard streams',
        detail: 'System.in (keyboard), System.out (screen), System.err (errors).',
      },
      {
        label: 'Package',
        detail: 'java.io. Note that String is in java.lang, not java.io.',
      },
    ],
  },
  {
    id: 'cs-15-patterns',
    title: 'Chapter 15 - The read and write loops',
    chapter: 15,
    items: [
      {
        label: 'Read character by character',
        detail: 'read() returns an int, or -1 at end of file. Cast it to char to print it.',
        code: `int ch;
while ((ch = reader.read()) != -1) {
    char c = (char) ch;
    if (Character.isUpperCase(c)) upper++;
    if (Character.isLowerCase(c)) lower++;
}`,
      },
      {
        label: 'Read line by line',
        detail: 'readLine() returns a String, or null at the end of the stream.',
        code: `String line;
while ((line = br.readLine()) != null) {
    System.out.println(line);
}`,
      },
      {
        label: 'Copy a file with byte streams',
        detail: 'Same -1 sentinel, byte by byte.',
        code: `int c;
while ((c = in.read()) != -1) {
    out.write(c);
}`,
      },
      {
        label: 'Append instead of overwrite',
        detail: 'Pass true as the second constructor argument.',
        code: `new FileWriter("out.txt", true)
new FileOutputStream("out.txt", true)`,
      },
      {
        label: 'Always close',
        detail:
          'close() in a finally block, or use try-with-resources. Buffered output is lost otherwise.',
      },
    ],
  },
  {
    id: 'cs-15-files',
    title: 'Chapter 15 - Directories, paths and Unicode',
    chapter: 15,
    items: [
      {
        label: 'Create a directory',
        detail: 'Returns true on success, false on failure (including "already exists").',
        code: `File d = new File("TestDir");
if (d.mkdir()) { }`,
      },
      {
        label: 'List a directory',
        detail: 'Returns a String array of names, or null if it is not a directory.',
        code: `String[] entries = new File("MyDir").list();`,
      },
      {
        label: 'Absolute paths',
        detail:
          'Files in the project folder need no path. Elsewhere, double every backslash.',
        code: `new FileInputStream("C:\\\\Users\\\\input.txt")`,
      },
      {
        label: 'Unicode escapes',
        detail: 'Backslash-u followed by four hexadecimal digits.',
        code: `System.out.print("\\u0662");   // Arabic-Indic digit two`,
      },
      {
        label: 'UTF-8',
        detail:
          'UTF = UNICODE Transformation Format. The 8 means 8-bit blocks per character.',
      },
    ],
  },
  {
    id: 'cs-formatting',
    title: 'Output formatting reminders',
    chapter: 'all',
    items: [
      {
        label: 'double values always show a decimal part',
        detail: '500 prints as 500.0. But 0.10 prints as 0.1, because trailing zeros are dropped.',
      },
      {
        label: 'int division truncates',
        detail: '100 / 4 prints 25, not 25.0. Cast one operand to double for a real quotient.',
      },
      {
        label: 'printf conversions',
        detail:
          '%.2f rounds to two decimals, %d is an integer, %s is a String, %n is a line break.',
        code: `System.out.printf("Earnings: %.2f%n", 1000.0);   // Earnings: 1000.00`,
      },
      {
        label: 'print vs println',
        detail:
          'print leaves the cursor on the line. Count newlines, not method calls, when tracing output.',
      },
      {
        label: 'Integer division by zero',
        detail:
          'Throws ArithmeticException with the message "/ by zero". Double division by zero gives Infinity or NaN instead.',
      },
    ],
  },
];
