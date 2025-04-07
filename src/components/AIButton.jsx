import React, { useState } from "react";

const sanitizeCode = (rawCode) => {
  let code = rawCode.replace(/```(jsx|javascript)?/g, "").trim();

  const usesReact = code.includes("useState") || code.includes("useEffect") || code.includes("useRef");

  if (!code.includes("import React")) {
    if (usesReact) {
      code = `import React, { useState, useEffect, useRef } from "react";\n\n${code}`;
    } else {
      code = `import React from "react";\n\n${code}`;
    }
  }

  if (!code.includes("export default")) {
    const match = code.match(/function\s+([A-Z][A-Za-z0-9]*)/);
    if (match && match[1]) {
      code += `\n\nexport default ${match[1]};`;
    } else {
      code += `\n\nexport default App;`;
    }
  }

  return code;
};

const AIButton = ({ setCode }) => {
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const fetchAISuggestion = async () => {
    if (!customPrompt.trim()) {
      alert("⚠️ Please enter a prompt!");
      return;
    }

    setLoading(true);
    try {
      const BASE_URL = window.location.origin;
      const response = await fetch(`${BASE_URL}/generate-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${customPrompt}. Only provide valid React component code. No explanations, no markdown syntax. Unique ID: ${Date.now()}`,
        }),
      });

      const data = await response.json();
      console.log("✅ AI Response:", data);
      if (data.suggestion) {
        const cleanCode = sanitizeCode(data.suggestion);
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
