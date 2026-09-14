import React, { useState } from 'react';

export default function NameModal({ onSubmit, initialName = '' }) {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Welcome to SunfiGPT</h2>
        <p>Aage bol tor naam ki? Personalization naki khepabar jonno lagbe!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name-input"
            placeholder="Tor naam ekhane likh..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <button type="submit" className="submit-btn">
            Let's Go
          </button>
        </form>
      </div>
    </div>
  );
}
