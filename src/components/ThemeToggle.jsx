import React, { useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.background = darkMode ? "#fff" : "#1E1E1E";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  return (
    <button onClick={toggleTheme} style={{ padding: "10px", margin: "10px", cursor: "pointer" }}>
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
