import React from 'react';
import { Zap, UserCheck, Smile, BookOpen, Skull } from 'lucide-react';

export default function ModeSelector({ mode, onModeChange }) {
  const getIcon = (modeKey) => {
    switch (modeKey) {
      case 'advisor':
        return <UserCheck size={15} className="mode-icon" />;
      case 'clown':
        return <Smile size={15} className="mode-icon" />;
      case 'philosopher':
        return <BookOpen size={15} className="mode-icon" />;
      case 'villain':
        return <Skull size={15} className="mode-icon" />;
      case 'turbo':
      default:
        return <Zap size={15} className="mode-icon" />;
    }
  };

  return (
    <div className="mode-selector-inline">
      {getIcon(mode)}
      <select
        value={mode}
        onChange={(e) => onModeChange(e.target.value)}
        className="mode-select-inline"
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
