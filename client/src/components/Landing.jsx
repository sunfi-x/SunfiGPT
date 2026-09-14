import React, { useMemo } from 'react';
import {
  TrendingUp,
  Brain,
  HeartOff,
  GraduationCap,
  Moon,
  Compass,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function Landing({ userName, onSelectPrompt }) {
  const greetings = [
    `Ki khobor, ${userName}?`,
    `Orey bhai, ki hoise?`,
    `Bol bhai, ajke ki niye pera?`,
    `Kemon achos, legend?`,
    `Ki chai?`,
    `Abar ashchos?`,
    `Ki chai eibar?`
  ];

  const subtitles = [
    "Tor logic ekhono ready na.",
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
    {
      title: "Career Plan",
      text: "Bhai amar billionaire howar kono shortcut ache?",
      icon: <TrendingUp size={16} className="card-icon" />
    },
    {
      title: "Life Crisis",
      text: "Bhai amar life-er ki obostha ektu analyze kor.",
      icon: <Brain size={16} className="card-icon" />
    },
    {
      title: "Ex Problems",
      text: "Bhai ekta situation hoise... judge korish na.",
      icon: <HeartOff size={16} className="card-icon" />
    },
    {
      title: "Academic Crisis",
      text: "Bhai porashona korte iccha kortese na, ki kori?",
      icon: <GraduationCap size={16} className="card-icon" />
    },
    {
      title: "Late Night Thought",
      text: "Mama raat 3 ta baje ei oshobbho chinta keno ashe?",
      icon: <Moon size={16} className="card-icon" />
    },
    {
      title: "Philosophical",
      text: "Tor life-er meaning niye kichu deep kotha bol.",
      icon: <Compass size={16} className="card-icon" />
    },
    {
      title: "Emergency",
      text: "Bhai emergency, ekhon serious advice lagbe.",
      icon: <ShieldAlert size={16} className="card-icon" />
    },
    {
      title: "Random",
      text: "Ekta ajaira question ache.",
      icon: <Sparkles size={16} className="card-icon" />
    }
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
            <div className="card-category">
              {card.icon}
              <span>{card.title}</span>
            </div>
            <div className="card-text">{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
