// utils/generateResponse.js
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateResponse(userQuery, documents) {
  try {
    const context = documents.map(doc => doc.content).join('\n');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful customer service assistant. Use the provided context to answer questions accurately and professionally." 
        },
        { 
          role: "user", 
          content: `Context: ${context}\n\nUser question: ${userQuery}` 
        }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

module.exports = generateResponse;
