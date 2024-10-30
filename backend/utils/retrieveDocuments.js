const { searchSimilarDocs } = require('./pineconeClient');

async function retrieveRelevantDocuments(query) {
  try {
    console.log('Retrieving documents for query:', query);
    const documents = await searchSimilarDocs(query);
    console.log('Retrieved documents:', documents);
    return documents.map(doc => ({
      id: doc.id,
      content: doc.content,
      score: doc.score
    }));
  } catch (error) {
    console.error('Error retrieving documents:', error);
    return []; // Return empty array on error to allow graceful fallback
  }
}

module.exports = retrieveRelevantDocuments;