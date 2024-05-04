const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Database connection configuration
const client = new Client({
  user: "postgres",
  host: 'localhost',
  database: "Form_Data_Portfolio",
  password: "12345",
  port: 5432, // PostgreSQL default port
});
client.connect();

// Route to handle form submissions
app.post('/', (req, res) => {
  const { fullname, email, message } = req.body;

  // Example SQL query to insert data into a table
  const query = `
    INSERT INTO your_table (fullname, email, message)
    VALUES ($1, $2, $3)
  `;
  const values = [fullname, email, message];

  client.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error updating data');
    } else {
      console.log('Data updated successfully');
      res.status(200).send('Data updated successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
