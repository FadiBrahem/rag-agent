// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const ticketRoutes = require('./routes/tickets');
const knowledgeRoutes = require('./routes/knowledge');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const server = http.createServer(app);

// Allow CORS from frontend (e.g., http://localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Replace this with your frontend URL if different
  methods: ['GET', 'POST'],
  credentials: true
}));

// JSON parsing middleware
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/feedback', feedbackRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Set up Socket.IO with CORS
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.IO events
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    socket.on('user_message', async (messageData) => {
      console.log('Received message from user:', messageData);
      try {
        const message = typeof messageData === 'string' ? messageData : messageData.content;
        
        const response = await require('./utils/agent').agentWorkflow(message, socket.id);
        console.log('Generated response:', response);
        
        socket.emit('bot_response', response);
      } catch (error) {
        console.error('Error processing user message:', error);
        socket.emit('bot_response', { text: "Sorry, I'm having trouble responding right now." });
      }
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
