// routes/tickets.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create new ticket
router.post('/', async (req, res) => {
  const { userId, issue } = req.body;
  const ticket = new Ticket({ userId, issue });
  await ticket.save();
  res.json({ ticketId: ticket._id });
});

// Get ticket status
router.get('/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    res.json({ status: ticket.status });
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
});

module.exports = router;
