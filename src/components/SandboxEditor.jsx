import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

const SandboxEditor = ({ code }) => {
  return (
    <div style={{ height: "100vh", padding: "10px", background: "#f5f5f5" }}>
      <h2>Live React Code Editor</h2>
      <Sandpack
  template="react"
  options={{
    showLineNumbers: true,
    editorHeight: 400,
    showConsole: true,
    showPreview: true,
  }}
  files={{
    "/App.jsx": {
      code: code, // <-- yehi tera AI ya user ka code aayega
      active: true,
    },
    "/index.js": {
      code: `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
      `,
    },
  }}
/>
    </div>
  );
};

export default SandboxEditor;