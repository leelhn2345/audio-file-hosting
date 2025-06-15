import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
