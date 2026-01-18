import fs from "fs";
import path from "path";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets", {
    filter: (path) => {
      if (!path.includes("js")) return path;
    },
  });

  eleventyConfig.addShortcode("vite", function (entry) {
    const isDev = process.env.ELEVENTY_ENV === "development";
    const manifestPath = path.join(process.cwd(), "public", "manifest.json");

    if (isDev) {
      return `<script type="module" src="http://localhost:5173/${entry}"></script>`;
    }

    if (!fs.existsSync(manifestPath)) {
      console.warn("⚠️ Vite manifest not found, skipping script:", entry);
      return "";
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const file = manifest[entry];

    if (!file) {
      console.warn(`⚠️ Entry "${entry}" not found in manifest`);
      return "";
    }

    return `<script type="module" src="/${file.file}"></script>`;
  });

  eleventyConfig.addPassthroughCopy("public");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
}
