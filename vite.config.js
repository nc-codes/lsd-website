import { defineConfig } from "vite";
import "dotenv/config";

export default defineConfig({
  root: "src",
  base: "/",
  build: {
    manifest: true,
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "/assets/js/main.js",
    },
  },
});
