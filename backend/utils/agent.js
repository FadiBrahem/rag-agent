// utils/agent.js
const detectIntent = require('./detectIntent');
const retrieveRelevantDocuments = require('./retrieveDocuments');
const generateResponse = require('./generateResponse');
const Ticket = require('../models/Ticket');

async function agentWorkflow(userQuery, userId) {
  console.log('agentWorkflow called with message:', userQuery);
  
  try {
    const intent = await detectIntent(userQuery);
    console.log('Detected intent:', intent);

    if (intent === 'password_reset') {
      return { text: 'To reset your password, please click on "Forgot Password" on the login page.' };
    } else if (intent === 'escalate') {
      const ticket = new Ticket({ userId, issue: userQuery });
      await ticket.save();
      return { text: `Your issue has been escalated. Ticket ID: ${ticket._id}`, ticketId: ticket._id };
    } else {
      // General query flow
      const documents = await retrieveRelevantDocuments(userQuery);
      console.log('Retrieved documents:', documents);
      
      const responseText = await generateResponse(userQuery, documents);
      console.log('Generated response:', responseText);
      
      return { text: responseText };
    }
  } catch (error) {
    console.error('Error in agentWorkflow:', error);
    return { text: "I'm sorry, I encountered an error while processing your request." };
  }
}

module.exports = { agentWorkflow };
