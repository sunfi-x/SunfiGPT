import React, { useState, useRef, useEffect, useMemo } from 'react';
import MessageBubble from './MessageBubble';
import Landing from './Landing';
import ModeSelector from './ModeSelector';
import { Send, Home, Menu, Sun, Moon } from 'lucide-react';

export default function ChatView({
  messages,
  mode,
  onModeChange,
  userName,
  userAvatar,
  onSendMessage,
  isLoading,
  onGoHome,
  onToggleSidebar,
  theme,
  onToggleTheme,
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
    "Kotha bolo, bolte thako...",
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
        <div className="top-bar-left">
          <button className="mobile-menu-btn" onClick={onToggleSidebar} title="Open Menu">
            <Menu size={22} />
          </button>
          <div className="top-bar-brand" onClick={onGoHome} title="Return to Home">
            <img src="/sunfi.jpg" alt="Sunfi" className="top-bar-logo" />
            <span className="top-bar-title">SunfiGPT</span>
          </div>
        </div>
        <div className="top-bar-right">
          <button className="theme-icon-btn" onClick={onToggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="home-btn" onClick={onGoHome} title="Return to Home">
            <Home size={15} />
            <span>Home</span>
          </button>
        </div>
      </header>

      {messages.length === 0 ? (
        <Landing
          userName={userName}
          onSelectPrompt={(promptText) => onSendMessage(promptText)}
        />
      ) : (
        <div className="chat-container">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              userName={userName}
              userAvatar={userAvatar}
            />
          ))}
          {isLoading && (
            <div className="message-bubble assistant">
              <div className="avatar assistant">
                <img
                  src="/sunfi.jpg"
                  alt="Sunfi"
                  className="avatar-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerText = 'S';
                  }}
                />
              </div>
              <div className="message-content" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Sunfi Google na, nijer brain use kortese...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="input-container-wrapper">
        <div className="input-box-header">
          <ModeSelector mode={mode} onModeChange={onModeChange} />
        </div>
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
