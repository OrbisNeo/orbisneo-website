import { defineConfig } from "astro/config";

const isProd = process.env.CONTEXT === "production" && process.env.PUBLIC_NOINDEX !== "true";

export default defineConfig({
  site: "https://www.orbisneoconsulting.com",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  image: { responsiveStyles: true },
  vite: { define: { __IS_PROD__: JSON.stringify(isProd) } },
});
