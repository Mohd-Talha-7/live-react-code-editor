import React, { useState } from "react";
import SandboxEditor from "./components/SandboxEditor";
import TerminalComponent from "./components/Terminal";
import AIButton from "./components/AIButton";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  const [code, setCode] = useState(`export default function App() {
  return <h1>Hello World!</h1>;
}`); // ✅ Default React code

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>React Code Editor</h1>
      <ThemeToggle />
      <SandboxEditor code={code} setCode={setCode} /> {/* ✅ Pass setCode */}
      <TerminalComponent />
      <AIButton setCode={setCode} /> {/* ✅ Pass setCode to AIButton */}
    </div>
  );
};

export default App;
