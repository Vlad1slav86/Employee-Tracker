const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_tracker',
});

// Function to display the main menu
function displayMenu() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;

        case 'View all roles':
          viewRoles();
          break;

        case 'View all employees':
          viewEmployees();
          break;

        case 'Add a department':
          addDepartment();
          break;

        case 'Add a role':
          addRole();
          break;

        case 'Add an employee':
          addEmployee();
          break;

        case 'Update an employee role':
          updateEmployeeRole();
          break;

        case 'Exit':
          db.end();
          return;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
      displayMenu();
    }
  });
}

// Function to view all roles
function viewRoles() {
  db.query(
    'SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id',
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        displayMenu();
      }
    }
  );
}

// Function to view all employees
function viewEmployees() {
  db.query(
    'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees managers ON employees.manager_id = managers.id',
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        displayMenu();
      }
    }
  );
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      db.query(
        'INSERT INTO departments (name) VALUES (?)',
        [answer.name],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Department added successfully!');
            displayMenu();
          }
        }
      );
    });
}

// Function to add a role
function addRole() {
  // First, retrieve the list of departments for the prompt choices
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) {
      console.error(err);
    } else {
      inquirer
        .prompt([
          {
            name: 'title',
            type: 'input',
            message: 'Enter the name of the role:',
          },
          {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:',
          },
          {
            name: 'department',
            type: 'list',
            message: 'Select the department for the role:',
            choices: departments.map((department) => department.name),
          },
        ])
        .then((answers) => {
          // Find the department ID based on the selected department name
          const departmentId = departments.find(
            (department) => department.name === answers.department
          ).id;

          // Insert the new role into the database
          db.query(
            'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
            [answers.title, answers.salary, departmentId],
            (err, results) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Role added successfully!');
                displayMenu();
              }
            }
          );
        });
    }
  });
}

function addEmployee() {
  // Retrieve the list of roles for the prompt choices
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) {
      console.error(err);
      displayMenu();
    } else {
      // Retrieve the list of existing managers for the prompt choices
      db.query('SELECT * FROM employees', (err, managers) => {
        if (err) {
          console.error(err);
          displayMenu();
        } else {
          inquirer
            .prompt([
              {
                name: 'first_name',
                type: 'input',
                message: 'Enter the employee\'s first name:',
              },
              {
                name: 'last_name',
                type: 'input',
                message: 'Enter the employee\'s last name:',
              },
              {
                name: 'role',
                type: 'list',
                message: 'Select the employee\'s role:',
                choices: roles.map((role) => role.title),
              },
              {
                name: 'manager',
                type: 'list',
                message: 'Select the employee\'s manager:',
                choices: managers.map((manager) => `${manager.first_name} ${manager.last_name}`),
              },
            ])
            .then((answer) => {
              // Find the role ID based on the selected role title
              const roleId = roles.find((role) => role.title === answer.role).id;
              
              // Find the manager ID based on the selected manager's full name
              const managerId = managers.find((manager) => `${manager.first_name} ${manager.last_name}` === answer.manager).id;

              // Insert the new employee into the database
              db.query(
                'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [answer.first_name, answer.last_name, roleId, managerId],
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Employee added successfully!');
                  }
                  displayMenu();
                }
              );
            });
        }
      });
    }
  });
}

function updateEmployeeRole() {
  // Retrieve the list of employees for the prompt choices
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) {
      console.error(err);
      displayMenu();
    } else {
      // Retrieve the list of roles for the prompt choices
      db.query('SELECT * FROM roles', (err, roles) => {
        if (err) {
          console.error(err);
          displayMenu();
        } else {
          inquirer
            .prompt([
              {
                name: 'employee',
                type: 'list',
                message: 'Select the employee to update:',
                choices: employees.map(
                  (employee) =>
                    `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`
                ),
              },
              {
                name: 'role',
                type: 'list',
                message: 'Select the new role for the employee:',
                choices: roles.map((role) => role.title),
              },
            ])
            .then((answers) => {
              // Extract the employee ID from the selected employee string
              const employeeId = answers.employee.match(/\d+/)[0];

              // Find the role ID based on the selected role title
              const roleId = roles.find((role) => role.title === answers.role).id;

              // Update the employee's role in the database
              db.query(
                'UPDATE employees SET role_id = ? WHERE id = ?',
                [roleId, employeeId],
                (err, results) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Employee role updated successfully!');
                  }
                  displayMenu();
                }
              );
            });
        }
      });
    }
  });
}


// Connect to the database and start the application
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
  displayMenu();
});






