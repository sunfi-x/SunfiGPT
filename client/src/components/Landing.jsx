import React from 'react';

export default function Landing({ userName, onSelectPrompt }) {
  const suggestions = [
    "Mama ajke amake ektu heavy roast koro to! 🔥",
    "Tor life er ekta deep philosophical gyan de to boss.",
    "Ajke amar porashona korar kono iccha nai, ki korbo?",
    "Ekta savage Bengali meme joke shunao mama!"
  ];

  return (
    <div className="landing-view">
      <h1 className="greeting-title">Kemon achen, {userName}?</h1>
      <p className="greeting-subtitle">
        SunfiGPT ready. Kon Mode-e roasting shuru korbe ajke?
      </p>

      <div className="suggestions-grid">
        {suggestions.map((text, idx) => (
          <div
            key={idx}
            className="suggestion-card"
            onClick={() => onSelectPrompt(text)}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
