const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'job_portal'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

// Routes

// Get all jobs
app.get('/jobs', (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new job
app.post('/jobs', (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO jobs (title, description) VALUES (?, ?)', [title, description], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, title, description });
  });
});

// Server listening
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
