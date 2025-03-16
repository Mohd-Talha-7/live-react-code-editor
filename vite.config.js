import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,
    host: "0.0.0.0",
    strictPort: true, // Ensure it uses the exact port
    allowedHosts: ["live-react-code-editor.onrender.com"], // 🛠️ Yeh line add karo
  },
  preview: {
    allowedHosts: ["live-react-code-editor.onrender.com"], // ✅ Yeh bhi add karo
  },
});
