// routes/chat.js
const express = require('express');
const router = express.Router();
const agentWorkflow = require('../utils/agent').agentWorkflow;

router.post('/', async (req, res) => {
  const userQuery = req.body.query;
  const response = await agentWorkflow(userQuery, req.body.userId);
  res.json({ response });
});

module.exports = router;
