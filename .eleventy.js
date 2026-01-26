import fs from "fs";
import path from "path";
import "dotenv/config";

console.log("NODE_ENV:", process.env.NODE_ENV);

export default function (eleventyConfig) {
  // Copiar assets NO-JS (imágenes, fuentes, etc.)
  eleventyConfig.addPassthroughCopy("src/assets", {
    filter: (p) => !p.includes("js"),
  });

  // Copiar SOLO los assets procesados por Vite
  eleventyConfig.addPassthroughCopy({
    "dist/assets": "assets/js",
  });

  // Shortcode Vite
  eleventyConfig.addShortcode("vite", function (entry) {
    const isDev = process.env.NODE_ENV !== "production";
    const manifestPath = path.join(
      process.cwd(),
      "dist",
      ".vite",
      "manifest.json",
    );

    if (isDev) {
      return `<script type="module" src="http://localhost:5173/${entry}"></script>`;
    }

    if (!fs.existsSync(manifestPath)) {
      throw new Error("❌ dist/.vite/manifest.json not found");
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const file = manifest[entry];

    if (!file) {
      throw new Error(`❌ Entry "${entry}" not found in Vite manifest`);
    }

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
