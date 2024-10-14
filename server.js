// File: server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'wine_spirits_cms',
  password: 'your_password',
  port: 5432,
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Wines and Spirits CMS API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Example route for products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;