# Employee Tracker

The Employee Tracker is a command-line application that allows you to manage departments, roles, and employees in a company. It provides a user-friendly interface to perform CRUD (Create, Read, Update, Delete) operations on the database.

## Features

- View all departments, roles, and employees
- Add departments, roles, and employees
- Update an employee's role
- Delete a department, role, or employee
- Exit the application

## Technologies Used

- Node.js
- MySQL
- Inquirer.js

## Installation

1. Clone the repository:
```
git clone https://github.com/Vlad1slav86/Employee-Tracker.git
```

2. Install the dependencies:
```
npm i
```



3. Set up the database:

- Import the `schema.sql` file located in the `db` directory to create the database and tables.
- (Optional) Import the `seeds.sql` file to populate the database with sample data.

4. Configure the database connection:

- Open the `server.js` file in the root directory.
- Modify the `db` object with your MySQL database credentials (host, user, password, database).

5. Start the application:
```
npm start
```



## Usage

1. Launch the Employee Tracker application using the command `npm start`.

2. The main menu will be displayed, presenting a list of available actions.

3. Select an action by using the arrow keys and pressing Enter.

4. Follow the prompts to perform the desired operation (e.g., add an employee, view departments, update an employee's role).

5. After completing an action, the main menu will be displayed again, allowing you to choose another action or exit the application.

## Screenshots



## Contributing

Contributions are welcome! If you find any issues or want to enhance the Employee Tracker app, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).


## Contact

If you have any questions or suggestions, please feel free to contact [Your Name] at [vladkb@yahoo.com].
