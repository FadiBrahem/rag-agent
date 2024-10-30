// routes/feedback.js
const express = require('express');
const router = express.Router();
const UserInteraction = require('../models/UserInteraction');

// Store user feedback
router.post('/', async (req, res) => {
  const { userId, message, feedback } = req.body;
  const interaction = new UserInteraction({ userId, message, feedback });
  await interaction.save();
  res.json({ message: 'Feedback received' });
});

module.exports = router;
