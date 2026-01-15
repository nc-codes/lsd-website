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
    const manifestPath = path.resolve("_site/manifest.json");

    if (isDev) {
      return `<script type="module" src="http://localhost:5173/${entry}"></script>`;
    }

    if (!fs.existsSync(manifestPath)) {
      throw new Error("Vite manifest not found. Did you run `vite build`?");
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const file = manifest[entry];

    if (!file) {
      throw new Error(`Vite entry "${entry}" not found in manifest`);
    }

    return `<script type="module" src="/${file.file}"></script>`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
}
