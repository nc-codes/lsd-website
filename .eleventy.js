import fs from "fs";
import path from "path";

export default function (eleventyConfig) {
  // Copiar assets NO-JS (imágenes, fuentes, etc.)
  eleventyConfig.addPassthroughCopy("src/assets", {
    filter: (p) => !p.includes("/js/"),
  });

  // Copiar SOLO los assets procesados por Vite
  eleventyConfig.addPassthroughCopy({
    "dist/assets": "assets",
  });

  // Shortcode Vite
  eleventyConfig.addShortcode("vite", function (entry) {
    const isDev = process.env.ELEVENTY_ENV === "development";
    const manifestPath = path.join(process.cwd(), "dist", "manifest.json");

    if (isDev) {
      return `<script type="module" src="http://localhost:5173/${entry}"></script>`;
    }

    if (!fs.existsSync(manifestPath)) return "";

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const file = manifest[entry];
    if (!file) return "";

    return `<script type="module" src="/${file.file}"></script>`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
}
