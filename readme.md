RAG Agent Chatbot

This project is a Retrieval-Augmented Generation (RAG) chatbot built using Node.js, Express, Socket.IO, MongoDB, Pinecone, and OpenAI's GPT-4. It leverages retrieval-augmented generation to answer user queries by retrieving relevant documents from a knowledge base and generating responses grounded in that knowledge.
Table of Contents

 Project Overview
   
    
    
Features
Architecture
    Requirements
    Setup
    Environment Variables
    Running the Application
    Troubleshooting

   
Project Overview

The RAG Agent Chatbot is designed for customer support and assists users by providing responses based on the information stored in the knowledge base. It can also escalate to human support when necessary.
Features

    Real-time Chat: Users can interact with the chatbot in real time.
    Retrieval-Augmented Generation (RAG): Uses embeddings and a vector database to retrieve relevant documents for queries.
    Socket.IO Support: Enables seamless communication between frontend and backend.
    Support Ticketing: Creates support tickets for unresolved queries.
    Feedback Collection: Users can provide feedback on chatbot responses.

Architecture

    Frontend: React for the chat interface and interaction.
    Backend: Node.js and Express for API endpoints, with Socket.IO for real-time communication.
    Database: MongoDB for storing knowledge base entries, user interactions, and tickets.
    Vector Database: Pinecone for storing and querying vectorized embeddings of knowledge base documents.
    OpenAI: GPT-4 for generating responses based on retrieved documents.

Requirements

    Node.js: v16 or higher (Note: v22 is not a valid version)
    MongoDB Atlas: A MongoDB cluster to store knowledge base and user interactions.
    Pinecone: A vector database account for embedding storage and querying.
    OpenAI API Key: Access to OpenAI’s GPT-4 model.

Setup
1. Clone the Repository

bash

git clone https://github.com/your-username/rag-agent-chatbot.git
cd rag-agent-chatbot

2. Install Dependencies

Navigate to the backend directory and install the required dependencies:

bash

cd backend
npm install

3. Set Up Environment Variables

Create a .env file in the backend directory with the following variables:

env

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_pinecone_index_name

Replace the placeholders with your actual credentials:

    MONGO_URI: MongoDB connection string with username, password, and database name.
    OPENAI_API_KEY: Your OpenAI API key for accessing GPT-4.
    PINECONE_API_KEY: Your Pinecone API key.
    PINECONE_ENVIRONMENT: Pinecone environment, e.g., us-west1-gcp.
    PINECONE_INDEX: The name of your Pinecone index.

Running the Application

    Start the Backend Server

    Navigate to the backend directory and start the server:

    bash

node server.js

Run the Frontend (if applicable)

If you have a frontend directory with a React app, navigate to it and start the development server:

bash

    cd frontend
    npm install
    npm start

    Access the Application

    Open your browser and go to http://localhost:3000 to interact with the chatbot.

Environment Variables
Variable	Description
PORT	Port for the backend server (default: 5000)
MONGO_URI	MongoDB connection string
OPENAI_API_KEY	API key for OpenAI GPT-4
PINECONE_API_KEY	API key for Pinecone
PINECONE_ENVIRONMENT	Pinecone environment (e.g., us-west1-gcp)
PINECONE_INDEX	Name of your Pinecone index
Troubleshooting
1. CORS Issues

If you see a Cross-Origin Request Blocked error, ensure that CORS is correctly configured in the server.js file:

javascript

app.use(cors({
  origin: 'http://localhost:3000', // Change this to match your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));

2. MongoDB Authentication Failed

If you see a MongoDB authentication failed error:

    Double-check your MongoDB URI, username, and password.
    Ensure that special characters in the password are URL-encoded.
    Verify that the MongoDB user has access to the specified database.

3. Pinecone searchSimilarDocs Error

If you see a searchSimilarDocs is not a function error, ensure that you are calling the correct function on the Pinecone client. In most cases, you should be using the .query method on the index:

javascript

const queryResponse = await pineconeIndex.query(queryRequest);

4. OpenAI Rate Limit Error

If you encounter a RateLimitError or 429 You exceeded your current quota error:

    Check your OpenAI account quota and billing.
    Implement error handling to manage quota limits gracefully.

5. Check Node.js Version

Ensure you’re using Node.js v16 or higher, as v22 doesn’t exist. Verify your Node version by running:

bash

node -v

6. Logging for Debugging

Add console.log statements throughout the code to trace issues, especially in server.js, agent.js, and retrieveDocuments.js.
License

This project is licensed under the MIT License.
