import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "src", // REQUIRED: this tells Vite where index.html is
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/components")
    }
  },
  server: {
    port: 5173
  }
});
