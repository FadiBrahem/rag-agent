// models/Ticket.js
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  userId: String,
  issue: String,
  status: { type: String, default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', TicketSchema);
