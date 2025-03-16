import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

const SandboxEditor = ({ code }) => {
  return (
    <div style={{ height: "100vh", padding: "10px", background: "#f5f5f5" }}>
      <h2>Live React Code Editor</h2>
      <Sandpack
  template="react"
  theme="light"
  customSetup={{
    dependencies: {
      "@mui/material": "latest",
      "@emotion/react": "latest",
      "@emotion/styled": "latest",
      "@mui/icons-material": "latest",
    },
  }}
  options={{
    showLineNumbers: true,
    editorHeight: 400,
    showConsole: true,
    showPreview: true,
    externalResources: [
      "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.min.js",
    ],
    timeout: 15000, // Timeout ko 10s tak badhao
  }}
  files={{
    "/App.jsx": {
      code: code,
      active: true,
    },
  }}
/>

    </div>
  );
};

export default SandboxEditor;
