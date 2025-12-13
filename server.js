const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_id TEXT UNIQUE,
    timestamp TEXT,
    name TEXT,
    ig TEXT,
    phone TEXT,
    address TEXT,
    size TEXT,
    product TEXT,
    price TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )
`).catch(() => {});

app.post('/order', async (req, res) => {
  try {
    const { name, ig, phone, address, size, product, price } = req.body;
    if (!name || !phone || !product) return res.status(400).json({ success: false });

    const orderId = 'APHELIOS-' + Date.now();

    await pool.query(
      `INSERT INTO orders (order_id, timestamp, name, ig, phone, address, size, product, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [orderId, new Date().toLocaleString('fr-MA'), name, ig || '', phone, address || '', size || '', product, price || '']
    );

    res.json({ success: true, orderId });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ success: false });
  }
});

app.get('/orders', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  res.json(rows);
});

app.listen(process.env.PORT || 3000);