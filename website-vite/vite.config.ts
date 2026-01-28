import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        // Exposes frontmatter as `export const frontmatter = {...}`
        // so MDX files with --- yaml --- don't break.
        [remarkMdxFrontmatter, { name: "frontmatter" }],
      ],
    }),
  ],
  // GitHub Pages project site:
  // https://<org>.github.io/<repo>/
  base: "/carbon-mcp/",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["legacy-js-api", "if-function"],
      },
    },
  },
});
