import React from 'react';

const Message = ({ text, sender, timestamp }) => {
  return (
    <div className={`message ${sender}-message`}>
      <div className="message-content">
        <p>{text}</p>
        <span className="timestamp">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Message; 