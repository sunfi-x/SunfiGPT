import React, { useRef, useState } from 'react';
import { Plus, Trash2, Edit2, MessageSquare, Camera } from 'lucide-react';

export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  userName,
  userAvatar,
  onEditName,
  onUploadAvatar,
}) {
  const fileInputRef = useRef(null);
  const [logoImgError, setLogoImgError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUploadAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="sidebar">
      <div className="brand-header">
        <div className="brand-logo">
          {!logoImgError ? (
            <img
              src="/sunfi.png"
              alt="Sunfi"
              className="avatar-img"
              onError={() => setLogoImgError(true)}
            />
          ) : (
            'S'
          )}
        </div>
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
          <div
            className="avatar user sidebar-avatar"
            onClick={() => fileInputRef.current?.click()}
            title="Change Profile Picture"
          >
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="avatar-img" />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
            <div className="avatar-upload-overlay">
              <Camera size={12} />
            </div>
          </div>
          <span>{userName}</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button className="edit-name-btn" onClick={onEditName} title="Edit Name">
          <Edit2 size={14} />
        </button>
      </div>
    </aside>
  );
}
