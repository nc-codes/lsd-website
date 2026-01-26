import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/",
  build: {
    manifest: true,
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets/js",
    rollupOptions: {
      input: "/assets/js/main.js",
    },
  },
});
