import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://nivasa.onrender.com",
        secure: false,
        changeOrigin: true,
        // No rewrite needed since backend expects /api prefix
      },
    },
  },
  plugins: [react()],
  define: {
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
      "https://nivasa.onrender.com/api"
    ),
  },
});
