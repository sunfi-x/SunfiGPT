import React from 'react';

export default function MessageBubble({ message, userName, userAvatar }) {
  const isUser = message.role === 'user';

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className={`avatar ${isUser ? 'user' : 'assistant'}`}>
        {isUser ? (
          userAvatar ? (
            <img src={userAvatar} alt={userName} className="avatar-img" />
          ) : (
            userName.charAt(0).toUpperCase()
          )
        ) : (
          'S'
        )}
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
}
