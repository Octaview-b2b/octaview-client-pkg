import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "./src/index.tsx", // Update to your entry file
    },
    outDir: "dist", // Ensure the output matches your Rollup output
  },
});
