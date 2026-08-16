import type { OutputQuestion } from '../../types';

/**
 * Section C - Output / Code Tracing.
 *
 * Every program in this file was compiled and executed on JDK 21 while the bank
 * was written, and `expectedOutput` is the exact console text that was produced.
 * The four "compilation error" items were confirmed by running javac and reading
 * the reported error.
 */
export const outputQuestions: OutputQuestion[] = [
  // ------------------------------------------------------- Inheritance tracing
  {
    id: 'out-01',
    chapter: 9,
    topic: 'super and overriding',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q1 {
    public static void main(String[] args) {
        Dog d1 = new Dog("Rex", "Beagle");
        d1.bark();
        d1.eat();
        Dog d2 = new Dog("Luna", "Husky");
        d2.bark();
        d2.eat();
    }
}
class Animal {
    String name;
    public Animal(String name) {
        this.name = name;
    }
    void eat() { System.out.print(name + " eats"); }
}
class Dog extends Animal {
    String breed;
    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
    }
    void bark() { System.out.println(name + " the " + breed + " barks loudly"); }
    void eat() {
        super.eat();
        System.out.println(" only dog food");
    }
}`,
    expectedOutput: `Rex the Beagle barks loudly
Rex eats only dog food
Luna the Husky barks loudly
Luna eats only dog food`,
    steps: [
      'new Dog("Rex", "Beagle") runs the Dog constructor, which calls super(name) first, so Animal sets name to "Rex". Then breed is set to "Beagle".',
      'd1.bark() uses println, so it prints "Rex the Beagle barks loudly" and moves to a new line.',
      'd1.eat() calls super.eat() first. Animal.eat uses print (no newline), giving "Rex eats" with the cursor still on that line.',
      'Control returns to Dog.eat, which uses println to append " only dog food", so the line becomes "Rex eats only dog food" and then ends.',
      'The same four steps repeat for d2 with "Luna" and "Husky".',
    ],
    explanation:
      'The key details are the print/println mix and the super.eat() call. Animal.eat uses print, so its text stays on the same line as the text that Dog.eat prints afterwards.',
    sourceType: 'current-review',
  },
  {
    id: 'out-02',
    chapter: 9,
    topic: 'Constructor chaining',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q2 {
    public static void main(String[] args) {
        new Manager("Sara");
    }
}
class Person {
    public Person() {
        System.out.println("Person constructor");
    }
}
class Employee extends Person {
    public Employee() {
        System.out.println("Employee constructor");
    }
}
class Manager extends Employee {
    public Manager(String name) {
        System.out.println("Manager constructor for " + name);
    }
}`,
    expectedOutput: `Person constructor
Employee constructor
Manager constructor for Sara`,
    steps: [
      'new Manager("Sara") starts the Manager constructor.',
      'Manager does not call super(...) explicitly, so the compiler inserts a call to the Employee no-argument constructor as the first statement.',
      'Employee likewise gets an inserted call to the Person no-argument constructor.',
      'Person has no superclass call to make beyond Object, so its body runs first and prints "Person constructor".',
      'Control unwinds: Employee prints "Employee constructor", then Manager prints "Manager constructor for Sara".',
    ],
    explanation:
      'Constructors complete from the top of the hierarchy downwards. The superclass part of the object is always initialised before the subclass part, so the printing order is the reverse of the order in which the constructors were entered.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-03',
    chapter: 9,
    topic: 'super.method() and toString',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q3 {
    public static void main(String[] args) {
        BasePlusCommission b =
            new BasePlusCommission("Ali", 10000, 0.05, 500);
        System.out.println(b);
        System.out.printf("Earnings: %.2f%n", b.earnings());
    }
}
class Commission {
    private final String name;
    private double sales;
    private double rate;
    public Commission(String name, double sales, double rate) {
        this.name = name;
        this.sales = sales;
        this.rate = rate;
    }
    public double getSales() { return sales; }
    public double getRate() { return rate; }
    public double earnings() { return getRate() * getSales(); }
    @Override
    public String toString() {
        return "commission employee: " + name;
    }
}
class BasePlusCommission extends Commission {
    private double baseSalary;
    public BasePlusCommission(String name, double sales,
                              double rate, double baseSalary) {
        super(name, sales, rate);
        this.baseSalary = baseSalary;
    }
    @Override
    public double earnings() { return baseSalary + super.earnings(); }
    @Override
    public String toString() {
        return "base-salaried " + super.toString() + " with base " + baseSalary;
    }
}`,
    expectedOutput: `base-salaried commission employee: Ali with base 500.0
Earnings: 1000.00`,
    steps: [
      'println(b) implicitly calls b.toString(). Because b refers to a BasePlusCommission, the subclass version runs.',
      'That version builds "base-salaried " + super.toString() + " with base " + baseSalary. super.toString() gives "commission employee: Ali".',
      'baseSalary is a double, so it prints as 500.0, not 500.',
      'b.earnings() runs the subclass version: baseSalary + super.earnings() = 500 + (0.05 * 10000) = 500 + 500 = 1000.0.',
      'printf with %.2f formats 1000.0 as 1000.00, and %n ends the line.',
    ],
    explanation:
      'Two traps here. A double prints with a .0 suffix, so "500" would be wrong. And %.2f rounds the earnings to exactly two decimal places.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-04',
    chapter: 9,
    topic: 'Overriding a helper method',
    type: 'output',
    difficulty: 'hard',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q4 {
    public static void main(String[] args) {
        Shape s = new Circle();
        s.describe();
        Shape t = new Square();
        t.describe();
    }
}
class Shape {
    void name() { System.out.print("Shape"); }
    void describe() {
        System.out.print("This is a ");
        name();
        System.out.println(".");
    }
}
class Circle extends Shape {
    void name() { System.out.print("Circle"); }
}
class Square extends Shape {
    void name() { System.out.print("Square"); }
    void describe() {
        super.describe();
        System.out.println("It has 4 equal sides.");
    }
}`,
    expectedOutput: `This is a Circle.
This is a Square.
It has 4 equal sides.`,
    steps: [
      's refers to a Circle. Circle does not override describe, so Shape.describe runs.',
      'Inside Shape.describe the call name() is an unqualified call on this. Since this is a Circle, dynamic binding selects Circle.name, printing "Circle".',
      'The line becomes "This is a Circle." and println ends it.',
      't refers to a Square, which does override describe. Square.describe calls super.describe() first.',
      'Shape.describe runs again and its name() call binds to Square.name, producing "This is a Square.".',
      'Control returns to Square.describe, which prints "It has 4 equal sides." on the next line.',
    ],
    explanation:
      'An unqualified method call inside a superclass method is still dispatched dynamically on the actual object. Shape.describe therefore prints a different word depending on which subclass it is running for.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-05',
    chapter: 9,
    topic: 'Constructor order and protected fields',
    type: 'output',
    difficulty: 'hard',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q5 {
    public static void main(String[] args) {
        Vehicle v = new Car(4);
        System.out.println(v.getWheels());
        System.out.println(v);
    }
}
class Vehicle {
    protected int wheels;
    public Vehicle() {
        wheels = 2;
        System.out.println("Vehicle created with " + wheels + " wheels");
    }
    public int getWheels() { return wheels; }
    @Override
    public String toString() { return "Vehicle[" + wheels + "]"; }
}
class Car extends Vehicle {
    public Car(int w) {
        wheels = w;
        System.out.println("Car created with " + wheels + " wheels");
    }
}`,
    expectedOutput: `Vehicle created with 2 wheels
Car created with 4 wheels
4
Vehicle[4]`,
    steps: [
      'new Car(4) enters the Car constructor. Because there is no explicit super(...) call, the compiler inserts a call to the Vehicle no-argument constructor first.',
      'Vehicle sets wheels to 2 and prints "Vehicle created with 2 wheels".',
      'Control returns to the Car constructor body, which overwrites wheels with 4 and prints "Car created with 4 wheels".',
      'v.getWheels() returns the current value, 4.',
      'println(v) calls toString. Car does not override it, so Vehicle.toString runs and prints "Vehicle[4]" using the current value of wheels.',
    ],
    explanation:
      'Because wheels is protected, the Car constructor can assign it directly, overwriting the value the superclass constructor set. The inherited toString then reports the updated value.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-06',
    chapter: 9,
    topic: 'Dynamic binding of an inherited call',
    type: 'output',
    difficulty: 'medium',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q6 {
    public static void main(String[] args) {
        Base b = new Derived();
        b.greet();
    }
}
class Base {
    void show() { System.out.println("Base show"); }
    void greet() {
        System.out.print("Hello from ");
        show();
    }
}
class Derived extends Base {
    void show() { System.out.println("Derived show"); }
}`,
    expectedOutput: `Hello from Derived show`,
    steps: [
      'b is declared as Base but refers to a Derived object.',
      'Derived does not override greet, so Base.greet runs and prints "Hello from " with no newline.',
      'The call show() inside greet is dispatched on the actual object, which is a Derived, so Derived.show runs.',
      'Derived.show prints "Derived show" and ends the line, so the whole output is a single line.',
    ],
    explanation:
      'The output is one line, not two, because greet uses print rather than println. The overridden show is selected by dynamic binding even though the call sits in the superclass.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-07',
    chapter: 9,
    topic: 'Overriding and super in a hierarchy',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q7 {
    public static void main(String[] args) {
        Account a = new Savings("S-1", 1000);
        System.out.println(a.describe());
        a.addInterest();
        System.out.println(a.describe());
    }
}
class Account {
    protected String id;
    protected double balance;
    public Account(String id, double balance) {
        this.id = id;
        this.balance = balance;
    }
    public String describe() { return "Account " + id + " balance " + balance; }
    public void addInterest() {
        System.out.println("No interest on a basic account");
    }
}
class Savings extends Account {
    public Savings(String id, double balance) { super(id, balance); }
    @Override
    public String describe() { return "Savings " + super.describe(); }
    @Override
    public void addInterest() {
        balance = balance + balance * 0.05;
        System.out.println("Interest added");
    }
}`,
    expectedOutput: `Savings Account S-1 balance 1000.0
Interest added
Savings Account S-1 balance 1050.0`,
    steps: [
      'a is declared as Account but refers to a Savings object, so every overridden call uses the Savings version.',
      'a.describe() runs Savings.describe, which prepends "Savings " to super.describe(). balance is a double, so it prints as 1000.0.',
      'a.addInterest() runs Savings.addInterest, not the Account version. balance becomes 1000 + 50 = 1050.0 and "Interest added" is printed.',
      'The second a.describe() reports the updated balance as 1050.0.',
    ],
    explanation:
      'The declared type of a is Account, but dynamic binding selects the Savings implementations. The message "No interest on a basic account" is never printed.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-08',
    chapter: 9,
    topic: 'toString chain with super',
    type: 'output',
    difficulty: 'hard',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q8 {
    public static void main(String[] args) {
        Student s = new Student("Maya", "CS-204");
        System.out.print(s);
        System.out.println(" | id ok");
        Person p = s;
        System.out.println(p.greeting());
    }
}
class Person {
    private final String name;
    public Person(String name) { this.name = name; }
    public String getName() { return name; }
    public String greeting() { return "I am " + name; }
    @Override
    public String toString() { return "Person(" + name + ")"; }
}
class Student extends Person {
    private final String course;
    public Student(String name, String course) {
        super(name);
        this.course = course;
    }
    @Override
    public String greeting() { return super.greeting() + ", studying " + course; }
    @Override
    public String toString() {
        return "Student<" + super.toString() + "," + course + ">";
    }
}`,
    expectedOutput: `Student<Person(Maya),CS-204> | id ok
I am Maya, studying CS-204`,
    steps: [
      'print(s) calls Student.toString, which wraps super.toString() -> "Person(Maya)" giving "Student<Person(Maya),CS-204>". print leaves the cursor on that line.',
      'The next println appends " | id ok" and ends the line.',
      'Person p = s assigns a subclass reference to a superclass variable, which is legal.',
      'p.greeting() is dispatched dynamically to Student.greeting, which calls super.greeting() -> "I am Maya" and appends ", studying CS-204".',
    ],
    explanation:
      'Changing the declared type of the variable from Student to Person does not change which greeting runs. Dynamic binding always follows the object, not the variable.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-09',
    chapter: 9,
    topic: 'private access from a subclass',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q9 {
    public static void main(String[] args) {
        Circle c = new Circle();
        c.report();
    }
}
class Shape {
    private double area = 10.0;
    public double getArea() { return area; }
}
class Circle extends Shape {
    public void report() {
        System.out.println("Area is " + area);
    }
}`,
    expectedOutput: `Compilation error`,
    steps: [
      'Circle extends Shape, so it inherits the members of Shape.',
      'However area is declared private in Shape, which means it is hidden from every subclass.',
      'Circle.report tries to use area directly by name, which the compiler rejects with: "area has private access in Shape".',
      'The program never runs, so it produces no console output at all.',
    ],
    explanation:
      "A superclass's private members are accessible only within the superclass itself. Circle would have to write getArea() instead, or Shape would have to declare area protected.",
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-10',
    chapter: 9,
    topic: 'Superclass to subclass assignment',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'inheritance',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q10 {
    public static void main(String[] args) {
        Manager m = new Employee("Zaid");
        System.out.println(m.getName());
    }
}
class Employee {
    private final String name;
    public Employee(String name) { this.name = name; }
    public String getName() { return name; }
}
class Manager extends Employee {
    public Manager(String name) { super(name); }
}`,
    expectedOutput: `Compilation error`,
    steps: [
      'new Employee("Zaid") creates a plain Employee object.',
      'The variable m is declared as Manager, a subclass of Employee.',
      'An Employee object is not a Manager, so the assignment is rejected: "incompatible types: Employee cannot be converted to Manager".',
      'The program does not compile and therefore produces no output.',
    ],
    explanation:
      'Assigning a superclass reference to a subclass variable is a compilation error. Only the opposite direction, subclass reference into superclass variable, is safe.',
    sourceType: 'current-review',
  },

  // ------------------------------------------------------ Polymorphism tracing
  {
    id: 'out-11',
    chapter: 10,
    topic: 'Polymorphic array',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'polymorphism',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q11 {
    public static void main(String[] args) {
        Animal[] zoo = { new Fish(), new Frog(), new Bird() };
        for (Animal a : zoo) {
            a.move();
        }
    }
}
class Animal {
    public void move() { System.out.println("The animal moves"); }
}
class Fish extends Animal {
    public void move() { System.out.println("The fish swims 3 feet"); }
}
class Frog extends Animal {
    public void move() { System.out.println("The frog jumps 5 feet"); }
}
class Bird extends Animal {
    public void move() { System.out.println("The bird flies 10 feet"); }
}`,
    expectedOutput: `The fish swims 3 feet
The frog jumps 5 feet
The bird flies 10 feet`,
    steps: [
      'The array is declared Animal[], so each element is accessed through a superclass variable.',
      'Each element actually refers to a Fish, a Frog and a Bird object respectively.',
      'a.move() is resolved at execution time from the type of the object, so each iteration calls a different override.',
      'The superclass message "The animal moves" is never printed, because every subclass overrides move.',
    ],
    explanation:
      'This is the standard shape of a polymorphism question: one loop, one method call, three different results. The same message produces many forms of behaviour.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-12',
    chapter: 10,
    topic: 'Abstract class with instanceof and downcast',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'polymorphism',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q12 {
    public static void main(String[] args) {
        Employee[] staff = {
            new Salaried("Noor", 3000),
            new Hourly("Omar", 20, 100)
        };
        for (Employee e : staff) {
            System.out.printf("%s earned %.1f%n", e.getName(), e.earnings());
            if (e instanceof Hourly) {
                Hourly h = (Hourly) e;
                System.out.println("  hours worked: " + h.getHours());
            }
        }
    }
}
abstract class Employee {
    private final String name;
    public Employee(String name) { this.name = name; }
    public String getName() { return name; }
    public abstract double earnings();
}
class Salaried extends Employee {
    private double salary;
    public Salaried(String name, double salary) {
        super(name);
        this.salary = salary;
    }
    public double earnings() { return salary; }
}
class Hourly extends Employee {
    private double wage;
    private int hours;
    public Hourly(String name, double wage, int hours) {
        super(name);
        this.wage = wage;
        this.hours = hours;
    }
    public int getHours() { return hours; }
    public double earnings() { return wage * hours; }
}`,
    expectedOutput: `Noor earned 3000.0
Omar earned 2000.0
  hours worked: 100`,
    steps: [
      'Employee is abstract, so no Employee object exists. The array holds one Salaried and one Hourly.',
      'For Noor, earnings() runs the Salaried version and returns 3000.0. %.1f prints it as 3000.0.',
      'The instanceof test is false for Salaried, so the hours line is skipped.',
      'For Omar, earnings() runs the Hourly version: 20 * 100 = 2000.0.',
      'The instanceof test is true, so the downcast to Hourly is performed and getHours() prints 100 after two leading spaces.',
    ],
    explanation:
      'earnings() is abstract in Employee, so each concrete subclass supplies its own. getHours exists only in Hourly, which is why instanceof and a downcast are needed before calling it.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-13',
    chapter: 10,
    topic: 'getClass().getName()',
    type: 'output',
    difficulty: 'medium',
    outputCategory: 'polymorphism',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q13 {
    public static void main(String[] args) {
        Object[] items = { new Invoice(), new Worker() };
        for (Object o : items) {
            System.out.println(o.getClass().getName());
        }
    }
}
class Invoice { }
class Worker { }`,
    expectedOutput: `Invoice
Worker`,
    steps: [
      'getClass is inherited by every object from class Object, so it can be called through an Object variable.',
      'It returns a Class object describing the actual runtime type of the object.',
      'getName on that Class object returns the class name, so the first element prints "Invoice".',
      'The second element prints "Worker". Note that neither class is in a named package, so no package prefix appears.',
    ],
    explanation:
      'Every object knows its own class. This pattern is how a polymorphic loop can report what type each element really is, even when the variable type is the general one.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-14',
    chapter: 10,
    topic: 'Method overloading',
    type: 'output',
    difficulty: 'medium',
    outputCategory: 'polymorphism',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q14 {
    public static void main(String[] args) {
        Printer p = new Printer();
        p.show(10);
        p.show(10, 20);
        System.out.println(p.show(2.5));
    }
}
class Printer {
    void show(int a) { System.out.println("int: " + a); }
    void show(int a, int b) { System.out.println("two ints: " + a + "," + b); }
    double show(double a) {
        System.out.println("double: " + a);
        return a * a;
    }
}`,
    expectedOutput: `int: 10
two ints: 10,20
double: 2.5
6.25`,
    steps: [
      'p.show(10) matches the single int parameter version.',
      'p.show(10, 20) matches the two-int version.',
      'p.show(2.5) matches the double version, which first prints "double: 2.5".',
      'That method returns 2.5 * 2.5 = 6.25, which the surrounding println then prints on its own line.',
    ],
    explanation:
      'Overloaded methods are chosen by the compiler from the argument types, which is static binding. Note that the inner println runs before the outer one, so "double: 2.5" appears before 6.25.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'out-15',
    chapter: 10,
    topic: 'Abstract superclass calling an abstract method',
    type: 'output',
    difficulty: 'hard',
    outputCategory: 'polymorphism',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q15 {
    public static void main(String[] args) {
        Report[] reports = { new SalesReport(), new StockReport() };
        for (Report r : reports) {
            r.print();
        }
    }
}
abstract class Report {
    public abstract String body();
    public void print() {
        System.out.println("--- report ---");
        System.out.println(body());
    }
}
class SalesReport extends Report {
    public String body() { return "Sales total: 4200"; }
}
class StockReport extends Report {
    public String body() { return "Items in stock: 87"; }
    public void print() {
        super.print();
        System.out.println("(stock data verified)");
    }
}`,
    expectedOutput: `--- report ---
Sales total: 4200
--- report ---
Items in stock: 87
(stock data verified)`,
    steps: [
      'SalesReport does not override print, so Report.print runs. It prints the header, then calls body(), which binds to SalesReport.body.',
      'StockReport does override print. Its version calls super.print() first, which prints the header and then calls body() -> StockReport.body.',
      'After super.print() returns, StockReport.print prints its extra line "(stock data verified)".',
    ],
    explanation:
      'An abstract superclass can call its own abstract method. The concrete implementation supplied by whichever subclass is running fills in the missing piece.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-16',
    chapter: 10,
    topic: 'Superclass reference limits',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'polymorphism',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q16 {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.eat();
        a.fetch();
    }
}
class Animal {
    public void eat() { System.out.println("eating"); }
}
class Dog extends Animal {
    public void fetch() { System.out.println("fetching"); }
}`,
    expectedOutput: `Compilation error`,
    steps: [
      'Animal a = new Dog(); is legal, because a subclass reference can be stored in a superclass variable.',
      'a.eat() is fine, because eat is declared in Animal.',
      'a.fetch() is rejected. The compiler checks method calls against the declared type of the variable, and Animal has no fetch method.',
      'The reported error is: "cannot find symbol: method fetch(), location: variable a of type Animal".',
    ],
    explanation:
      'A superclass reference can be used to invoke only methods declared in the superclass. Calling fetch would require a downcast: ((Dog) a).fetch();',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-17',
    chapter: 10,
    topic: 'Instantiating an abstract class',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'polymorphism',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q17 {
    public static void main(String[] args) {
        Shape s = new Shape();
        s.draw();
    }
}
abstract class Shape {
    public abstract void draw();
}`,
    expectedOutput: `Compilation error`,
    steps: [
      'Shape is declared abstract and has an abstract method draw with no body.',
      'new Shape() attempts to create an object of an incomplete class.',
      'The compiler rejects it with "Shape is abstract; cannot be instantiated".',
      'Nothing runs, so there is no console output.',
    ],
    explanation:
      'Attempting to instantiate an abstract class is a compilation error, not a runtime error. Declaring the variable Shape s is fine; only the new expression is illegal.',
    sourceType: 'current-review',
  },

  // --------------------------------------------------------- Interface tracing
  {
    id: 'out-18',
    chapter: 10,
    topic: 'Interface polymorphism',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'interface',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q18 {
    public static void main(String[] args) {
        Payable[] items = {
            new Invoice(3, 12.5),
            new SalariedEmployee("Hana", 2500)
        };
        double total = 0;
        for (Payable p : items) {
            System.out.println(p.getPaymentAmount());
            total += p.getPaymentAmount();
        }
        System.out.println("Total: " + total);
    }
}
interface Payable {
    double getPaymentAmount();
}
class Invoice implements Payable {
    private int quantity;
    private double price;
    public Invoice(int quantity, double price) {
        this.quantity = quantity;
        this.price = price;
    }
    public double getPaymentAmount() { return quantity * price; }
}
class SalariedEmployee implements Payable {
    private String name;
    private double salary;
    public SalariedEmployee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    public double getPaymentAmount() { return salary; }
}`,
    expectedOutput: `37.5
2500.0
Total: 2537.5`,
    steps: [
      'Invoice and SalariedEmployee are unrelated classes, but both implement Payable, so both can be stored in a Payable[] array.',
      'For the Invoice, getPaymentAmount returns 3 * 12.5 = 37.5.',
      'For the SalariedEmployee, it returns the salary 2500.0. A double always prints with a decimal part.',
      'total accumulates 37.5 + 2500.0 = 2537.5.',
    ],
    explanation:
      'This is exactly what interfaces are for: letting unrelated classes be processed polymorphically through a shared set of method signatures.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-19',
    chapter: 10,
    topic: 'Interface constants',
    type: 'output',
    difficulty: 'hard',
    outputCategory: 'interface',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q19 {
    public static void main(String[] args) {
        System.out.println(Discount.RATE);
        Store s = new Store();
        s.apply(200);
    }
}
interface Discount {
    double RATE = 0.10;
}
class Store implements Discount {
    void apply(double price) {
        System.out.println("You pay " + (price - price * RATE));
    }
}`,
    expectedOutput: `0.1
You pay 180.0`,
    steps: [
      'RATE is a field of an interface, so it is implicitly public, static and final. It can be read through the interface name: Discount.RATE.',
      'The literal 0.10 is a double whose printed form drops the trailing zero, so the first line is 0.1, not 0.10.',
      'Store implements Discount, so it can use RATE directly by name.',
      '200 - 200 * 0.10 = 200 - 20.0 = 180.0.',
    ],
    explanation:
      'Two traps. Java prints 0.10 as 0.1. And because RATE is final, a statement such as RATE = 0.2; inside Store would be a compilation error.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-20',
    chapter: 10,
    topic: 'Implementing multiple interfaces',
    type: 'output',
    difficulty: 'medium',
    outputCategory: 'interface',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q20 {
    public static void main(String[] args) {
        Robot r = new Robot();
        r.start();
        r.stop();
        Movable m = r;
        m.start();
    }
}
interface Movable {
    void start();
}
interface Stoppable {
    void stop();
}
class Robot implements Movable, Stoppable {
    public void start() { System.out.println("Robot starts moving"); }
    public void stop() { System.out.println("Robot stops"); }
}`,
    expectedOutput: `Robot starts moving
Robot stops
Robot starts moving`,
    steps: [
      'Robot implements two interfaces, listed comma-separated after implements, and must supply both methods as public.',
      'r.start() and r.stop() are ordinary calls through the Robot variable.',
      'Movable m = r; stores the Robot in a variable whose type is an interface. This is legal because Robot implements Movable.',
      'm.start() calls the Robot implementation. Note that m.stop() would not compile, because Movable does not declare stop.',
    ],
    explanation:
      'A class may implement any number of interfaces. A variable of one interface type only exposes the methods declared in that interface.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-21',
    chapter: 10,
    topic: 'Interface with ArrayList',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'interface',
    question: 'What is the exact output of the following Java program?',
    code: `import java.util.ArrayList;

public class Q21 {
    public static void main(String[] args) {
        ArrayList<Emission> list = new ArrayList<Emission>();
        list.add(new Train(50));
        list.add(new House(10));
        list.add(new Handicraft());
        for (Emission e : list) {
            System.out.println(e.label() + " -> " + e.footprint());
        }
    }
}
interface Emission {
    String label();
    double footprint();
}
class Train implements Emission {
    private int gallons;
    public Train(int gallons) { this.gallons = gallons; }
    public String label() { return "Train"; }
    public double footprint() { return gallons * 20 + 200; }
}
class House implements Emission {
    private double squareFeet;
    public House(double squareFeet) { this.squareFeet = squareFeet; }
    public String label() { return "House"; }
    public double footprint() { return squareFeet * 3234; }
}
class Handicraft implements Emission {
    public String label() { return "Handicraft"; }
    public double footprint() { return 0; }
}`,
    expectedOutput: `Train -> 1200.0
House -> 32340.0
Handicraft -> 0.0`,
    steps: [
      'ArrayList<Emission> can hold any object whose class implements Emission, so all three unrelated classes go in the same list.',
      'Train: 50 * 20 + 200 = 1000 + 200 = 1200. The return type is double, so it prints as 1200.0.',
      'House: 10 * 3234 = 32340, printed as 32340.0.',
      'Handicraft returns the int literal 0, but the declared return type is double, so it is widened and printed as 0.0.',
    ],
    explanation:
      'The declared return type controls how the value prints. Even the literal 0 comes out as 0.0 because footprint returns a double.',
    sourceType: 'historical-pattern',
  },

  // --------------------------------------------------------- Exception tracing
  {
    id: 'out-22',
    chapter: 11,
    topic: 'try / catch / finally order',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q22 {
    public static void main(String[] args) {
        System.out.println("Start");
        try {
            System.out.println("In try");
            int x = 10 / 0;
            System.out.println("Never printed " + x);
        }
        catch (ArithmeticException e) {
            System.out.println("Caught: " + e.getMessage());
        }
        finally {
            System.out.println("In finally");
        }
        System.out.println("End");
    }
}`,
    expectedOutput: `Start
In try
Caught: / by zero
In finally
End`,
    steps: [
      '"Start" prints, then control enters the try block and "In try" prints.',
      '10 / 0 throws an ArithmeticException. The try block terminates immediately, so the "Never printed" line is skipped.',
      'The catch block matches and prints "Caught: " plus the message. For integer division by zero the JVM message is exactly "/ by zero".',
      'The finally block always runs, printing "In finally".',
      'Control resumes after the whole statement and "End" prints.',
    ],
    explanation:
      'This is the termination model: the try block does not resume where the exception happened. Note the exact message text "/ by zero".',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-23',
    chapter: 11,
    topic: 'finally with return',
    type: 'output',
    difficulty: 'hard',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q23 {
    public static void main(String[] args) {
        System.out.println("Result = " + test());
    }
    static int test() {
        try {
            System.out.println("try runs");
            return 1;
        }
        finally {
            System.out.println("finally runs");
        }
    }
}`,
    expectedOutput: `try runs
finally runs
Result = 1`,
    steps: [
      'main evaluates the argument to println, which calls test().',
      'Inside test, "try runs" prints and the return value 1 is computed.',
      'Before the method actually returns, the finally block executes and prints "finally runs".',
      'test then returns 1, and main prints "Result = 1".',
    ],
    explanation:
      'A finally block runs even when the try block exits early with return or break. The only thing that skips it is System.exit. Note also that the whole "Result = ..." line prints last, because the method call is evaluated first.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-24',
    chapter: 11,
    topic: 'Multiple catch blocks',
    type: 'output',
    difficulty: 'medium',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q24 {
    public static void main(String[] args) {
        int[] numbers = { 1, 2, 3 };
        try {
            System.out.println(numbers[1]);
            System.out.println(numbers[5]);
            System.out.println("after access");
        }
        catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index problem");
        }
        catch (Exception e) {
            System.out.println("General problem");
        }
        System.out.println("Done");
    }
}`,
    expectedOutput: `2
Index problem
Done`,
    steps: [
      'numbers[1] is valid and prints 2.',
      'numbers[5] is out of range and throws ArrayIndexOutOfBoundsException, so the try block terminates and "after access" is skipped.',
      'Control transfers to the FIRST matching catch block. ArrayIndexOutOfBoundsException matches, so "Index problem" prints.',
      'The second catch block is not executed. Only one catch block ever handles a given exception.',
      'Execution resumes after the catch blocks and "Done" prints.',
    ],
    explanation:
      'Catch blocks are checked in order and only the first match runs. This is why the more specific exception type must be listed before the more general one.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-25',
    chapter: 11,
    topic: 'Multi-catch',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q25 {
    public static void main(String[] args) {
        process(0);
        process(4);
    }
    static void process(int d) {
        try {
            System.out.println("100 / " + d + " = " + (100 / d));
        }
        catch (ArithmeticException | NullPointerException e) {
            System.out.println("Cannot compute for " + d);
        }
        finally {
            System.out.println("attempt finished");
        }
    }
}`,
    expectedOutput: `Cannot compute for 0
attempt finished
100 / 4 = 25
attempt finished`,
    steps: [
      'process(0) evaluates the whole argument string before printing. 100 / 0 throws ArithmeticException, so nothing from that println reaches the screen.',
      'The multi-catch block matches ArithmeticException and prints "Cannot compute for 0".',
      'The finally block prints "attempt finished".',
      'process(4) succeeds: 100 / 4 is integer division giving 25, so the line "100 / 4 = 25" prints.',
      'The finally block prints "attempt finished" a second time.',
    ],
    explanation:
      'Two things to watch. The exception is thrown while building the argument, so no partial text appears. And 100 / 4 is int division, printing 25 rather than 25.0.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-26',
    chapter: 11,
    topic: 'Custom exception',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q26 {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(100);
        try {
            acc.withdraw(50);
            acc.withdraw(200);
        }
        catch (InsufficientBalanceException e) {
            System.out.println("Error: " + e.getMessage());
        }
        System.out.println("Balance is " + acc.getBalance());
    }
}
class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String s) {
        super(s);
    }
}
class BankAccount {
    private double balance;
    public BankAccount(double balance) { this.balance = balance; }
    public double getBalance() { return balance; }
    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(
                "amount " + amount + " exceeds balance");
        }
        balance -= amount;
        System.out.println("Withdrew " + amount);
    }
}`,
    expectedOutput: `Withdrew 50.0
Error: amount 200.0 exceeds balance
Balance is 50.0`,
    steps: [
      'The first withdraw(50) succeeds because 50 is not greater than 100. balance becomes 50 and "Withdrew 50.0" prints. The parameter is a double, so it shows as 50.0.',
      'The second withdraw(200) finds 200 > 50, so it throws the custom exception with the message "amount 200.0 exceeds balance".',
      'Because the exception is thrown, the subtraction and the "Withdrew" line for this call never execute.',
      'The catch block prints "Error: " plus getMessage(), which returns the text passed to super(s) in the custom exception constructor.',
      'balance is still 50.0 when the final line prints.',
    ],
    explanation:
      'A custom exception extends Exception and passes its message to the superclass with super(s). getMessage() then retrieves that text.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-27',
    chapter: 11,
    topic: 'Nested try and finally',
    type: 'output',
    difficulty: 'hard',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q27 {
    public static void main(String[] args) {
        try {
            System.out.println("outer try");
            try {
                System.out.println("inner try");
                throw new IllegalStateException("boom");
            }
            finally {
                System.out.println("inner finally");
            }
        }
        catch (IllegalStateException e) {
            System.out.println("outer catch: " + e.getMessage());
        }
        finally {
            System.out.println("outer finally");
        }
    }
}`,
    expectedOutput: `outer try
inner try
inner finally
outer catch: boom
outer finally`,
    steps: [
      '"outer try" and "inner try" print in order.',
      'The inner try throws IllegalStateException. The inner statement has no catch block, only a finally.',
      'Before the exception propagates outwards, the inner finally block runs and prints "inner finally".',
      'The exception then reaches the outer catch block, which matches and prints "outer catch: boom".',
      'Finally the outer finally block prints "outer finally".',
    ],
    explanation:
      'An exception that matches no catch handler in its own try statement still causes that statement\'s finally block to run before the exception moves outwards.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-28',
    chapter: 11,
    topic: 'try-with-resources',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q28 {
    public static void main(String[] args) {
        try (Resource r = new Resource("A")) {
            System.out.println("using " + r.getName());
        }
        catch (Exception e) {
            System.out.println("caught " + e.getMessage());
        }
        System.out.println("after try");
    }
}
class Resource implements AutoCloseable {
    private final String name;
    public Resource(String name) {
        this.name = name;
        System.out.println("opened " + name);
    }
    public String getName() { return name; }
    @Override
    public void close() {
        System.out.println("closed " + name);
    }
}`,
    expectedOutput: `opened A
using A
closed A
after try`,
    steps: [
      'The resource is created in the parentheses of the try statement, so the constructor runs first and prints "opened A".',
      'The try block body prints "using A".',
      'At the end of the try block the statement implicitly calls r.close(), printing "closed A". No finally block was needed.',
      'No exception was thrown, so the catch block is skipped and "after try" prints.',
    ],
    explanation:
      'try-with-resources requires the resource class to implement AutoCloseable, which supplies the close method that the statement calls automatically.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-29',
    chapter: 11,
    topic: 'throw and exception propagation',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q29 {
    public static void main(String[] args) {
        try {
            levelOne();
        }
        catch (Exception e) {
            System.out.println("main caught: " + e.getMessage());
        }
        System.out.println("main continues");
    }
    static void levelOne() throws Exception {
        System.out.println("levelOne starts");
        levelTwo();
        System.out.println("levelOne ends");
    }
    static void levelTwo() throws Exception {
        System.out.println("levelTwo starts");
        throw new Exception("failure in levelTwo");
    }
}`,
    expectedOutput: `levelOne starts
levelTwo starts
main caught: failure in levelTwo
main continues`,
    steps: [
      'main calls levelOne, which prints "levelOne starts" and calls levelTwo.',
      'levelTwo prints "levelTwo starts" and then throws an Exception.',
      'levelTwo has no try block, so it terminates immediately and the exception propagates to levelOne.',
      'levelOne also has no try block, so it terminates too. The line "levelOne ends" is never printed.',
      'The exception reaches the try block in main, where the catch block prints the message. Execution then continues normally.',
    ],
    explanation:
      'An uncaught exception propagates up the method-call stack, terminating each method on the way. Any statement after the failing call in those methods is skipped.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-30',
    chapter: 11,
    topic: 'throw with a standard exception',
    type: 'output',
    difficulty: 'medium',
    outputCategory: 'exception',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q30 {
    public static void main(String[] args) {
        System.out.println("A");
        try {
            checkAge(15);
        }
        catch (IllegalArgumentException e) {
            System.out.println("B: " + e.getMessage());
        }
        System.out.println("C");
    }
    static void checkAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("too young");
        }
        System.out.println("access granted");
    }
}`,
    expectedOutput: `A
B: too young
C`,
    steps: [
      '"A" prints.',
      'checkAge(15) finds 15 < 18 and throws an IllegalArgumentException with the message "too young".',
      'checkAge terminates at the throw, so "access granted" is never printed.',
      'The catch block in main matches and prints "B: too young".',
      'Execution continues and "C" prints.',
    ],
    explanation:
      'throw raises an exception object immediately. Any code after the throw statement in that method is unreachable for this call.',
    sourceType: 'generated-from-course-material',
  },

  // ------------------------------------------------------ File / stream tracing
  {
    id: 'out-31',
    chapter: 15,
    topic: 'PrintWriter formatting',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'file-stream',
    question:
      'The program writes to demo.txt and then reads it back. What is the exact output on the screen?',
    code: `import java.io.IOException;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.BufferedReader;
import java.io.FileReader;

public class Q31 {
    public static void main(String[] args) throws IOException {
        PrintWriter out = new PrintWriter(new FileWriter("demo.txt"));
        float x = 145.65675f;
        char[] ar = { 'A', 'B', 'C', 'D' };
        out.println("Hello World");
        out.println(x);
        out.println(true);
        out.print('A');
        out.printf("%nx=%.2f%n", x);
        out.print(ar);
        out.close();

        BufferedReader in = new BufferedReader(new FileReader("demo.txt"));
        String line;
        while ((line = in.readLine()) != null) {
            System.out.println(line);
        }
        in.close();
    }
}`,
    expectedOutput: `Hello World
145.65675
true
A
x=145.66
ABCD`,
    steps: [
      'println("Hello World") writes the text and a line separator.',
      'println(x) writes the float exactly as 145.65675.',
      'println(true) writes the boolean as the word true.',
      "print('A') writes a single A with no newline, then printf's leading %n ends that line.",
      '%.2f rounds 145.65675 to 145.66, and the trailing %n ends that line.',
      'print(ar) writes a char array as its characters, giving ABCD (not an array address).',
      'The read loop then prints each stored line, and stops when readLine returns null.',
    ],
    explanation:
      'PrintWriter has an overload of print that takes a char[] and writes the characters themselves. Note also that %.2f rounds, while println of the same float shows every digit.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-32',
    chapter: 15,
    topic: 'Reading with read() and counting characters',
    type: 'output',
    difficulty: 'exam',
    outputCategory: 'file-stream',
    question: 'What is the exact output of the following Java program?',
    code: `import java.io.*;

public class Q32 {
    public static void main(String[] args) {
        try {
            FileWriter fw = new FileWriter("counts.txt");
            fw.write("Java Is Fun");
            fw.close();

            int ch;
            int upper = 0, lower = 0;
            BufferedReader reader =
                new BufferedReader(new FileReader("counts.txt"));
            while ((ch = reader.read()) != -1) {
                char c = (char) ch;
                if (Character.isUpperCase(c)) upper++;
                if (Character.isLowerCase(c)) lower++;
            }
            reader.close();
            System.out.println("Uppercase: " + upper);
            System.out.println("Lowercase: " + lower);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}`,
    expectedOutput: `Uppercase: 3
Lowercase: 6`,
    steps: [
      'The file receives the exact text "Java Is Fun" with no newline.',
      'The read loop runs once per character and stops when read() returns -1 at end of file.',
      'Uppercase letters are J, I and F, so upper reaches 3.',
      'Lowercase letters are a, v, a, s, u and n, so lower reaches 6.',
      'The two spaces are neither uppercase nor lowercase, so they are counted in neither total.',
    ],
    explanation:
      'read() returns an int so that -1 can signal end of file, which is why the value is cast to char before being tested. The spaces are the detail most people miss when counting.',
    sourceType: 'current-review',
  },
  {
    id: 'out-33',
    chapter: 15,
    topic: 'Appending with FileWriter',
    type: 'output',
    difficulty: 'hard',
    outputCategory: 'file-stream',
    question: 'What is the exact output of the following Java program?',
    code: `import java.io.*;

public class Q33 {
    public static void main(String[] args) {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter("lines.txt"));
            bw.write("alpha\\n");
            bw.write("beta\\n");
            bw.close();

            BufferedWriter bw2 =
                new BufferedWriter(new FileWriter("lines.txt", true));
            bw2.write("gamma\\n");
            bw2.close();

            BufferedReader br = new BufferedReader(new FileReader("lines.txt"));
            String line;
            int count = 0;
            while ((line = br.readLine()) != null) {
                count++;
                System.out.println(count + ": " + line);
            }
            br.close();
        }
        catch (IOException e) {
            System.out.println("error");
        }
    }
}`,
    expectedOutput: `1: alpha
2: beta
3: gamma`,
    steps: [
      'The first BufferedWriter uses the one-argument FileWriter constructor, so it creates or replaces lines.txt and writes two lines.',
      'close() flushes the buffered text to disk. Without it, the data might never be written.',
      'The second FileWriter passes true as its second argument, so it appends rather than replacing. The file now has three lines.',
      'The read loop counts lines and prints each one prefixed with its number, stopping when readLine returns null.',
    ],
    explanation:
      'The append flag is the whole point of this question. If the second writer had used the one-argument constructor, the output would be just "1: gamma".',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'out-34',
    chapter: 15,
    topic: 'Unicode escape sequences',
    type: 'output',
    difficulty: 'medium',
    outputCategory: 'file-stream',
    question: 'What is the exact output of the following Java program?',
    code: `public class Q34 {
    public static void main(String[] args) {
        System.out.print("\\u0662");
        System.out.print("\\u0660");
        System.out.print("\\u0662");
        System.out.println("\\u0666");
    }
}`,
    expectedOutput: `٢٠٢٦`,
    steps: [
      'A Unicode escape is written \\u followed by four hexadecimal digits, and Java replaces it with the corresponding character.',
      'U+0662 is the Arabic-Indic digit two, U+0660 is zero, and U+0666 is six.',
      'The first three calls use print, so nothing separates the characters.',
      'The characters appear in the order written, giving the year 2026 in Arabic-Indic digits on one line.',
    ],
    explanation:
      'Java stores characters as 16-bit Unicode, so any character in the set can be written with a \\u escape. The console must use a font that can display the glyphs.',
    sourceType: 'generated-from-course-material',
  },
];
