import type { ProgrammingQuestion } from '../../types';

/**
 * Section F - Programming / Write Code.
 *
 * Every solution in this file was compiled and executed on JDK 21, and the
 * `expectedOutput` values are the real console output of the solution shown.
 * The style stays inside what the course covers: no streams API, no lambdas,
 * no generics beyond ArrayList<T>.
 */
export const programmingQuestions: ProgrammingQuestion[] = [
  // -------------------------------------------------------------- Short coding
  {
    id: 'prog-01',
    chapter: 9,
    topic: 'Inheritance basics',
    type: 'programming',
    difficulty: 'exam',
    scale: 'short',
    question:
      'Write a piece of code that performs each of the following tasks for a class PieceWorker that inherits from class Employee.',
    requirements: [
      'a) Specify that class PieceWorker inherits from class Employee.',
      "b) Call superclass Employee's toString method from subclass PieceWorker's toString method.",
      "c) Call superclass Employee's constructor from subclass PieceWorker's constructor. Assume the superclass constructor receives three Strings: the first name, the last name and the social security number.",
    ],
    hint: 'Each part is a single line. Part (c) must be the first statement in the subclass constructor.',
    solution: `// a) specify the inheritance relationship
public class PieceWorker extends Employee {

    // c) call the superclass constructor - must be the FIRST statement
    public PieceWorker(String firstName, String lastName, String ssn) {
        super(firstName, lastName, ssn);
    }

    // b) call the superclass toString from the subclass toString
    @Override
    public String toString() {
        return "piece worker: " + super.toString();
    }
}`,
    explanation:
      'extends names the direct superclass. super(...) with arguments calls a superclass constructor and has to come first. super.toString() reaches the superclass version of an overridden method; writing toString() alone would call itself and recurse forever.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'prog-02',
    chapter: 11,
    topic: 'Assertions',
    type: 'programming',
    difficulty: 'exam',
    scale: 'short',
    question:
      'Complete the following code by adding an assert statement to ensure that the number entered by the user is divisible by 5. If this is violated, use the message "number must be divisible by 5" when an AssertionError is thrown.',
    requirements: [
      'Use the two-expression form of the assert statement.',
      'The boolean condition must test divisibility by 5.',
      'The message must be exactly "number must be divisible by 5".',
    ],
    starterCode: `Scanner input = new Scanner(System.in);
System.out.print("Enter a positive number:");
int number = input.nextInt();

// your assert statement here`,
    hint: 'The form is: assert booleanExpression : messageExpression; The remainder operator % gives 0 when a number divides evenly.',
    solution: `Scanner input = new Scanner(System.in);
System.out.print("Enter a positive number:");
int number = input.nextInt();

assert (number % 5 == 0) : "number must be divisible by 5";`,
    explanation:
      'assert evaluates the boolean expression first. If it is false, an AssertionError is thrown carrying the second expression as its message. Remember that assertions are disabled by default; run with java -ea to enable them.',
    sourceType: 'current-review',
  },
  {
    id: 'prog-03',
    chapter: 11,
    topic: 'Multi-catch',
    type: 'programming',
    difficulty: 'exam',
    scale: 'short',
    question:
      'Write a try statement that reads a denominator from a Scanner and divides 100 by it. Handle both a division by zero and a non-integer entry with one shared handler, and close the Scanner whether or not an error occurred.',
    requirements: [
      'Use a single multi-catch block for ArithmeticException and InputMismatchException.',
      'Print one shared message for either problem.',
      'Close the Scanner in a finally block.',
    ],
    hint: 'Multi-catch separates the exception types with a vertical bar, not a comma.',
    solution: `import java.util.InputMismatchException;
import java.util.Scanner;

public class DivideDemo {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        try {
            System.out.print("Enter the denominator: ");
            int denominator = input.nextInt();
            System.out.println("100 / " + denominator + " = " + (100 / denominator));
        }
        catch (ArithmeticException | InputMismatchException ex) {
            System.out.println("Zero or a non-integer was entered for the denominator.");
        }
        finally {
            input.close();
            System.out.println("Scanner closed.");
        }
    }
}`,
    expectedOutput: `Enter the denominator: Zero or a non-integer was entered for the denominator.
Scanner closed.`,
    explanation:
      'The multi-catch handles both types with one block of code. The finally block runs whether the division succeeded or an exception was thrown, so the Scanner is always closed. The output shown is for an entry of 0.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'prog-04',
    chapter: 11,
    topic: 'Custom exceptions',
    type: 'programming',
    difficulty: 'exam',
    scale: 'short',
    question:
      'Write a user-defined exception class named InsufficientAccountBalanceException that can be used with try and catch, and that carries a message describing the problem.',
    requirements: [
      'The class must work with the standard exception-handling mechanism.',
      'It must accept a message String in its constructor.',
      'getMessage() on the caught object must return that message.',
    ],
    hint: 'A new exception class must extend Exception, and its constructor should pass the message up to the superclass.',
    solution: `public class InsufficientAccountBalanceException extends Exception {
    public InsufficientAccountBalanceException(String s) {
        // Call the constructor of the superclass Exception
        super(s);
    }
}`,
    explanation:
      'Extending Exception is what makes the class usable in a throws clause and a catch block. Passing the message with super(s) is what makes getMessage() return it later.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'prog-05',
    chapter: 11,
    topic: 'try-with-resources',
    type: 'programming',
    difficulty: 'exam',
    scale: 'short',
    question:
      'Write a method readFirstLineFromFile that returns the first line of a text file. Use a try-with-resources statement so the reader is closed automatically, and return a friendly message if the file cannot be read.',
    requirements: [
      'Declare the BufferedReader inside the try-with-resources parentheses.',
      'Do not use a finally block.',
      'Catch IOException and return a message instead of crashing.',
    ],
    hint: 'The resource class must implement AutoCloseable. BufferedReader already does.',
    solution: `public static String readFirstLineFromFile(String file) {
    try (BufferedReader br = new BufferedReader(new FileReader(file))) {
        return br.readLine();
    }
    catch (IOException e) {
        return "Could not read " + file;
    }
}`,
    expectedOutput: `first line
Could not read missing.txt`,
    explanation:
      'The try-with-resources statement calls br.close() implicitly at the end of the block, even when the return statement exits early. The output shown is for one call on a real file and one call on a file that does not exist.',
    sourceType: 'generated-from-course-material',
  },

  // ------------------------------------------------------------- Medium coding
  {
    id: 'prog-06',
    chapter: 9,
    topic: 'Creating a subclass',
    type: 'programming',
    difficulty: 'exam',
    scale: 'medium',
    question:
      'Consider the class Mercedes below. Create a subclass Sportscar that inherits all its fields and methods, add a private field seatHeight with a method to set it, and write the subclass constructor.',
    requirements: [
      'a) Create a subclass Sportscar that inherits all the fields and methods of Mercedes.',
      'b) Add the private field seatHeight and a method to set it.',
      "c) Write the subclass's constructor, which must also initialise the inherited fields.",
    ],
    starterCode: `public class Mercedes {
    public int gear;
    public int speed;

    public Mercedes(int startSpeed, int startGear) {
        gear = startGear;
        speed = startSpeed;
    }
    public void setGear(int newValue) { gear = newValue; }
    public void applyBrake(int decrement) { speed -= decrement; }
    public void speedUp(int increment) { speed += increment; }
}`,
    hint: 'Mercedes has no no-argument constructor, so the subclass constructor must call super(...) explicitly as its first statement.',
    solution: `public class Sportscar extends Mercedes {
    private int seatHeight;

    public Sportscar(int startSpeed, int startGear, int seatHeight) {
        super(startSpeed, startGear);   // must be the first statement
        setSeatHeight(seatHeight);
    }

    public void setSeatHeight(int seatHeight) {
        this.seatHeight = seatHeight;
    }

    public int getSeatHeight() {
        return seatHeight;
    }

    public String describe() {
        return "speed " + speed + ", gear " + gear
             + ", seat height " + seatHeight;
    }
}

// Test:
//   Sportscar car = new Sportscar(60, 3, 45);
//   car.speedUp(20);
//   car.applyBrake(10);
//   car.setGear(4);
//   System.out.println(car.describe());`,
    expectedOutput: `speed 70, gear 4, seat height 45`,
    explanation:
      'Because seatHeight is private, the constructor uses the set method rather than assigning it directly, which keeps the validation in one place. speed and gear are public in Mercedes, so describe can read them by name.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'prog-07',
    chapter: 10,
    topic: 'Interfaces',
    type: 'programming',
    difficulty: 'exam',
    scale: 'medium',
    question: 'Create an interface Predator and perform the following tasks.',
    requirements: [
      'a) The body of the interface includes void chasePrey(Prey p) and void eatPrey(Prey p).',
      'b) Implement the interface in a class Lion.',
      'c) Include an appropriate field in the class Lion.',
      'd) If the class were abstract, would it need to implement all of its interface methods? Answer and explain.',
      'e) Write three differences between an interface and an abstract class.',
    ],
    hint: 'Interface methods are implicitly public and abstract, so the implementing class must declare each one public.',
    solution: `public interface Predator {
    void chasePrey(Prey p);
    void eatPrey(Prey p);
}

public class Lion implements Predator {
    private final String name;   // c) an appropriate field
    private final int age;

    public Lion(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public void chasePrey(Prey p) {
        System.out.println(name + " chases the " + p.getSpecies());
    }

    @Override
    public void eatPrey(Prey p) {
        System.out.println(name + " eats the " + p.getSpecies());
    }
}

/*
d) No. A concrete class must implement every interface method, but an ABSTRACT
   class does not have to. It may leave some or all of them unimplemented and
   pass the obligation on to its concrete subclasses.

e) Three differences:
   1. An interface is declared with the keyword interface and is used with
      implements; an abstract class is declared with abstract and is used
      with extends.
   2. A class can implement any number of interfaces, but can extend only
      one class.
   3. An interface contains only constants and abstract methods, while an
      abstract class can also contain instance variables and concrete
      method bodies.
*/`,
    expectedOutput: `Simba chases the Zebra
Simba eats the Zebra`,
    explanation:
      'Part (d) is a trap that some old answer keys get wrong. A class that does not implement every interface method MUST be declared abstract, which is precisely the exemption: an abstract class is allowed to leave them unimplemented. The output shown is for new Lion("Simba", 7) and a Prey whose species is "Zebra".',
    sourceType: 'historical-pattern',
  },
  {
    id: 'prog-08',
    chapter: 9,
    topic: 'Encapsulation and validation',
    type: 'programming',
    difficulty: 'medium',
    scale: 'medium',
    question:
      'Create a class Rectangle with attributes length and width, each of which defaults to 1. Provide a method that calculates the area. The set methods should verify that length and width are decimal numbers larger than 1.0 and less than 10.0.',
    requirements: [
      'Both attributes are private and default to 1.',
      'Provide a no-argument constructor and a two-argument constructor.',
      'Provide get and set methods; the set methods reject values outside the range.',
      'Provide an area method returning length * width.',
      'Create an object with length 2.5 and width 3.5 and display the area.',
    ],
    hint: 'If a value is rejected, the field simply keeps the default of 1.0. Chain the two-argument constructor to the no-argument one with this().',
    solution: `public class Rectangle {
    private double length;
    private double width;

    public Rectangle() {
        this.length = 1.0;
        this.width = 1.0;
    }

    public Rectangle(double length, double width) {
        this();                 // start from the defaults
        setLength(length);
        setWidth(width);
    }

    public double getLength() { return length; }
    public double getWidth()  { return width; }

    public void setLength(double length) {
        if (length > 1.0 && length < 10.0) {
            this.length = length;
        }
    }

    public void setWidth(double width) {
        if (width > 1.0 && width < 10.0) {
            this.width = width;
        }
    }

    public double area() {
        return length * width;
    }

    public static void main(String[] args) {
        Rectangle r = new Rectangle(2.5, 3.5);
        System.out.printf("Area = %.2f%n", r.area());

        Rectangle bad = new Rectangle(0.5, 20.0);   // both rejected
        System.out.printf("Area = %.2f%n", bad.area());
    }
}`,
    expectedOutput: `Area = 8.75
Area = 1.00`,
    explanation:
      'The second object shows why the validation matters: both arguments are out of range, so both fields keep the default 1.0 and the area is 1.00. Calling this() first guarantees the defaults are in place before validation runs.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'prog-09',
    chapter: 11,
    topic: 'Custom exceptions in a class',
    type: 'programming',
    difficulty: 'exam',
    scale: 'medium',
    question:
      'Write a BankAccount class whose withdraw method throws a user-defined InsufficientAccountBalanceException when the requested amount is greater than the balance. Write a main method that attempts two withdrawals and handles the failure.',
    requirements: [
      'Declare the custom exception class extending Exception.',
      'balance must be private, with a get method.',
      'withdraw declares the exception in its throws clause and raises it with throw.',
      'State the precondition and postcondition of withdraw in a comment before the method.',
      'main must handle the exception and keep running.',
    ],
    hint: 'throws goes in the method heading; throw creates and raises the object. Preconditions and postconditions are specified informally as comments before the method declaration.',
    solution: `public class InsufficientAccountBalanceException extends Exception {
    public InsufficientAccountBalanceException(String s) {
        super(s);
    }
}

public class BankAccount {
    private final String id;
    private double balance;

    public BankAccount(String id, double balance) {
        this.id = id;
        this.balance = balance;
    }

    public String getId()      { return id; }
    public double getBalance() { return balance; }

    // Precondition:  amount must be greater than 0 and not greater than balance.
    // Postcondition: balance is reduced by amount.
    public void withdraw(double amount)
            throws InsufficientAccountBalanceException {
        if (amount > balance) {
            throw new InsufficientAccountBalanceException(
                "amount " + amount + " is greater than the balance " + balance);
        }
        balance -= amount;
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount("ACC-1", 500);
        double[] requests = { 200, 400 };

        for (double amount : requests) {
            try {
                account.withdraw(amount);
                System.out.printf("Withdrew %.2f, balance now %.2f%n",
                    amount, account.getBalance());
            }
            catch (InsufficientAccountBalanceException e) {
                System.out.println("Rejected: " + e.getMessage());
            }
        }
    }
}`,
    expectedOutput: `Withdrew 200.00, balance now 300.00
Rejected: amount 400.0 is greater than the balance 300.0`,
    explanation:
      'The first withdrawal succeeds and reduces the balance to 300. The second asks for 400, which fails the precondition, so the exception is thrown before the subtraction happens and the balance is unchanged. Because the exception is caught, the loop continues normally.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'prog-10',
    chapter: 10,
    topic: 'Abstract classes and polymorphism',
    type: 'programming',
    difficulty: 'exam',
    scale: 'medium',
    question:
      'Create an abstract class Shape with an abstract method area(). Derive Circle and Rectangle from it, store both in a Shape array, and print each area and the total polymorphically.',
    requirements: [
      'Shape is abstract, stores a name, and declares abstract double area().',
      'Circle and Rectangle each supply their own area implementation.',
      'The subclass constructors pass the name to the superclass with super(...).',
      'main stores the objects in a Shape[] and processes them in one loop.',
    ],
    hint: 'You cannot write new Shape(...), but you can declare Shape[] and Shape variables.',
    solution: `public abstract class Shape {
    private final String name;

    public Shape(String name) { this.name = name; }
    public String getName()   { return name; }

    public abstract double area();

    @Override
    public String toString() { return name + " with area " + area(); }
}

class Circle extends Shape {
    private final double radius;

    public Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    @Override
    public double area() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    private final double length;
    private final double width;

    public Rectangle(double length, double width) {
        super("Rectangle");
        this.length = length;
        this.width = width;
    }

    @Override
    public double area() { return length * width; }
}

public class ShapeTest {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(3), new Rectangle(4, 5) };
        double total = 0;

        for (Shape s : shapes) {
            System.out.printf("%s area = %.2f%n", s.getName(), s.area());
            total += s.area();
        }
        System.out.printf("Total area = %.2f%n", total);
    }
}`,
    expectedOutput: `Circle area = 28.27
Rectangle area = 20.00
Total area = 48.27`,
    explanation:
      'area() is abstract, so Shape cannot be instantiated but can still declare the method every subclass must supply. The loop calls s.area() through a Shape variable, and dynamic binding picks the right implementation each time.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'prog-11',
    chapter: 15,
    topic: 'Reading and counting characters',
    type: 'programming',
    difficulty: 'exam',
    scale: 'medium',
    question:
      'Complete the following code segment to display how many uppercase and lowercase characters are in the input file.',
    requirements: [
      'Read the file one character at a time using BufferedReader.read().',
      'Count uppercase and lowercase letters separately.',
      'Display both counts after the loop.',
      'Handle IOException.',
    ],
    starterCode: `try {
    int ch;

    BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
    while ((ch = reader.read()) != -1) {
        char character = (char) ch;

        // your code here
    }

    // display the results here

}
catch (IOException e) {
    e.printStackTrace();
}`,
    hint: 'Character.isUpperCase and Character.isLowerCase are static methods that take the char as an argument. Declare the counters before the loop, not inside it.',
    solution: `try {
    int ch;
    int upperCount = 0, lowerCount = 0;

    BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
    while ((ch = reader.read()) != -1) {
        char character = (char) ch;

        if (Character.isUpperCase(character)) {
            upperCount++;
        }

        if (Character.isLowerCase(character)) {
            lowerCount++;
        }
    }
    reader.close();

    System.out.println("Number of uppercase letters in the file: " + upperCount);
    System.out.println("Number of lowercase letters in the file: " + lowerCount);
}
catch (IOException e) {
    e.printStackTrace();
}`,
    expectedOutput: `Number of uppercase letters in the file: 5
Number of lowercase letters in the file: 36`,
    explanation:
      'The counters must be declared before the loop, otherwise they reset on every character. read() returns an int so that -1 can mark the end of the file, which is why the value is cast to char before the tests. The output shown is for a file containing "The College of Computer Engineering and Science".',
    sourceType: 'current-review',
  },
  {
    id: 'prog-12',
    chapter: 9,
    topic: 'Full subclass with earnings',
    type: 'programming',
    difficulty: 'exam',
    scale: 'medium',
    question:
      'Write a complete class PieceWorker that extends Employee. A piece worker is paid a fixed wage for each piece produced. Override toString so it reuses the superclass version.',
    requirements: [
      'Employee holds first name, last name and social security number as private final fields with get methods.',
      'PieceWorker adds wagePerPiece and piecesProduced.',
      'PieceWorker supplies an earnings method returning wagePerPiece * piecesProduced.',
      "PieceWorker's toString calls super.toString().",
    ],
    hint: 'String.format with %n gives a platform-independent line break inside a returned String.',
    solution: `public class Employee {
    private final String firstName;
    private final String lastName;
    private final String socialSecurityNumber;

    public Employee(String firstName, String lastName, String ssn) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.socialSecurityNumber = ssn;
    }

    public String getFirstName() { return firstName; }
    public String getLastName()  { return lastName; }
    public String getSocialSecurityNumber() { return socialSecurityNumber; }

    @Override
    public String toString() {
        return String.format("%s %s%nsocial security number: %s",
            firstName, lastName, socialSecurityNumber);
    }
}

class PieceWorker extends Employee {
    private double wagePerPiece;
    private int piecesProduced;

    public PieceWorker(String firstName, String lastName, String ssn,
                       double wagePerPiece, int piecesProduced) {
        super(firstName, lastName, ssn);
        this.wagePerPiece = wagePerPiece;
        this.piecesProduced = piecesProduced;
    }

    public double earnings() { return wagePerPiece * piecesProduced; }

    @Override
    public String toString() {
        return String.format("piece worker: %s%npieces produced: %d",
            super.toString(), piecesProduced);
    }

    public static void main(String[] args) {
        PieceWorker pw = new PieceWorker("Tom", "Jarry", "101", 0.75, 200);
        System.out.println(pw);
        System.out.printf("Earnings: %.2f%n", pw.earnings());
    }
}`,
    expectedOutput: `piece worker: Tom Jarry
social security number: 101
pieces produced: 200
Earnings: 150.00`,
    explanation:
      "The superclass fields are private, so PieceWorker reaches them only through super.toString() and the inherited get methods. That is the pattern the lectures recommend over making the fields protected.",
    sourceType: 'historical-pattern',
  },

  // --------------------------------------------------------------- Full coding
  {
    id: 'prog-13',
    chapter: 10,
    topic: 'Interfaces with unrelated classes',
    type: 'programming',
    difficulty: 'exam',
    scale: 'full',
    question:
      'Create three small classes unrelated by inheritance: House, Train and Handicraft. Write an interface GreenhouseEmission with a totalFootprint method, have each class implement it, then process all three polymorphically through an ArrayList.',
    requirements: [
      'Give each class its own attributes that the others do not share.',
      'The interface declares totalFootprint() and getDescription().',
      'Train = gallons * 20 + 200. House = squareFeet * (3200 + 10 + 17 + 7). Handicraft produces no emission.',
      'Place references to objects of all three classes in an ArrayList<GreenhouseEmission>.',
      "Iterate through the list, polymorphically invoking each object's totalFootprint method, and print identifying information with the footprint.",
    ],
    hint: 'These classes are unrelated, so an interface is the right tool, not a common superclass. Do NOT make them extend ArrayList.',
    solution: `import java.util.ArrayList;

public interface GreenhouseEmission {
    double totalFootprint();
    String getDescription();
}

class House implements GreenhouseEmission {
    private final double squareFeet;

    public House(double squareFeet) { this.squareFeet = squareFeet; }

    @Override
    public double totalFootprint() {
        return squareFeet * (3200 + 10 + 17 + 7);
    }

    @Override
    public String getDescription() {
        return "House of " + squareFeet + " sq ft";
    }
}

class Train implements GreenhouseEmission {
    private final int gallons;

    public Train(int gallons) { this.gallons = gallons; }

    @Override
    public double totalFootprint() { return gallons * 20 + 200; }

    @Override
    public String getDescription() {
        return "Train burning " + gallons + " gallons";
    }
}

class Handicraft implements GreenhouseEmission {
    private final String itemName;

    public Handicraft(String itemName) { this.itemName = itemName; }

    @Override
    public double totalFootprint() { return 0; }

    @Override
    public String getDescription() { return "Handicraft: " + itemName; }
}

public class EmissionApplication {
    public static void main(String[] args) {
        ArrayList<GreenhouseEmission> items =
            new ArrayList<GreenhouseEmission>();

        items.add(new House(15));
        items.add(new Train(54));
        items.add(new Handicraft("Clay pot"));

        for (GreenhouseEmission item : items) {
            System.out.printf("%s: %.1f%n",
                item.getDescription(), item.totalFootprint());
        }
    }
}`,
    expectedOutput: `House of 15.0 sq ft: 48510.0
Train burning 54 gallons: 1280.0
Handicraft: Clay pot: 0.0`,
    explanation:
      'House, Train and Handicraft share no superclass, which is exactly the situation an interface is designed for. Note that an old answer key for this question had each class extend ArrayList, which is wrong: the classes are stored IN an ArrayList, they are not themselves lists.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'prog-14',
    chapter: 15,
    topic: 'Writing and reading a file',
    type: 'programming',
    difficulty: 'exam',
    scale: 'full',
    question: 'Write a program to perform the following tasks.',
    requirements: [
      'a) Create a file Test.txt that will hold the author name and number of copies sold.',
      'b) Handle the file while writing to it with an IOException.',
      'c) Read the author name and number of copies sold back from the file.',
      'd) Handle the file while reading with the best suited exception.',
      'e) Import the appropriate classes in the program.',
    ],
    hint: 'Store one record per line as "name,copies" and use String.split(",") when reading. Remember to close the writer, or the buffered text may never reach the disk.',
    solution: `import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class BookStore {
    public static void main(String[] args) {
        saveRecord("Ahmed Khan", 1200);
        saveRecord("Layla Nasser", 830);
        loadRecords();
    }

    public static void saveRecord(String author, int copiesSold) {
        try {
            // true = append, so the second record does not erase the first
            BufferedWriter out =
                new BufferedWriter(new FileWriter("Test.txt", true));
            out.write(author + "," + copiesSold);
            out.newLine();
            out.close();
        }
        catch (IOException e) {
            System.out.println("Error writing to the file: " + e.getMessage());
        }
    }

    public static void loadRecords() {
        try {
            BufferedReader in =
                new BufferedReader(new FileReader("Test.txt"));
            String line;
            while ((line = in.readLine()) != null) {
                String[] parts = line.split(",");
                System.out.println("Author = " + parts[0]
                    + ", copies sold = " + parts[1]);
            }
            in.close();
        }
        catch (IOException e) {
            System.out.println("Error reading the file: " + e.getMessage());
        }
    }
}`,
    expectedOutput: `Author = Ahmed Khan, copies sold = 1200
Author = Layla Nasser, copies sold = 830`,
    explanation:
      'IOException is the right choice for both parts, because FileNotFoundException is a subclass of it and is therefore covered too. The append flag matters: without it the second saveRecord call would replace the first record instead of adding to it.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'prog-15',
    chapter: 10,
    topic: 'Polymorphic payroll application',
    type: 'programming',
    difficulty: 'exam',
    scale: 'full',
    question:
      'Build the employee payroll hierarchy from the lectures. Write an abstract superclass Employee and three concrete subclasses, then process an array of Employee polymorphically.',
    requirements: [
      'Employee is abstract with private first name, last name and social security number, plus an abstract earnings method.',
      'SalariedEmployee is paid a fixed weekly salary.',
      'HourlyEmployee is paid a wage per hour, with 1.5x for hours above 40.',
      'CommissionEmployee is paid a percentage of gross sales.',
      "Each subclass overrides toString and calls super.toString().",
      'main stores one of each in an Employee[] and prints each employee and their earnings in one loop.',
    ],
    hint: 'Every concrete subclass must implement earnings, otherwise it too would have to be declared abstract.',
    solution: `public abstract class Employee {
    private final String firstName;
    private final String lastName;
    private final String ssn;

    public Employee(String firstName, String lastName, String ssn) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
    }

    public String getFirstName() { return firstName; }
    public String getLastName()  { return lastName; }
    public String getSsn()       { return ssn; }

    public abstract double earnings();

    @Override
    public String toString() {
        return String.format("%s %s%nsocial security number: %s",
            firstName, lastName, ssn);
    }
}

class SalariedEmployee extends Employee {
    private final double weeklySalary;

    public SalariedEmployee(String f, String l, String s, double weeklySalary) {
        super(f, l, s);
        this.weeklySalary = weeklySalary;
    }

    @Override
    public double earnings() { return weeklySalary; }

    @Override
    public String toString() {
        return String.format("salaried employee: %s%nweekly salary: %.2f",
            super.toString(), weeklySalary);
    }
}

class HourlyEmployee extends Employee {
    private final double wage;
    private final double hours;

    public HourlyEmployee(String f, String l, String s,
                          double wage, double hours) {
        super(f, l, s);
        this.wage = wage;
        this.hours = hours;
    }

    @Override
    public double earnings() {
        if (hours <= 40) {
            return wage * hours;
        }
        return 40 * wage + (hours - 40) * wage * 1.5;
    }

    @Override
    public String toString() {
        return String.format(
            "hourly employee: %s%nhourly wage: %.2f; hours worked: %.2f",
            super.toString(), wage, hours);
    }
}

class CommissionEmployee extends Employee {
    private final double grossSales;
    private final double commissionRate;

    public CommissionEmployee(String f, String l, String s,
                              double grossSales, double commissionRate) {
        super(f, l, s);
        this.grossSales = grossSales;
        this.commissionRate = commissionRate;
    }

    @Override
    public double earnings() { return commissionRate * grossSales; }

    @Override
    public String toString() {
        return String.format(
            "commission employee: %s%ngross sales: %.2f; rate: %.2f",
            super.toString(), grossSales, commissionRate);
    }
}

public class PayrollTest {
    public static void main(String[] args) {
        Employee[] payroll = {
            new SalariedEmployee("Sue", "Jones", "111-11-1111", 800),
            new HourlyEmployee("Karen", "Price", "222-22-2222", 16.75, 40),
            new CommissionEmployee("Bob", "Lewis", "333-33-3333", 5000, .04)
        };

        for (Employee e : payroll) {
            System.out.println(e);
            System.out.printf("earned: %.2f%n%n", e.earnings());
        }
    }
}`,
    expectedOutput: `salaried employee: Sue Jones
social security number: 111-11-1111
weekly salary: 800.00
earned: 800.00

hourly employee: Karen Price
social security number: 222-22-2222
hourly wage: 16.75; hours worked: 40.00
earned: 670.00

commission employee: Bob Lewis
social security number: 333-33-3333
gross sales: 5000.00; rate: 0.04
earned: 200.00
`,
    explanation:
      'One loop, one call to earnings, three different calculations. That is the whole point of the abstract method: the superclass declares what every employee can do, and each subclass decides how. println(e) also dispatches toString dynamically.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'prog-16',
    chapter: 15,
    topic: 'PrintWriter and record processing',
    type: 'programming',
    difficulty: 'exam',
    scale: 'full',
    question:
      'Write a program that saves student names and grades to a file with PrintWriter, then reads the file back with BufferedReader, prints each record and reports the class average. Use try-with-resources for both files.',
    requirements: [
      'Write the records with PrintWriter.printf, one per line, in the form name,grade.',
      'Use a try-with-resources statement for the writer and again for the reader.',
      'Read the file line by line, split each line on the comma, and print each record.',
      'Compute and display the average grade to two decimal places.',
      'Handle IOException for both operations.',
    ],
    hint: 'Integer.parseInt converts the grade text back to a number. Cast the total to double before dividing, otherwise you get integer division.',
    solution: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class StudentRecords {
    public static void main(String[] args) {
        String[] names  = { "Maya", "Yusuf", "Rana" };
        int[]    grades = { 88, 74, 95 };

        // Write the file. The resource is closed automatically.
        try (PrintWriter out = new PrintWriter(new FileWriter("students.txt"))) {
            for (int i = 0; i < names.length; i++) {
                out.printf("%s,%d%n", names[i], grades[i]);
            }
        }
        catch (IOException e) {
            System.out.println("Could not write the file: " + e.getMessage());
        }

        // Read it back.
        try (BufferedReader in = new BufferedReader(new FileReader("students.txt"))) {
            String line;
            int total = 0, count = 0;

            while ((line = in.readLine()) != null) {
                String[] parts = line.split(",");
                System.out.println(parts[0] + " scored " + parts[1]);
                total += Integer.parseInt(parts[1]);
                count++;
            }
            System.out.printf("Average: %.2f%n", (double) total / count);
        }
        catch (IOException e) {
            System.out.println("Could not read the file: " + e.getMessage());
        }
    }
}`,
    expectedOutput: `Maya scored 88
Yusuf scored 74
Rana scored 95
Average: 85.67`,
    explanation:
      'try-with-resources removes both finally blocks. Note the cast to double before the division: without it, 257 / 3 would be integer division giving 85 rather than 85.67.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'prog-17',
    chapter: 9,
    topic: 'Constructors, accessors and mutators',
    type: 'programming',
    difficulty: 'medium',
    scale: 'full',
    question:
      'Using the class definition for Cellphone below, implement a default and an overloaded constructor, accessors and mutators, and a toString method. Then create a subclass Appstore that adds a colour and an installed app, and displays the values of both classes in a readable format.',
    requirements: [
      'Cellphone has private fields pin and model.',
      'Provide a default constructor and an overloaded (parameterised) constructor.',
      'Provide accessors (get) and mutators (set) for every field.',
      "Provide a toString method; the subclass's toString must call super.toString().",
      'Appstore extends Cellphone and adds colour and app.',
    ],
    starterCode: `class Cellphone {
    private int pin;
    private String model;
}`,
    hint: 'A default constructor can delegate to the parameterised one with this(...). Set methods are mutators, get methods are accessors.',
    solution: `public class Cellphone {
    private int pin;
    private String model;

    public Cellphone() {                 // default constructor
        this(0, "unknown");
    }

    public Cellphone(int pin, String model) {   // overloaded constructor
        this.pin = pin;
        this.model = model;
    }

    public void setPin(int pin)         { this.pin = pin; }        // mutators
    public void setModel(String model)  { this.model = model; }

    public int getPin()      { return pin; }                       // accessors
    public String getModel() { return model; }

    @Override
    public String toString() {
        return "Pin: " + pin + ", Model: " + model;
    }
}

class Appstore extends Cellphone {
    private String color;
    private String app;

    public Appstore() {
        super();
        this.color = "unknown";
        this.app = "none";
    }

    public Appstore(int pin, String model, String color, String app) {
        super(pin, model);      // reuse the superclass initialisation
        this.color = color;
        this.app = app;
    }

    public void setColor(String color) { this.color = color; }
    public void setApp(String app)     { this.app = app; }

    public String getColor() { return color; }
    public String getApp()   { return app; }

    @Override
    public String toString() {
        return super.toString() + ", Color: " + color + ", App: " + app;
    }
}

class PhoneTest {
    public static void main(String[] args) {
        Cellphone phone = new Cellphone(1234, "Galaxy S20");
        System.out.println(phone);

        Appstore store = new Appstore(5678, "iPhone 14", "Purple", "Nebula");
        System.out.println(store);

        store.setApp("Atlas");
        System.out.println("App is now " + store.getApp());
    }
}`,
    expectedOutput: `Pin: 1234, Model: Galaxy S20
Pin: 5678, Model: iPhone 14, Color: Purple, App: Nebula
App is now Atlas`,
    explanation:
      'super(pin, model) reuses the superclass initialisation instead of duplicating it, and super.toString() reuses its String representation. That is the recommended pattern: if a method does part of what you need, call it rather than copy it.',
    sourceType: 'historical-pattern',
  },
  {
    id: 'prog-18',
    chapter: 15,
    topic: 'Creating and listing directories',
    type: 'programming',
    difficulty: 'medium',
    scale: 'full',
    question:
      'Write a program that creates a directory named TestDir, reports whether the creation succeeded, and then lists everything in the current directory.',
    requirements: [
      'Use the File class method that creates a directory.',
      'Report success or failure based on the value that method returns.',
      'Use the File class method that lists the contents of a directory.',
      'Guard against the list method returning null.',
    ],
    hint: 'mkdir() returns a boolean, so it fits straight into an if condition. list() returns a String array, or null if the File is not a directory.',
    solution: `import java.io.File;

public class DirectoryDemo {
    public static void main(String[] args) {
        String dirname = "TestDir";
        File d = new File(dirname);

        // Create the directory now.
        if (d.mkdir()) {
            System.out.println("Directory created successfully.");
        } else {
            System.out.println("Directory was not created successfully.");
        }

        // List everything in the current directory.
        File current = new File(".");
        String[] entries = current.list();

        if (entries != null) {
            for (String entry : entries) {
                System.out.println(entry);
            }
        } else {
            System.out.println("Not a directory, or the contents could not be read.");
        }
    }
}`,
    explanation:
      'mkdir() returns false if the directory already exists, so running the program twice prints the failure message the second time. list() can return null, which is why the check is needed before the loop. The listed file names depend on the folder, so this program has no fixed output.',
    sourceType: 'generated-from-course-material',
  },
  {
    id: 'prog-19',
    chapter: 11,
    topic: 'Preconditions, postconditions and assertions',
    type: 'programming',
    difficulty: 'exam',
    scale: 'full',
    question:
      'Write a method average that returns the mean of an int array. State its precondition and postcondition as comments, and enforce the precondition programmatically with assert statements. Then show what happens with and without assertions enabled.',
    requirements: [
      'State the precondition and postcondition in a comment before the method declaration.',
      'Use assert statements to enforce that the array is not null and is not empty.',
      'Each assertion must supply a message.',
      'Explain the difference between running with and without the -ea option.',
    ],
    hint: 'Preconditions and postconditions are two types of assertions. Remember that a double division by zero gives NaN rather than an exception.',
    solution: `public class Statistics {

    // Precondition:  values is not null and contains at least one element.
    // Postcondition: returns the arithmetic mean of the elements in values.
    public static double average(int[] values) {
        assert values != null : "values must not be null";
        assert values.length > 0 : "values must contain at least one element";

        int total = 0;
        for (int v : values) {
            total += v;
        }
        return (double) total / values.length;
    }

    public static void main(String[] args) {
        System.out.println(average(new int[] { 4, 8, 6 }));
        System.out.println(average(new int[] { }));   // violates the precondition
    }
}

/*
Run WITHOUT assertions (the default,  java Statistics):
    6.0
    NaN
    The empty array slips through, 0 / 0 in double arithmetic gives NaN,
    and the bug is silent.

Run WITH assertions enabled (java -ea Statistics):
    6.0
    Exception in thread "main" java.lang.AssertionError:
        values must contain at least one element
    The violated precondition is reported immediately.
*/`,
    expectedOutput: `6.0
NaN`,
    explanation:
      'This is the clearest demonstration of why assertions are a development tool. They are disabled by default because they cost performance, so the program shows NaN. Enabling them with java -ea turns the silent bug into an immediate AssertionError naming the violated precondition.',
    sourceType: 'generated-from-course-material',
  },
];
