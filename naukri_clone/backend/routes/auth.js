const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) return res.status(409).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)', [name, email, hashed, role || 'user']);
    const userId = result.insertId;
    const token = jwt.sign({ id: userId, email, name, role: role || 'user' }, process.env.JWT_SECRET);
    res.json({ token, user: { id: userId, name, email, role: role || 'user' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
