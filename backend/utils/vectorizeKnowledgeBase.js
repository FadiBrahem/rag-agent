// utils/vectorizeKnowledgeBase.js
const KnowledgeBase = require('../models/KnowledgeBase');
const embeddings = require('./embeddings');
const pineconeClient = require('./pineconeClient');

(async () => {
  const knowledgeEntries = await KnowledgeBase.find({});
  const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX);

  for (let entry of knowledgeEntries) {
    const vector = await embeddings.embedText(entry.content);
    await pineconeIndex.upsert({
      upsertRequest: {
        vectors: [
          {
            id: entry._id.toString(),
            values: vector,
            metadata: {
              title: entry.title,
              content: entry.content,
            },
          },
        ],
      },
    });
  }

  console.log('Knowledge base vectorization complete.');
})();
