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
            "@mui/icons-material": "latest" 
          },
        }}
        options={{
          showLineNumbers: true,
          editorHeight: 400,
          showConsole: true,
          showPreview: true,
        }}
        files={{
          "/App.js": {
            code: code, // ✅ AI ka generated code yahan inject hoga
            active: true,
          },
        }}
      />
    </div>
  );
};

export default SandboxEditor;
