const { GoogleGenAI } = require('@google/genai');
const { getSystemPrompt } = require('../server/prompts');

module.exports = async function handler(req, res) {
  // CORS headers for Vercel serverless
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY environment variable is missing on Vercel." });
    }

    const { messages, mode, userName } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const formattedHistory = messages.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const modelName = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: formattedHistory,
      config: {
        systemInstruction: getSystemPrompt(mode, userName),
        maxOutputTokens: 2048,
      }
    });

    const replyText = response.text || "Amar kichu bolar nai ekhon.";
    return res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error("Gemini API Vercel Error:", err);
    return res.status(500).json({
      error: "Sunfi ekhon busy, ektu por try koro.",
      details: err.message || String(err)
    });
  }
};
