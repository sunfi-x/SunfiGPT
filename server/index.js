require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { GoogleGenAI } = require('@google/genai');
const { getSystemPrompt } = require('./prompts');

const app = express();
app.use(cors());
app.use(express.json());

// Daily rate limit per IP to control costs
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: "Mama ajker quota shesh! Kal abar kotha hobe." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/chat', limiter);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, mode, userName } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Format chat history for @google/genai SDK
    const formattedHistory = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const modelName = process.env.GEMINI_MODEL || "gemini-3.6-flash";

    const response = await ai.models.generateContent({
      model: modelName,
      contents: formattedHistory,
      config: {
        systemInstruction: getSystemPrompt(mode, userName),
        maxOutputTokens: 2048,
      }
    });

    const replyText = response.text || "Amar kichu bolar nai ekhon.";
    res.json({ reply: replyText });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Sunfi ekhon busy, ektu por try koro." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`SunfiGPT Server running on port ${PORT}`));
