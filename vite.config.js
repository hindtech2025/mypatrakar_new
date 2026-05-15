import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    target: "es2015",    // ✅ Safari / iPhone safe
    sourcemap: false,    // ✅ Hide source code & reduce bundle size
    minify: "terser",    // ✅ Smaller bundle for low memory devices
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://mypatrakar.hindtechitsolutions.com', // ✅ Backend URL HTTPS
        changeOrigin: true,   // ✅ Host header matches target
        secure: true,         // ✅ Accept only valid certificates
        rewrite: (path) => path.replace(/^\/api/, ''), // ✅ Adjust path if needed
      },
    },
  },
});
