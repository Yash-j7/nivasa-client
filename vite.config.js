import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const apiBase = process.env.REACT_APP_SERVER_BASE_URL || "/api";
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
