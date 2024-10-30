// routes/knowledge.js
const express = require('express');
const router = express.Router();
const KnowledgeBase = require('../models/KnowledgeBase');

// Add new knowledge entry
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const entry = new KnowledgeBase({ title, content });
  await entry.save();
  res.json({ message: 'Knowledge entry added' });
});

// Update knowledge entry
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  await KnowledgeBase.findByIdAndUpdate(req.params.id, { title, content });
  res.json({ message: 'Knowledge entry updated' });
});

// Delete knowledge entry
router.delete('/:id', async (req, res) => {
  await KnowledgeBase.findByIdAndDelete(req.params.id);
  res.json({ message: 'Knowledge entry deleted' });
});

module.exports = router;
