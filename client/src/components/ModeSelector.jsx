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
        <option value="turbo">Sunfi Turbo - Heavy Slang</option>
        <option value="advisor">Advisor Mode - Bhai Shun</option>
        <option value="clown">Clown Mode - Don't Take Me Seriously</option>
        <option value="philosopher">Philosopher Mode - Life Keno Erokom</option>
        <option value="villain">Villain Mode - Proceed at Your Own Risk</option>
      </select>
    </div>
  );
}
