import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/",
  build: {
    manifest: true,
    outDir: "../public",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: "/assets/js/main.js",
      },
      output: {
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash][extname]",
      },
    },
  },
});
