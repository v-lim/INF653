// Import readline for user input/output handling
const readline = require('readline');

// Configure readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Async prompt function for user input
const prompt = (question) => new Promise((resolve) => {
    rl.question(question, resolve);
});

class EmployeeSystem {
    // Initialize employee storage array
    constructor() {
        this.employees = [];
    }

    // Add new employee with validation and error handling
    addEmployee(id, name, position, salary) {
        // CONDITIONAL STATEMENT (if-else): Input validation
        if (!id || !name || !position || !salary) {
            throw new Error("All fields are required");
        }

        // CONDITIONAL STATEMENT (if-else): Duplicate check
        if (this.employees.some(emp => emp.id === id)) {
            throw new Error("Employee ID already exists");
        }

        // Create and store new employee
        const employee = { id, name, position, salary };
        this.employees.push(employee);
        return employee;
    }

    // Display single employee with error handling
    displayEmployee(id) {
        // CONDITIONAL STATEMENT (if-else): Employee existence check
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) {
            console.log("Employee not found!");
            // JUMPING STATEMENT: Return to prevent further execution
            return;
        }

        // Format and display employee details
        console.log(`\n=== ${employee.name} (ID: ${employee.id}) ===`);
        console.log(`Position: ${employee.position}`);
        console.log(`Salary: $${employee.salary.toFixed(2)}`);
    }

    // Display all employees using higher-order function
    displayAllEmployees() {
        // CONDITIONAL STATEMENT (if-else): Empty list check
        if (this.employees.length === 0) {
            console.log("\nNo employees in the system.");
            // JUMPING STATEMENT: Return for empty list
            return;
        }

        console.log("\n=== All Employees ===");
        // LOOP (forEach): Higher-order function for iteration
        this.employees.forEach(emp => this.displayEmployee(emp.id));
    }
}

// Main program function with async/await
async function main() {
    const system = new EmployeeSystem();

    // LOOP (while): Main program loop
    while (true) {
        // Display menu options
        console.log("\n=== Employee Management System ===");
        console.log("1. Add Employee");
        console.log("2. View Employee");
        console.log("3. View All Employees");
        console.log("4. Exit");

        const choice = await prompt("Enter choice (1-4): ");

        // CONDITIONAL STATEMENT (switch): Menu option handling
        switch (choice) {
            case '1':
                // ERROR HANDLING: Try-catch block for employee addition
                try {
                    const id = parseInt(await prompt("ID: "));
                    const name = await prompt("Name: ");
                    const position = await prompt("Position: ");
                    const salary = parseFloat(await prompt("Salary: "));
                    system.addEmployee(id, name, position, salary);
                    console.log("\nEmployee added!");
                } catch (error) {
                    console.error("Error:", error.message);
                }
                // JUMPING STATEMENT: Break after case execution
                break;

            case '2':
                const id = parseInt(await prompt("Enter ID to view: "));
                system.displayEmployee(id);
                break;

            case '3':
                system.displayAllEmployees();
                break;

            case '4':
                console.log("Goodbye!");
                rl.close();
                // JUMPING STATEMENT: Return to exit program
                return;

            default:
                console.log("Invalid choice.");
        }
    }
}

// Start program with error handling
main().catch(console.error);
