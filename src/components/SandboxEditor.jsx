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
            code: code,
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
          "/index.html": {
            code: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
            `,
          },
        }}
      />
    </div>
  );
};

export default SandboxEditor;
