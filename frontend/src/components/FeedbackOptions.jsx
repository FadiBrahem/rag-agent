import React from 'react';

const FeedbackOptions = ({ onFeedback }) => {
  return (
    <div className="feedback-options">
      <p>Was this helpful?</p>
      <div className="feedback-buttons">
        <button onClick={() => onFeedback('positive')}>
          👍 Yes
        </button>
        <button onClick={() => onFeedback('negative')}>
          👎 No
        </button>
        <button onClick={() => onFeedback('escalate')} className="escalate-btn">
          ⚡ Escalate to Human
        </button>
      </div>
    </div>
  );
};

export default FeedbackOptions; 