const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Log to confirm the server is starting
console.log('Server is starting...');

// Middleware to parse JSON
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('Yey!! Done with week five!!!');
});

// Listen to the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



// Route to retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err.message);
      res.status(500).send('Error fetching patients');
      return;
    }
    res.json(results);  // Return the results as JSON
  });
});

// Route to retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching providers:', err.message);
      res.status(500).send('Error fetching providers');
      return;
    }
    res.json(results);  // Return the results as JSON
  });
});

// Route to retrieve patients by first name
app.get('/patients/:first_name', (req, res) => {
  const firstName = req.params.first_name;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  
  db.query(query, [firstName], (err, results) => {
    if (err) {
      console.error('Error fetching patients by first name:', err.message);
      res.status(500).send('Error fetching patients');
      return;
    }
    res.json(results);  // Return the results as JSON
  });
});

// Route to retrieve providers by specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty;
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  
  db.query(query, [specialty], (err, results) => {
    if (err) {
      console.error('Error fetching providers by specialty:', err.message);
      res.status(500).send('Error fetching providers');
      return;
    }
    res.json(results);  // Return the results as JSON
  });
});
