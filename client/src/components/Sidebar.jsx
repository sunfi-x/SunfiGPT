import React from 'react';
import { Plus, Trash2, Edit2, MessageSquare } from 'lucide-react';

export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  userName,
  onEditName,
}) {
  return (
    <aside className="sidebar">
      <div className="brand-header">
        <div className="brand-logo">S</div>
        <h1 className="brand-title">SunfiGPT</h1>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <Plus size={18} />
        <span>New Chat</span>
      </button>

      <div className="sessions-list">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`session-item ${session.id === activeSessionId ? 'active' : ''}`}
            onClick={() => onSelectSession(session.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
              <MessageSquare size={16} />
              <span className="session-title">{session.title || 'New Chat'}</span>
            </div>
            {sessions.length > 1 && (
              <button
                className="delete-session-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                title="Delete session"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="user-profile">
        <div className="user-info">
          <span>👋 {userName}</span>
        </div>
        <button className="edit-name-btn" onClick={onEditName} title="Edit Name">
          <Edit2 size={14} />
        </button>
      </div>
    </aside>
  );
}
