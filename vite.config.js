import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  root: ".",
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@/components": resolve(__dirname, "src/components"),
      "@/hooks": resolve(__dirname, "src/hooks"),
      "@/services": resolve(__dirname, "src/services"),
      "@/config": resolve(__dirname, "src/config"),
      "@/types": resolve(__dirname, "src/types")
    }
  }
});
