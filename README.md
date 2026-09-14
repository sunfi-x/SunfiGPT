# SunfiGPT — Bengali Persona Roasting AI Bot

SunfiGPT is a Gemini-styled chat web application powered by Google's latest `@google/genai` SDK and `gemini-2.5-flash`.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Express + `@google/genai` SDK
- **AI Model**: `gemini-2.5-flash`

## Local Setup

### 1. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env and put your GEMINI_API_KEY from Google AI Studio
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.
