const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost', // MySQL host (typically localhost)
  user: 'root',      // MySQL username
  password: '',      // MySQL password
  database: '' // Name of the database
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    process.exit();
  }
  console.log('Connected to MySQL');
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Insert form data into the database
  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      return res.status(500).send('Error saving data to database');
    }
    res.status(200).send('Message sent successfully!');
    console.log(name);
    console.log(email);
    console.log(message);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
