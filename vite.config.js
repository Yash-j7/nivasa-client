import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const apiBase = "http://43.204.115.99:3000";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: apiBase,
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
