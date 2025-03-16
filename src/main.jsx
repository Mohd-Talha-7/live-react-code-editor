import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // ✅ Correct import
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(  // ✅ Directly use createRoot
  <StrictMode>
    <App />
  </StrictMode>
);
