import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint"; // 🔹 Bunu ekle

export default defineConfig({
  plugins: [react(), eslint()], // 🔹 ESLint plugin'ini buraya ekle
});
