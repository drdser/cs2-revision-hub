import type { CodeCompletionQuestion } from '../../types';

/**
 * Section E - Complete the Code.
 *
 * Each snippet contains a `_____` placeholder. The renderer highlights that
 * placeholder, and the student types the missing fragment.
 */
export const codeCompletionQuestions: CodeCompletionQuestion[] = [
  {
    id: 'cc-01',
    chapter: 9,
    topic: 'extends keyword',
    type: 'code-completion',
    difficulty: 'easy',
    question: 'Complete the declaration so that Dog inherits from Animal.',
    code: `class Animal {
    protected String name;
}

class Dog _____ Animal {
    private String breed;
}`,
    correctAnswer: 'extends',
    acceptedAnswers: ['extends'],
    explanation:
      'extends names the direct superclass. A class may extend exactly one class, because Java supports single inheritance.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-02',
    chapter: 9,
    topic: 'super constructor call',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      "Complete the subclass constructor so it initialises the superclass part with the employee's name.",
    code: `class Employee {
    private final String name;
    public Employee(String name) {
        this.name = name;
    }
}

class Manager extends Employee {
    private String department;
    public Manager(String name, String department) {
        _____;
        this.department = department;
    }
}`,
    correctAnswer: 'super(name)',
    acceptedAnswers: ['super(name)', 'super(name);'],
    explanation:
      'Employee has no no-argument constructor, so the call must be explicit. It also has to be the first statement in the constructor body.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-03',
    chapter: 9,
    topic: 'super.method() call',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      "Complete the override so that the subclass reuses the superclass's String representation.",
    code: `class Employee {
    @Override
    public String toString() {
        return "Employee: " + getName();
    }
}

class Manager extends Employee {
    private String department;

    @Override
    public String toString() {
        return _____ + " | dept " + department;
    }
}`,
    correctAnswer: 'super.toString()',
    acceptedAnswers: ['super.tostring()'],
    explanation:
      'Writing toString() alone would call the overriding method again and recurse forever. super forces the superclass version.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-04',
    chapter: 9,
    topic: 'Access modifiers',
    type: 'code-completion',
    difficulty: 'medium',
    question:
      'Complete the declaration so that subclasses may use balance directly, while unrelated classes may not.',
    code: `class Account {
    _____ double balance;

    public double getBalance() { return balance; }
}

class Savings extends Account {
    public void addInterest() {
        balance = balance * 1.05;   // must compile
    }
}`,
    correctAnswer: 'protected',
    acceptedAnswers: ['protected'],
    explanation:
      'private would hide balance from Savings and cause a compilation error. public would expose it to every class, which defeats encapsulation.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-05',
    chapter: 9,
    topic: '@Override annotation',
    type: 'code-completion',
    difficulty: 'easy',
    question:
      'Add the annotation that tells the compiler this method is meant to override a superclass method.',
    code: `class Shape {
    public double area() { return 0; }
}

class Circle extends Shape {
    private double radius = 2;

    _____
    public double area() {
        return Math.PI * radius * radius;
    }
}`,
    correctAnswer: '@Override',
    acceptedAnswers: ['@override'],
    explanation:
      'If the signature does not actually match an inherited method, the compiler reports an error instead of silently adding a new method.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-06',
    chapter: 10,
    topic: 'abstract keyword',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the class header so that Employee cannot be instantiated and may declare a method with no body.',
    code: `public _____ class Employee {
    private final String name;
    public Employee(String name) { this.name = name; }
    public abstract double earnings();
}`,
    correctAnswer: 'abstract',
    acceptedAnswers: ['abstract'],
    explanation:
      'A class that contains an abstract method must itself be declared abstract, even when it also has constructors and concrete methods.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-07',
    chapter: 10,
    topic: 'Abstract methods',
    type: 'code-completion',
    difficulty: 'medium',
    question:
      'Complete the method declaration so that every concrete subclass is forced to supply its own draw implementation.',
    code: `public abstract class Shape {
    public _____ void draw();
}`,
    correctAnswer: 'abstract',
    acceptedAnswers: ['abstract'],
    explanation:
      'An abstract method has no body and ends with a semicolon. Each concrete subclass must provide an implementation.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-08',
    chapter: 10,
    topic: 'implements keyword',
    type: 'code-completion',
    difficulty: 'easy',
    question: 'Complete the class header so that Lion provides the Predator interface.',
    code: `public interface Predator {
    void chasePrey(Prey p);
    void eatPrey(Prey p);
}

public class Lion _____ Predator {
    private int age;

    @Override
    public void chasePrey(Prey p) { }

    @Override
    public void eatPrey(Prey p) { }
}`,
    correctAnswer: 'implements',
    acceptedAnswers: ['implements'],
    explanation:
      'Because Lion is concrete, it must supply every method the interface declares, and each one must be declared public.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'cc-09',
    chapter: 10,
    topic: 'Multiple interfaces',
    type: 'code-completion',
    difficulty: 'medium',
    question:
      'Complete the header so that Robot extends Machine and provides both interfaces.',
    code: `interface Movable { void start(); }
interface Stoppable { void stop(); }
class Machine { }

class Robot extends Machine implements Movable_____Stoppable {
    public void start() { System.out.println("starting"); }
    public void stop()  { System.out.println("stopping"); }
}`,
    correctAnswer: ', ',
    acceptedAnswers: [',', ', '],
    explanation:
      'Multiple interfaces are listed comma-separated after implements. A class may extend only one superclass but implement any number of interfaces.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-10',
    chapter: 10,
    topic: 'interface keyword',
    type: 'code-completion',
    difficulty: 'easy',
    question:
      'Complete the declaration of a type that contains only constants and abstract methods.',
    code: `public _____ Payable {
    double getPaymentAmount();
}`,
    correctAnswer: 'interface',
    acceptedAnswers: ['interface'],
    explanation:
      'Inside an interface the method is implicitly public and abstract, so neither keyword needs to be written.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-11',
    chapter: 10,
    topic: 'instanceof and downcasting',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the test so the downcast on the next line is guaranteed to be safe.',
    code: `for (Employee currentEmployee : employees) {
    if (currentEmployee _____ BasePlusCommissionEmployee) {
        BasePlusCommissionEmployee e =
            (BasePlusCommissionEmployee) currentEmployee;
        e.setBaseSalary(e.getBaseSalary() * 1.10);
    }
}`,
    correctAnswer: 'instanceof',
    acceptedAnswers: ['instanceof'],
    explanation:
      'Without the instanceof guard, the cast would throw a ClassCastException whenever the element is some other kind of Employee.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-12',
    chapter: 10,
    topic: 'Downcasting',
    type: 'code-completion',
    difficulty: 'hard',
    question:
      'Complete the assignment so that the subclass-only method getHours can be called.',
    code: `Employee e = new Hourly("Omar", 20, 100);

if (e instanceof Hourly) {
    Hourly h = _____ e;
    System.out.println(h.getHours());
}`,
    correctAnswer: '(Hourly)',
    acceptedAnswers: ['(hourly)'],
    explanation:
      'The compiler checks calls against the declared type of the variable, so the reference must be cast to Hourly before getHours becomes visible.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-13',
    chapter: 10,
    topic: 'final keyword',
    type: 'code-completion',
    difficulty: 'medium',
    question:
      'Complete the declaration so that no subclass can ever change the behaviour of this method.',
    code: `class Config {
    public _____ String version() {
        return "1.0";
    }
}`,
    correctAnswer: 'final',
    acceptedAnswers: ['final'],
    explanation:
      'A final method cannot be overridden, so calls to it are resolved at compile time using static binding.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-14',
    chapter: 11,
    topic: 'try and catch',
    type: 'code-completion',
    difficulty: 'easy',
    question: 'Complete the handler so the division by zero is dealt with.',
    code: `try {
    int result = numerator / denominator;
    System.out.println(result);
}
_____ (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}`,
    correctAnswer: 'catch',
    acceptedAnswers: ['catch'],
    explanation:
      'A catch block begins with the keyword catch, followed by an exception parameter in parentheses and a block of code.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-15',
    chapter: 11,
    topic: 'Multi-catch',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the multi-catch so that both exception types share the same handler.',
    code: `try {
    number = input.nextInt();
    System.out.println(100 / number);
}
catch (ArithmeticException _____ InputMismatchException ex) {
    System.out.println("Invalid input or division by zero.");
}`,
    correctAnswer: '|',
    acceptedAnswers: ['|'],
    explanation:
      'Each exception type in a multi-catch is separated from the next with a vertical bar. Multi-catch was introduced in Java SE 7.',
    sourceType: 'current-review',
  },
  {
    id: 'cc-16',
    chapter: 11,
    topic: 'finally block',
    type: 'code-completion',
    difficulty: 'medium',
    question:
      'Complete the block that runs whether or not an exception occurred, so the reader is always closed.',
    code: `BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("f1.txt"));
    System.out.println(br.readLine());
}
catch (IOException ioe) {
    System.out.println(ioe.getMessage());
}
_____ {
    try {
        if (br != null) br.close();
    }
    catch (IOException ioe) {
        System.out.println("Error in closing the BufferedReader");
    }
}`,
    correctAnswer: 'finally',
    acceptedAnswers: ['finally'],
    explanation:
      'Resource-release code belongs in a finally block, because that block runs even when the try block throws or returns early.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-17',
    chapter: 11,
    topic: 'throws clause',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the method heading so it declares that the method may raise an IOException.',
    code: `public static String readFirstLine(String file) _____ IOException {
    BufferedReader br = new BufferedReader(new FileReader(file));
    String first = br.readLine();
    br.close();
    return first;
}`,
    correctAnswer: 'throws',
    acceptedAnswers: ['throws'],
    explanation:
      'The throws clause appears after the parameter list and before the body, and informs callers what they may need to catch.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-18',
    chapter: 11,
    topic: 'throw statement',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the statement that raises the custom exception when the balance is too low.',
    code: `public void withdraw(double amount)
        throws InsufficientAccountBalanceException {
    if (amount > balance) {
        _____ new InsufficientAccountBalanceException(
            "Balance is not sufficient");
    }
    balance -= amount;
}`,
    correctAnswer: 'throw',
    acceptedAnswers: ['throw'],
    explanation:
      'throw raises the exception object immediately, so the subtraction below it never runs for that call.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-19',
    chapter: 11,
    topic: 'Custom exceptions',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the declaration so this user-defined exception can be used with try and catch.',
    code: `public class InsufficientAccountBalanceException _____ Exception {
    public InsufficientAccountBalanceException(String s) {
        super(s);
    }
}`,
    correctAnswer: 'extends',
    acceptedAnswers: ['extends'],
    explanation:
      'A new exception class must extend Exception. The constructor passes the message up with super(s) so that getMessage returns it.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-20',
    chapter: 11,
    topic: 'Assertions',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the statement so that an AssertionError with the message "number must be divisible by 5" is thrown when the entered number is not divisible by 5.',
    code: `Scanner input = new Scanner(System.in);
System.out.print("Enter a positive number:");
int number = input.nextInt();

_____;`,
    correctAnswer: 'assert (number % 5 == 0) : "number must be divisible by 5"',
    acceptedAnswers: [
      'assert (number % 5 == 0) : "number must be divisible by 5"',
      'assert number % 5 == 0 : "number must be divisible by 5"',
      'assert (number % 5 == 0) : "number must be divisible by 5";',
      'assert number % 5 == 0 : "number must be divisible by 5";',
    ],
    explanation:
      'The two-expression form of assert evaluates the boolean condition first and uses the second expression as the error message. Remember that assertions must be enabled with the -ea option.',
    sourceType: 'current-review',
  },
  {
    id: 'cc-21',
    chapter: 11,
    topic: 'try-with-resources',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the interface name so the class can be used in a try-with-resources statement.',
    code: `class DatabaseConnection implements _____ {
    public DatabaseConnection() {
        System.out.println("connection opened");
    }

    @Override
    public void close() {
        System.out.println("connection closed");
    }
}`,
    correctAnswer: 'AutoCloseable',
    acceptedAnswers: ['autocloseable'],
    explanation:
      'AutoCloseable declares the close method that a try-with-resources statement calls implicitly at the end of the try block.',
    sourceType: 'current-review',
  },
  {
    id: 'cc-22',
    chapter: 11,
    topic: 'try-with-resources',
    type: 'code-completion',
    difficulty: 'hard',
    question:
      'Complete the try-with-resources header so the reader is closed automatically.',
    code: `public static String readFirstLineFromFile(String file)
        throws IOException {
    try _____ {
        return br.readLine();
    }
    catch (IOException e) {
        System.out.println(e.getMessage());
        return null;
    }
}`,
    correctAnswer: '(BufferedReader br = new BufferedReader(new FileReader(file)))',
    acceptedAnswers: [
      '(bufferedreader br = new bufferedreader(new filereader(file)))',
      '(bufferedreader br = new bufferedreader(new filereader(file)));',
    ],
    explanation:
      'The resource is declared inside the parentheses that follow try. It is closed automatically when the block ends, so no finally block is needed.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-23',
    chapter: 15,
    topic: 'BufferedReader',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the loop condition so the program reads the file one character at a time until the end.',
    code: `int ch;
BufferedReader reader =
    new BufferedReader(new FileReader("input.txt"));

while ((ch = reader.read()) _____) {
    System.out.print((char) ch);
}
reader.close();`,
    correctAnswer: '!= -1',
    acceptedAnswers: ['!= -1', '!=-1'],
    explanation:
      'read() returns the next character as an int, or -1 at end of file. Note that a readLine loop would test != null instead.',
    sourceType: 'current-review',
  },
  {
    id: 'cc-24',
    chapter: 15,
    topic: 'BufferedReader',
    type: 'code-completion',
    difficulty: 'exam',
    question: 'Complete the loop so the program reads the file one line at a time.',
    code: `BufferedReader br =
    new BufferedReader(new FileReader("f1.txt"));

String contentLine = br.readLine();
while (contentLine _____) {
    System.out.println(contentLine);
    contentLine = br.readLine();
}
br.close();`,
    correctAnswer: '!= null',
    acceptedAnswers: ['!= null', '!=null'],
    explanation:
      'readLine() returns null when there are no more lines. Testing != -1 here would not even compile, because readLine returns a String.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-25',
    chapter: 15,
    topic: 'BufferedReader construction',
    type: 'code-completion',
    difficulty: 'medium',
    question: 'Complete the expression so the BufferedReader reads from the file f1.txt.',
    code: `BufferedReader br = new BufferedReader(_____);
System.out.println(br.readLine());
br.close();`,
    correctAnswer: 'new FileReader("f1.txt")',
    acceptedAnswers: ['new filereader("f1.txt")', "new filereader('f1.txt')"],
    explanation:
      'A BufferedReader object requires a FileReader object. The mirror image is new BufferedWriter(new FileWriter("output.txt")).',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-26',
    chapter: 15,
    topic: 'BufferedWriter construction',
    type: 'code-completion',
    difficulty: 'medium',
    question: 'Complete the expression so the BufferedWriter writes to output.txt.',
    code: `BufferedWriter bw = new BufferedWriter(_____);
bw.write("This line goes to the file");
bw.close();`,
    correctAnswer: 'new FileWriter("output.txt")',
    acceptedAnswers: ['new filewriter("output.txt")', "new filewriter('output.txt')"],
    explanation:
      'A BufferedWriter object requires a FileWriter object. Calling close() is important, because it flushes the buffered text to disk.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-27',
    chapter: 15,
    topic: 'Appending to files',
    type: 'code-completion',
    difficulty: 'hard',
    question:
      'Complete the constructor call so new text is appended to output.txt instead of replacing it.',
    code: `FileWriter fw = new FileWriter("output.txt"_____);
BufferedWriter bw = new BufferedWriter(fw);
bw.write("one more line\\n");
bw.close();`,
    correctAnswer: ', true',
    acceptedAnswers: [', true', ',true'],
    explanation:
      'The second constructor argument is the append flag. Without it, the one-argument constructor replaces the whole file.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'cc-28',
    chapter: 15,
    topic: 'Character classification',
    type: 'code-completion',
    difficulty: 'exam',
    question:
      'Complete the test so the program counts the uppercase letters in the input file.',
    code: `int ch;
int upperCount = 0;
BufferedReader reader =
    new BufferedReader(new FileReader("input.txt"));

while ((ch = reader.read()) != -1) {
    char character = (char) ch;
    if (_____) {
        upperCount++;
    }
}
System.out.println("Uppercase letters: " + upperCount);`,
    correctAnswer: 'Character.isUpperCase(character)',
    acceptedAnswers: ['character.isuppercase(character)'],
    explanation:
      'Character.isUpperCase is a static method that takes the char as an argument. Character.isLowerCase(character) is the matching test for lowercase letters.',
    sourceType: 'current-review',
  },
  {
    id: 'cc-29',
    chapter: 15,
    topic: 'Directories',
    type: 'code-completion',
    difficulty: 'medium',
    question: 'Complete the call that creates the directory and reports whether it worked.',
    code: `String dirname = "TestDir";
File d = new File(dirname);

if (d._____) {
    System.out.println("Directory created successfully.");
} else {
    System.out.println("Directory was not created successfully.");
}`,
    correctAnswer: 'mkdir()',
    acceptedAnswers: ['mkdir()', 'mkdir'],
    explanation:
      'mkdir() returns true on success and false on failure, so it fits directly into the if condition.',
    sourceType: 'current-review',
  },
  {
    id: 'cc-30',
    chapter: 15,
    topic: 'Byte streams',
    type: 'code-completion',
    difficulty: 'hard',
    question:
      'Complete the two declarations so the program copies input.txt into output.txt using byte streams.',
    code: `_____ in = new FileInputStream("input.txt");
FileOutputStream out = new FileOutputStream("output.txt");

int c;
while ((c = in.read()) != -1) {
    out.write(c);
}
in.close();
out.close();`,
    correctAnswer: 'FileInputStream',
    acceptedAnswers: ['fileinputstream', 'inputstream'],
    explanation:
      'FileInputStream and FileOutputStream are the byte-stream classes used most often. The variable may also be declared as the more general type InputStream.',
    sourceType: 'generated-from-course-material',
  },
];
