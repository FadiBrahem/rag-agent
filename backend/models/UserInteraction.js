// models/UserInteraction.js
const mongoose = require('mongoose');

const UserInteractionSchema = new mongoose.Schema({
  userId: String,
  message: String,
  feedback: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserInteraction', UserInteractionSchema);
