import React from 'react';

export default function MessageBubble({ message, userName }) {
  const isUser = message.role === 'user';

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className={`avatar ${isUser ? 'user' : 'assistant'}`}>
        {isUser ? userName.charAt(0).toUpperCase() : 'S'}
      </div>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
}
