
# RAG Agent Chatbot

This project is a **Retrieval-Augmented Generation (RAG) chatbot** built using **Node.js, Express, Socket.IO, MongoDB, Pinecone, and OpenAI's GPT-4**. The chatbot leverages retrieval-augmented generation to answer user queries by retrieving relevant documents from a knowledge base and generating responses grounded in that knowledge.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Overview

The **RAG Agent Chatbot** is designed for customer support, helping users by providing responses based on information stored in a knowledge base. It can also escalate to human support when necessary.

## Features
- **Real-time Chat:** Users interact with the chatbot in real time.
- **Retrieval-Augmented Generation (RAG):** Uses embeddings and a vector database to retrieve relevant documents for queries.
- **Socket.IO Support:** Enables seamless communication between the frontend and backend.
- **Support Ticketing:** Creates support tickets for unresolved queries.
- **Feedback Collection:** Allows users to provide feedback on chatbot responses.

---

## Architecture

- **Frontend:** Built with React for a user-friendly chat interface.
- **Backend:** Developed with Node.js and Express for API endpoints, with Socket.IO for real-time communication.
- **Database:** MongoDB stores knowledge base entries, user interactions, and tickets.
- **Vector Database:** Pinecone is used for storing and querying vectorized embeddings of knowledge base documents.
- **OpenAI:** GPT-4 generates responses based on the retrieved documents.

---

## Requirements

- **Node.js:** v16 or higher (v22 is not a valid version)
- **MongoDB Atlas:** A MongoDB cluster to store knowledge base and user interactions.
- **Pinecone:** A vector database account for embedding storage and querying.
- **OpenAI API Key:** Access to OpenAI’s GPT-4 model.

---

## Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/rag-agent-chatbot.git
    cd rag-agent-chatbot
    ```

2. **Install Dependencies**

    Navigate to the backend directory and install the required dependencies:

    ```bash
    cd backend
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the backend directory with the following variables:

    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
    OPENAI_API_KEY=your_openai_api_key
    PINECONE_API_KEY=your_pinecone_api_key
    PINECONE_ENVIRONMENT=your_pinecone_environment
    PINECONE_INDEX=your_pinecone_index_name
    ```

    Replace the placeholders with your actual credentials:
    - **MONGO_URI:** MongoDB connection string with username, password, and database name.
    - **OPENAI_API_KEY:** Your OpenAI API key for accessing GPT-4.
    - **PINECONE_API_KEY:** Your Pinecone API key.
    - **PINECONE_ENVIRONMENT:** Pinecone environment (e.g., `us-west1-gcp`).
    - **PINECONE_INDEX:** The name of your Pinecone index.

---

## Running the Application

1. **Start the Backend Server**

    Navigate to the backend directory and start the server:

    ```bash
    node server.js
    ```

2. **Run the Frontend (if applicable)**

    If you have a frontend directory with a React app, navigate to it and start the development server:

    ```bash
    cd frontend
    npm install
    npm start
    ```

3. **Access the Application**

    Open your browser and go to `http://localhost:3000` to interact with the chatbot.

---

## Environment Variables

| Variable            | Description                                            |
|---------------------|--------------------------------------------------------|
| `PORT`              | Port for the backend server (default: 5000)            |
| `MONGO_URI`         | MongoDB connection string                              |
| `OPENAI_API_KEY`    | API key for OpenAI GPT-4                               |
| `PINECONE_API_KEY`  | API key for Pinecone                                   |
| `PINECONE_ENVIRONMENT` | Pinecone environment (e.g., `us-west1-gcp`)        |
| `PINECONE_INDEX`    | Name of your Pinecone index                            |

---

## Troubleshooting

- **CORS Issues**

    If you encounter a Cross-Origin Request Blocked error, ensure that CORS is configured correctly in `server.js`:

    ```javascript
    app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true }));
    ```

- **MongoDB Authentication Failed**

    - Verify your MongoDB URI, username, and password.
    - URL-encode special characters in the password if necessary.
    - Ensure the MongoDB user has access to the specified database.

- **Pinecone `searchSimilarDocs` Error**

    If you see a `searchSimilarDocs is not a function` error, make sure to use the `.query` method on the Pinecone client:

    ```javascript
    const queryResponse = await pineconeIndex.query(queryRequest);
    ```

- **OpenAI Rate Limit Error**

    If you encounter a `RateLimitError` or `429 You exceeded your current quota` error:
    - Check your OpenAI account quota and billing.
    - Implement error handling to manage quota limits gracefully.

- **Check Node.js Version**

    Ensure you’re using Node.js v16 or higher. Verify your Node version by running:

    ```bash
    node -v
    ```

- **Logging for Debugging**

    Use `console.log` statements to trace issues, especially in `server.js`, `agent.js`, and `retrieveDocuments.js`.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

--- 
