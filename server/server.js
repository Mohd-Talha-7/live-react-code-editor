require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const axios = require("axios");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ ERROR: Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

// 🚀 Secure command execution
app.post("/execute", (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).json({ error: "No command provided" });

  const forbiddenCommands = ["rm", "sudo", "shutdown", "reboot", "kill"];
  if (forbiddenCommands.some((cmd) => command.includes(cmd))) {
    return res.status(403).json({ error: "Forbidden command detected!" });
  }

  exec(command, { shell: true }, (error, stdout, stderr) => {
    if (error) return res.json({ output: stderr || error.message });
    res.json({ output: stdout });
  });
});

// ✅ Gemini API with Proper Formatting
app.post("/generate-code", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const aiPrompt = `${prompt}. Only provide valid React component code. No explanations, no markdown syntax.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: aiPrompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Gemini API Response:", JSON.stringify(response.data, null, 2));

    // ✅ AI se pura response extract karo
    let aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // ✅ Markdown remove karega (```jsx & ```)
    aiResponse = aiResponse.replace(/```jsx\n|```javascript\n|```/g, "").trim();

    // ✅ Agar koi explanation ho, toh sirf React code rakho
    const match = aiResponse.match(/(import\s+React[\s\S]*?;|export default[\s\S]*?})\s*$/);
    if (match) aiResponse = match[1];

    if (!aiResponse) {
      return res.status(500).json({ error: "No AI response received" });
    }

    res.json({ suggestion: aiResponse });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching AI suggestion" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
