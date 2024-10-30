import React, { useState, useEffect } from 'react';
import socket from '../socket';
import MessageInput from './MessageInput';
import Message from './Message';
import FeedbackOptions from './FeedbackOptions';
import TicketStatus from './TicketStatus';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [ticketStatus, setTicketStatus] = useState('open');
  const [ticketId, setTicketId] = useState(null);

  useEffect(() => {
    socket.on('bot_response', (response) => {
      setMessages(prevMessages => [...prevMessages, 
        { text: response.text, sender: 'bot', timestamp: new Date() }
      ]);
      if (response.ticketId) {
        setTicketId(response.ticketId);
      }
    });

    return () => {
      socket.off('bot_response');
    };
  }, []);

  const handleSendMessage = (message) => {
    socket.emit('user_message', message);
    setMessages(prevMessages => [...prevMessages, 
      { text: message, sender: 'user', timestamp: new Date() }
    ]);
  };

  const handleFeedback = (feedbackType) => {
    const lastBotMessage = messages.filter(msg => msg.sender === 'bot').slice(-1)[0];
    if (lastBotMessage) {
      socket.emit('user_feedback', {
        message: lastBotMessage.text,
        feedback: feedbackType,
        ticketId
      });
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Customer Support Chat</h2>
        {ticketId && <TicketStatus status={ticketStatus} ticketId={ticketId} />}
      </div>
      
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </div>

      <FeedbackOptions onFeedback={handleFeedback} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
