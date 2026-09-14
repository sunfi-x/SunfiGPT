import React from 'react';

export default function ModeSelector({ mode, onModeChange }) {
  return (
    <div className="mode-selector-wrapper">
      <span>Mode:</span>
      <select
        value={mode}
        onChange={(e) => onModeChange(e.target.value)}
        className="mode-select"
      >
        <option value="turbo">🚀 Sunfi Turbo (Balanced Slang)</option>
        <option value="ultra">⚡ Sunfi Ultra (Heavy Slang)</option>
      </select>
    </div>
  );
}
