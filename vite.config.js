import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ["*"], // Sabhi hosts allow karne ke liye
    cors: true, // Cross-Origin Requests allow
  },
});
