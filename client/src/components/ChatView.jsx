import React, { useState, useRef, useEffect, useMemo } from 'react';
import MessageBubble from './MessageBubble';
import Landing from './Landing';
import ModeSelector from './ModeSelector';
import { Send } from 'lucide-react';

export default function ChatView({
  messages,
  mode,
  onModeChange,
  userName,
  onSendMessage,
  isLoading,
}) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const placeholders = [
    "Sunfi ke moner kotha bol...",
    "Ja bolar bolo bhai...",
    "Type kor, judge korbo na...",
    "Ki hoise?",
    "Bolo, ami shuntesi...",
    "Ajke ki pera?",
    "Kotha bolo, AI chup kore ache...",
    "Enter your nonsense..."
  ];

  const placeholderText = useMemo(() => {
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="main-content">
      <header className="top-bar">
        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#e2e8f0' }}>
          SunfiGPT
        </div>
        <ModeSelector mode={mode} onModeChange={onModeChange} />
      </header>

      {messages.length === 0 ? (
        <Landing
          userName={userName}
          onSelectPrompt={(promptText) => onSendMessage(promptText)}
        />
      ) : (
        <div className="chat-container">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} userName={userName} />
          ))}
          {isLoading && (
            <div className="message-bubble assistant">
              <div className="avatar assistant">S</div>
              <div className="message-content" style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                Sunfi typewriter er shob key khujtese...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="input-container-wrapper">
        <form onSubmit={handleSubmit} className="input-container">
          <textarea
            className="chat-input"
            placeholder={placeholderText}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="send-btn"
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
