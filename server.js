const express = require('express');
const mysql = require('mysql');
const fs = require('fs');

const app = express();

// Set up MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');

  // Execute the schema file
  const schemaFilePath = './schema.sql';
  executeSQLFile(schemaFilePath);

  // Execute the seeds file
  const seedsFilePath = './seeds.sql';
  executeSQLFile(seedsFilePath);
});

// Function to execute SQL file
function executeSQLFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading SQL file:`, err);
      return;
    }

    const sqlStatements = data.split(';').filter(statement => statement.trim() !== '');

    sqlStatements.forEach((statement) => {
      connection.query(statement, (err, results) => {
        if (err) {
          console.error(`Error executing SQL statement:`, err);
          return;
        }
        console.log(`SQL statement executed successfully`);
      });
    });
  });
}

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
