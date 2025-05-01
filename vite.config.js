import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const apiBase = "http://43.204.115.99:3000";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "${import.meta.env.VITE_API_BASE_URL}/api": {
        target: "http://43.204.115.99:3000",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
