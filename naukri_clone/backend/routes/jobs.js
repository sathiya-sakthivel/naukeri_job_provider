const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

// list jobs (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT jobs.*, users.name as recruiter_name FROM jobs LEFT JOIN users ON jobs.recruiter_id = users.id ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// get job by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT jobs.*, users.name as recruiter_name FROM jobs LEFT JOIN users ON jobs.recruiter_id = users.id WHERE jobs.id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Job not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// post job (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') return res.status(403).json({ message: 'Only recruiters can post jobs' });

    const { title, company, location, salary, description } = req.body;
    const [result] = await pool.query('INSERT INTO jobs (title, company, location, salary, description, recruiter_id) VALUES (?,?,?,?,?,?)', [title, company, location, salary, description, req.user.id]);
    const insertedId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [insertedId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete job (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const jobId = req.params.id;
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);
    if (!rows.length) return res.status(404).json({ message: 'Job not found' });
    const job = rows[0];
    if (job.recruiter_id !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

    await pool.query('DELETE FROM jobs WHERE id = ?', [jobId]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
