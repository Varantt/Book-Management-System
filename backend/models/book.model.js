const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: '1234',
  database: 'assessment',
  port: 3307
});

// Open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  
  // Create books table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id INT PRIMARY KEY AUTO_INCREMENT,
      bookTitle VARCHAR(255) NOT NULL,
      bookAuthor VARCHAR(255) NOT NULL,
      noOfPages INT,
      isCheckedOut boolean,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  connection.query(createTableQuery, (err, results) => {
    if (err) throw err;
    console.log("Books table checked/created successfully");
  });
});

module.exports = connection;