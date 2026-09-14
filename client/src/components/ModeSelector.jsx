import React, { useState, useRef, useEffect } from 'react';
import { Zap, ShieldCheck, Brain, Check, ChevronDown } from 'lucide-react';

export default function ModeSelector({ mode, onModeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const modes = [
    {
      id: 'turbo',
      label: 'Sunfi Turbo',
      desc: 'Heavy slang & savage banter',
      icon: <Zap size={16} style={{ color: '#818cf8' }} />
    },
    {
      id: 'advisor',
      label: 'Sunfi Advisor',
      desc: 'Brotherly advice & guidance',
      icon: <ShieldCheck size={16} style={{ color: '#34d399' }} />
    },
    {
      id: 'philosopher',
      label: 'Sunfi Philosopher',
      desc: 'Deep existential thoughts',
      icon: <Brain size={16} style={{ color: '#c084fc' }} />
    }
  ];

  const currentModeObj = modes.find((m) => m.id === mode) || modes[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-mode-dropdown-container" ref={dropdownRef}>
      <button
        type="button"
        className="mode-selector-pill"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {currentModeObj.icon}
        <span className="mode-pill-label">{currentModeObj.label}</span>
        <ChevronDown size={14} className={`chevron-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu">
          {modes.map((m) => {
            const isSelected = m.id === mode;
            return (
              <div
                key={m.id}
                className={`custom-dropdown-item ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  onModeChange(m.id);
                  setIsOpen(false);
                }}
              >
                <div className="item-icon-wrapper">{m.icon}</div>
                <div className="item-text-wrapper">
                  <div className="item-title">{m.label}</div>
                  <div className="item-desc">{m.desc}</div>
                </div>
                {isSelected && <Check size={16} className="item-check" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
