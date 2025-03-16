import React, { useState } from "react";

const AIButton = ({ setCode }) => {
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(""); // ✅ User ke prompt ke liye state

  const fetchAISuggestion = async () => {
    if (!customPrompt.trim()) {
      alert("⚠️ Please enter a prompt!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${customPrompt}. Only provide valid React component code. No explanations, no markdown syntax. Unique ID: ${Date.now()}`
        }),
      });

      const data = await response.json();
      console.log("✅ AI Response:", data);
      if (data.suggestion) {
        let cleanCode = data.suggestion.replace(/```jsx|```javascript|```/g, "").trim();
        setCode(cleanCode);
      }
    } catch (error) {
      console.error("AI Suggestion Error:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <textarea
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder="Enter your custom AI prompt..."
        rows={3}
        style={{
          width: "80%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />
      <br />
      <button
        onClick={fetchAISuggestion}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Generating..." : "Generate Code"}
      </button>
    </div>
  );
};

export default AIButton;
