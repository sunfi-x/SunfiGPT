import React, { useState } from 'react';

export default function MessageBubble({ message, userName, userAvatar }) {
  const isUser = message.role === 'user';
  const [imgError, setImgError] = useState(false);

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
          !imgError ? (
            <img
              src="/sunfi.jpg"
              alt="Sunfi"
              className="avatar-img"
              onError={() => setImgError(true)}
            />
          ) : (
            'S'
          )
        )}
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
}
