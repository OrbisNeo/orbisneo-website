import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SOURCE = join(ROOT, "src/assets/brand/beeldmerk.png");
const OUT = join(ROOT, "public");

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

// Beeldmerk on a square canvas with a margin, so the circle is not clipped.
const icon = (size: number, background: typeof WHITE | typeof CLEAR, margin: number) => {
  const inner = Math.round(size * (1 - margin * 2));
  return sharp(SOURCE)
    .resize(inner, inner, { fit: "contain", background: CLEAR })
    .extend({
      top: Math.floor((size - inner) / 2),
      bottom: Math.ceil((size - inner) / 2),
      left: Math.floor((size - inner) / 2),
      right: Math.ceil((size - inner) / 2),
      background,
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
};

await writeFile(join(OUT, "favicon-32.png"), await icon(32, CLEAR, 0.04));
await writeFile(join(OUT, "apple-touch-icon.png"), await icon(180, WHITE, 0.12));
await writeFile(join(OUT, "icon-192.png"), await icon(192, WHITE, 0.1));
await writeFile(join(OUT, "icon-512.png"), await icon(512, WHITE, 0.1));

await writeFile(
  join(OUT, "site.webmanifest"),
  JSON.stringify(
    {
      name: "Orbis Neo Consulting",
      short_name: "Orbis Neo",
      start_url: "/",
      display: "browser",
      background_color: "#FFFFFF",
      theme_color: "#FFFFFF",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ) + "\n",
);

console.log("icons en site.webmanifest geschreven in public/");
