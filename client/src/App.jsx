import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import NameModal from './components/NameModal';
import './styles.css';

export default function App() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('sunfi_username') || '';
  });

  const [showNameModal, setShowNameModal] = useState(false);

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('sunfi_sessions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [{ id: 'session-1', title: 'New Chat', messages: [] }];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    return sessions[0]?.id || 'session-1';
  });

  const [mode, setMode] = useState('turbo');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userName) {
      setShowNameModal(true);
    }
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('sunfi_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const handleSaveName = (name) => {
    setUserName(name);
    localStorage.setItem('sunfi_username', name);
    setShowNameModal(false);
  };

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newSession = { id: newId, title: 'New Chat', messages: [] };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
  };

  const handleDeleteSession = (id) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    if (activeSessionId === id && updated.length > 0) {
      setActiveSessionId(updated[0].id);
    }
  };

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
    <div className="app-container">
      {showNameModal && (
        <NameModal onSubmit={handleSaveName} initialName={userName} />
      )}

      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        userName={userName || 'Bondhu'}
        onEditName={() => setShowNameModal(true)}
      />

      <ChatView
        messages={activeSession ? activeSession.messages : []}
        mode={mode}
        onModeChange={setMode}
        userName={userName || 'Bondhu'}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
