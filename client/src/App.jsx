import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import NameModal from './components/NameModal';
import './styles.css';

const getUserKey = (name) => {
  if (!name || !name.trim()) return 'guest';
  return name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
};

const getStoredSessionsForUser = (name) => {
  if (!name) return [{ id: `session-${Date.now()}`, title: 'New Chat', messages: [] }];
  const key = getUserKey(name);
  const userSaved = localStorage.getItem(`sunfi_sessions_${key}`);
  if (userSaved) {
    try {
      const parsed = JSON.parse(userSaved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  // Fallback to legacy global sessions if available for initial migration
  const legacySaved = localStorage.getItem('sunfi_sessions');
  if (legacySaved) {
    try {
      const parsed = JSON.parse(legacySaved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  return [{ id: `session-${Date.now()}`, title: 'New Chat', messages: [] }];
};

const getStoredAvatarForUser = (name) => {
  if (!name) return '';
  const key = getUserKey(name);
  return localStorage.getItem(`sunfi_avatar_${key}`) || localStorage.getItem('sunfi_user_avatar') || '';
};

export default function App() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('sunfi_username') || '';
  });

  const [userAvatar, setUserAvatar] = useState(() => {
    return getStoredAvatarForUser(localStorage.getItem('sunfi_username') || '');
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sunfi_theme') || 'dark';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  const [sessions, setSessions] = useState(() => {
    return getStoredSessionsForUser(localStorage.getItem('sunfi_username') || '');
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    return sessions[0]?.id || `session-${Date.now()}`;
  });

  const [mode, setMode] = useState('turbo');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userName) {
      setShowNameModal(true);
    }
  }, [userName]);

  // Reload sessions & avatar whenever userName changes
  useEffect(() => {
    if (userName) {
      const userSessions = getStoredSessionsForUser(userName);
      setSessions(userSessions);
      setActiveSessionId(userSessions[0]?.id || `session-${Date.now()}`);
      setUserAvatar(getStoredAvatarForUser(userName));
    }
  }, [userName]);

  // Persist sessions per user
  useEffect(() => {
    if (userName) {
      const key = getUserKey(userName);
      localStorage.setItem(`sunfi_sessions_${key}`, JSON.stringify(sessions));
    }
  }, [sessions, userName]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sunfi_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSaveName = (name) => {
    setUserName(name);
    localStorage.setItem('sunfi_username', name);
    setShowNameModal(false);
  };

  const handleUploadAvatar = (base64Image) => {
    setUserAvatar(base64Image);
    if (userName) {
      const key = getUserKey(userName);
      localStorage.setItem(`sunfi_avatar_${key}`, base64Image);
    }
  };

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newSession = { id: newId, title: 'New Chat', messages: [] };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setIsSidebarOpen(false);
  };

  const handleSelectSession = (id) => {
    setActiveSessionId(id);
    setIsSidebarOpen(false);
  };

  const handleGoHome = () => {
    setIsSidebarOpen(false);
    const active = sessions.find((s) => s.id === activeSessionId);
    if (active && active.messages.length === 0) {
      return;
    }
    handleNewChat();
  };

  const handleDeleteSession = (id) => {
    const updated = sessions.filter((s) => s.id !== id);
    if (updated.length === 0) {
      const freshSession = { id: `session-${Date.now()}`, title: 'New Chat', messages: [] };
      setSessions([freshSession]);
      setActiveSessionId(freshSession.id);
    } else {
      setSessions(updated);
      if (activeSessionId === id) {
        setActiveSessionId(updated[0].id);
      }
    }
  };

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...(activeSession.messages || []), userMessage];

    // Auto update title if first message
    let sessionTitle = activeSession.title;
    if (activeSession.messages.length === 0) {
      sessionTitle = text.slice(0, 24) + (text.length > 24 ? '...' : '');
    }

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, title: sessionTitle, messages: updatedMessages }
          : s
      )
    );

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          mode: mode,
          userName: userName || 'bondhu',
        }),
      });

      const data = await response.json();

      const botReplyText = data.reply || data.error || 'Mama network e jhamela holo!';
      const botMessage = { role: 'assistant', content: botReplyText };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...updatedMessages, botMessage] }
            : s
        )
      );
    } catch (err) {
      console.error(err);
      const errorMessage = {
        role: 'assistant',
        content: 'Sunfi ekhon busy, ektu por try koro.',
      };
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...updatedMessages, errorMessage] }
            : s
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container" data-theme={theme}>
      {showNameModal && (
        <NameModal onSubmit={handleSaveName} initialName={userName} />
      )}

      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        userName={userName || 'Bondhu'}
        userAvatar={userAvatar}
        onEditName={() => setShowNameModal(true)}
        onUploadAvatar={handleUploadAvatar}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onGoHome={handleGoHome}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <ChatView
        messages={activeSession ? activeSession.messages : []}
        mode={mode}
        onModeChange={setMode}
        userName={userName || 'Bondhu'}
        userAvatar={userAvatar}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onGoHome={handleGoHome}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
    </div>
  );
}
