// models/KnowledgeBase.js
const mongoose = require('mongoose');

const KnowledgeBaseSchema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model('KnowledgeBase', KnowledgeBaseSchema);
