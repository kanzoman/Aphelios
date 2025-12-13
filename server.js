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

// Database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Only create table if not exists (safe for production)
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

// POST /order
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
    // Auto WhatsApp alert
const customerPhone = req.body.phone?.replace(/[^0-9]/g, '') || 'unknown';
const msg = encodeURIComponent(
  `New APHELIOS order!\n` +
  `ID: ${orderId}\n` +
  `Name: ${req.body.name}\n` +
  `IG: ${req.body.ig || 'none'}\n` +
  `Phone: ${req.body.phone}\n` +
  `Address: ${req.body.address || 'none'}\n` +
  `Size: ${req.body.size || 'none'}\n` +
  `Product: ${req.body.product}\n` +
  `Price: ${req.body.price || 'none'}`
);

// Replace 212YOURPHONE with your number (e.g. 212600000000)
const yourPhone = '212656660174';

fetch(`https://api.whatsapp.com/send?phone=${yourPhone}&text=${msg}`);
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ success: false });
  }
});

// GET /orders
app.get('/orders', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.json([]);
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));