import type { TrapItem } from '../types';

/**
 * Common exam traps: the specific wrong belief, and the correction.
 * Every entry is tied to something that actually appears in the course material.
 */
export const traps: TrapItem[] = [
  {
    id: 'trap-01',
    title: 'Superclass variable, subclass object',
    chapter: 9,
    wrongBelief:
      'The declared type of the variable decides which version of an overridden method runs.',
    reality:
      'The OBJECT decides. Animal a = new Dog(); a.speak(); runs the Dog version. This is dynamic binding, and it applies even when the call sits inside a superclass method.',
    code: `Animal a = new Dog();
a.speak();   // Dog's speak runs, not Animal's`,
  },
  {
    id: 'trap-02',
    title: 'Superclass object into a subclass variable',
    chapter: 9,
    wrongBelief: 'If subclass-into-superclass works, the reverse must work too.',
    reality:
      'It is a compilation error. A superclass object is not an object of any of its subclasses, so it lacks the subclass members.',
    code: `Employee e = new Manager("Zaid");   // legal
Manager m = new Employee("Zaid");   // COMPILATION ERROR`,
  },
  {
    id: 'trap-03',
    title: 'Subclass-only methods through a superclass reference',
    chapter: 10,
    wrongBelief:
      'Since the object really is a Dog, any Dog method can be called through the Animal variable.',
    reality:
      'The compiler checks calls against the DECLARED type. Animal has no fetch method, so it does not compile. A downcast makes it visible.',
    code: `Animal a = new Dog();
a.fetch();              // COMPILATION ERROR
((Dog) a).fetch();      // fine`,
  },
  {
    id: 'trap-04',
    title: 'Private superclass fields inside a subclass',
    chapter: 9,
    wrongBelief: 'A subclass inherits everything, so it can use any superclass field by name.',
    reality:
      'private members are hidden from subclasses. The subclass must go through an inherited public or protected method, or the field must be declared protected.',
    code: `class Shape { private double area = 10.0; }

class Circle extends Shape {
    void report() {
        System.out.println(area);   // COMPILATION ERROR
    }
}`,
  },
  {
    id: 'trap-05',
    title: 'super(...) placed after other statements',
    chapter: 9,
    wrongBelief: 'The super(...) call can go anywhere in the constructor.',
    reality:
      'It must be the FIRST statement. And if you omit it, the compiler inserts a call to the superclass no-argument constructor, which fails when the superclass has none.',
    code: `public Manager(String name, String dept) {
    this.dept = dept;
    super(name);          // COMPILATION ERROR - must be first
}`,
  },
  {
    id: 'trap-06',
    title: 'Instantiating an abstract class',
    chapter: 10,
    wrongBelief:
      'Creating an object of an abstract class fails at runtime, so the answer must be a runtime error.',
    reality:
      'It is a COMPILATION error. The program never runs. Declaring a variable of the abstract type is fine; only the new expression is illegal.',
    code: `abstract class Shape { public abstract void draw(); }

Shape s;                  // fine - just a variable
Shape t = new Shape();    // COMPILATION ERROR`,
  },
  {
    id: 'trap-07',
    title: 'Assigning to an interface field',
    chapter: 10,
    wrongBelief: 'An implementing class can change a value declared in the interface.',
    reality:
      'Interface fields are implicitly public, static and FINAL, so they are constants. Assigning to one does not compile.',
    code: `interface Car { int basePrice = 1000; }

class Test implements Car {
    void changePrice() {
        basePrice = 2000;   // COMPILATION ERROR - basePrice is final
    }
}`,
  },
  {
    id: 'trap-08',
    title: 'Interface methods without public in the implementing class',
    chapter: 10,
    wrongBelief:
      'Since the interface does not write public, the implementing class does not need it either.',
    reality:
      'Interface methods are implicitly public. Leaving public off in the implementing class narrows the access, which is a compilation error.',
    code: `interface Predator { void chasePrey(Prey p); }

class Lion implements Predator {
    void chasePrey(Prey p) { }          // COMPILATION ERROR
    public void chasePrey(Prey p) { }   // correct
}`,
  },
  {
    id: 'trap-09',
    title: 'throw versus throws',
    chapter: 11,
    wrongBelief: 'The two keywords are interchangeable.',
    reality:
      'throws goes in the method HEADING and declares what might happen. throw is a STATEMENT in the body that actually raises the exception object.',
    code: `public void withdraw(double a) throws InsufficientBalanceException {
    if (a > balance) {
        throw new InsufficientBalanceException("too much");
    }
}`,
  },
  {
    id: 'trap-10',
    title: 'The multi-catch separator',
    chapter: 11,
    wrongBelief: 'Multiple exception types in one catch block are separated by commas.',
    reality:
      'Multi-catch uses a vertical bar. Commas are what a THROWS clause uses. Mixing the two up is a classic exam trap.',
    code: `catch (ArithmeticException | InputMismatchException e) { }   // correct
void read() throws IOException, SQLException { }              // comma here`,
  },
  {
    id: 'trap-11',
    title: 'When finally does not run',
    chapter: 11,
    wrongBelief: 'A return statement in the try block skips the finally block.',
    reality:
      'finally runs after return and after break, and it runs when no catch block matches. The only thing that skips it is System.exit.',
    code: `static int test() {
    try { return 1; }
    finally { System.out.println("finally runs"); }
}
// prints "finally runs", then returns 1`,
  },
  {
    id: 'trap-12',
    title: 'try-with-resources arrived in Java SE 7',
    chapter: 11,
    wrongBelief: 'try-with-resources was introduced in Java SE 6.',
    reality:
      'Both try-with-resources and multi-catch arrived in Java SE 7. The current review sheet uses "SE 6" as the false statement.',
  },
  {
    id: 'trap-13',
    title: 'Assertions do nothing by default',
    chapter: 11,
    wrongBelief: 'Adding an assert statement automatically protects the code.',
    reality:
      'Assertions are DISABLED by default, because they cost performance and are not for end users. Run with java -ea to enable them.',
    code: `// java Statistics       -> assertion skipped, prints NaN
// java -ea Statistics    -> AssertionError with the message`,
  },
  {
    id: 'trap-14',
    title: 'read() versus readLine() at end of file',
    chapter: 15,
    wrongBelief: 'Every read method signals end of file the same way.',
    reality:
      'read() returns -1 because it returns an int. readLine() returns null because it returns a String. Swapping them will not even compile.',
    code: `while ((ch = br.read()) != -1)      { }    // characters
while ((line = br.readLine()) != null) { }    // lines`,
  },
  {
    id: 'trap-15',
    title: 'Printing the int returned by read()',
    chapter: 15,
    wrongBelief: 'System.out.print(br.read()) displays the character.',
    reality:
      'read() returns an int, so printing it shows the numeric character code. Cast it to char first.',
    code: `int ch = br.read();
System.out.print(ch);          // prints e.g. 74
System.out.print((char) ch);   // prints J`,
  },
  {
    id: 'trap-16',
    title: 'FileWriter overwrites unless you say otherwise',
    chapter: 15,
    wrongBelief: 'Writing to an existing file adds to the end of it.',
    reality:
      'The one-argument constructor REPLACES the whole file. Pass true as the second argument to append.',
    code: `new FileWriter("out.txt")         // replaces the file
new FileWriter("out.txt", true)   // appends to it`,
  },
  {
    id: 'trap-17',
    title: 'PrintWriter is not BufferedWriter',
    chapter: 15,
    wrongBelief: 'BufferedWriter is the class that writes formatted output to a file.',
    reality:
      'PrintWriter is. It supplies print, println and printf for primitive types, objects and arrays. BufferedWriter only has write.',
  },
  {
    id: 'trap-18',
    title: 'The directory-creating method is mkdir',
    chapter: 15,
    wrongBelief: 'The File class method is makeDir or makeDirectory.',
    reality:
      'It is mkdir(), and it returns a boolean: true on success, false on failure, including when the directory already exists.',
  },
  {
    id: 'trap-19',
    title: 'String is not in java.io',
    chapter: 15,
    wrongBelief: 'String must be a java.io class, because every file program uses it.',
    reality:
      'String is in java.lang, which is imported automatically. File, FileReader, FileWriter and the stream classes are the java.io members.',
  },
  {
    id: 'trap-20',
    title: 'UTF stands for Unicode, not Unified',
    chapter: 15,
    wrongBelief: 'In UTF-8, UTF stands for Unified Transformation Format.',
    reality:
      'It stands for UNICODE Transformation Format. The 8 means the encoding uses 8-bit blocks to represent a character.',
  },
  {
    id: 'trap-21',
    title: 'Doubles always print with a decimal part',
    chapter: 9,
    wrongBelief: 'A double holding 500 prints as 500.',
    reality:
      'It prints as 500.0. Equally, a method that RETURNS double prints 0 as 0.0. And 0.10 prints as 0.1, because the trailing zero is dropped.',
    code: `double d = 500;
System.out.println(d);      // 500.0
System.out.println(0.10);   // 0.1`,
  },
  {
    id: 'trap-22',
    title: 'print versus println in an inherited method',
    chapter: 9,
    wrongBelief: 'Each method call produces its own line of output.',
    reality:
      'If a superclass method uses print, its text stays on the same line and the subclass text continues it. Count the newlines, not the method calls.',
    code: `void eat() { System.out.print(name + " eats"); }        // no newline

void eat() {                       // in the subclass
    super.eat();
    System.out.println(" only dog food");
}
// one line: "Rex eats only dog food"`,
  },
  {
    id: 'trap-23',
    title: 'Only the first matching catch block runs',
    chapter: 11,
    wrongBelief: 'Every catch block whose type matches gets a turn.',
    reality:
      'Control transfers to the FIRST matching catch block and then resumes after the last one. This is why the specific type must be listed before the general one.',
  },
  {
    id: 'trap-24',
    title: 'An exception while building a println argument',
    chapter: 11,
    wrongBelief: 'The part of the message before the error still gets printed.',
    reality:
      'The whole argument is evaluated before printing starts, so nothing from that line appears.',
    code: `System.out.println("100 / " + d + " = " + (100 / d));
// d == 0 -> nothing at all is printed`,
  },
  {
    id: 'trap-25',
    title: 'Overloading is not overriding',
    chapter: 10,
    wrongBelief: 'Two methods with the same name always mean overriding and dynamic binding.',
    reality:
      'Same name plus a DIFFERENT parameter list is overloading, and the compiler picks the version from the argument types. That is static binding.',
    code: `void show(int a) { }
void show(int a, int b) { }   // overloading - resolved at compile time`,
  },
  {
    id: 'trap-26',
    title: '"None of the above" is sometimes the answer',
    chapter: 10,
    wrongBelief: 'A "choose the wrong statement" question must have a wrong statement listed.',
    reality:
      'On the current review sheet, all three interface statements are correct, so the answer is "none of the above". Verify each option before assuming one must be false.',
  },
];
