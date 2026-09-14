import React, { useMemo } from 'react';

export default function Landing({ userName, onSelectPrompt }) {
  const greetings = [
    `Ki khobor, ${userName}?`,
    `Orey bhai, abar ki hoise?`,
    `Bol bhai, ajke ki niye pera?`,
    `Kemon achos, legend?`,
    `Welcome back, unemployed philosopher.`,
    `Abar ashchos?`,
    `Ki chai eibar?`
  ];

  const subtitles = [
    "AI ready. Tor logic ekhono ready na.",
    "Bol bhai, moner kotha ber kor.",
    "Serious question korle serious answer pabi... probably.",
    "Tor problem amar problem na, but bol."
  ];

  const selectedGreeting = useMemo(() => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }, [userName]);

  const selectedSubtitle = useMemo(() => {
    return subtitles[Math.floor(Math.random() * subtitles.length)];
  }, []);

  const suggestionCards = [
    { title: "Roast Me", text: "Mama ajke amake ektu heavy roast koro to!" },
    { title: "Life Crisis", text: "Bhai amar life-er ki obostha ektu analyze kor." },
    { title: "Ex Problems", text: "Bhai ekta situation hoise... judge korish na." },
    { title: "Academic Crisis", text: "Bhai porashona korte iccha kortese na, ki kori?" },
    { title: "Friend Group", text: "Amader group-er moddhe ashol clown ke?" },
    { title: "Philosophical", text: "Tor life-er meaning niye kichu deep kotha bol." },
    { title: "Emergency", text: "Bhai emergency, ekhon serious advice lagbe." },
    { title: "Random", text: "Ekta ajaira question ache." }
  ];

  return (
    <div className="landing-view">
      <h1 className="greeting-title">{selectedGreeting}</h1>
      <p className="greeting-subtitle">{selectedSubtitle}</p>

      <div className="suggestions-grid">
        {suggestionCards.map((card, idx) => (
          <div
            key={idx}
            className="suggestion-card"
            onClick={() => onSelectPrompt(card.text)}
          >
            <div className="card-category">{card.title}</div>
            <div className="card-text">{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
