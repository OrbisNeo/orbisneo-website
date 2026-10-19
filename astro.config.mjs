import { defineConfig } from "astro/config";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const isProd = process.env.CONTEXT === "production" && process.env.PUBLIC_NOINDEX !== "true";

// Indexable only for the real production site with indexing switched on.
// Same rule as src/pages/robots.txt.ts.
const indexable = process.env.PUBLIC_SITE_ENV === "production" && process.env.PUBLIC_NOINDEX !== "true";

// Every other build (previews, branch deploys, the test environment, production
// until launch) gets an X-Robots-Tag header via a generated dist/_headers file,
// so switching PUBLIC_NOINDEX to "false" is the single switch at launch.
const noindexHeader = {
  name: "noindex-header",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      if (indexable) return;
      await writeFile(
        fileURLToPath(new URL("_headers", dir)),
        "/*\n  X-Robots-Tag: noindex, nofollow\n",
      );
    },
  },
};

export default defineConfig({
  site: "https://www.orbisneoconsulting.com",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  image: { responsiveStyles: true },
  integrations: [noindexHeader],
  vite: { define: { __IS_PROD__: JSON.stringify(isProd) } },
});
