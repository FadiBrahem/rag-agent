// utils/embeddings.js
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');



const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

module.exports = embeddings;
