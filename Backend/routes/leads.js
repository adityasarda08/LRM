const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new lead
router.post('/', async (req, res) => {
    const { name, phone, source } = req.body;

    if (!name || !phone || !source) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newLead = await pool.query(
            'INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3) RETURNING *',
            [name, phone, source]
        );
        res.status(201).json(newLead.rows[0]);
    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all leads
router.get('/', async (req, res) => {
    try {
        const leads = await pool.query('SELECT * FROM leads ORDER BY id DESC');
        res.json(leads.rows);
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ✅ UPDATE LEAD STATUS
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await pool.query(
      'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ DELETE LEAD
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM leads WHERE id = $1', [id]);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;