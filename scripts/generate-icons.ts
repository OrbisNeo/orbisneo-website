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

// favicon.ico: browsers and crawlers still request /favicon.ico by default.
// An ICO file can hold PNG images directly (supported since Windows Vista and by all browsers).
const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map((size) => icon(size, CLEAR, 0.04)));
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type: icon
icoHeader.writeUInt16LE(icoSizes.length, 4);
let icoOffset = 6 + icoSizes.length * 16;
const icoEntries = icoSizes.map((size, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0); // width
  entry.writeUInt8(size, 1); // height
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(icoImages[i].length, 8);
  entry.writeUInt32LE(icoOffset, 12);
  icoOffset += icoImages[i].length;
  return entry;
});
await writeFile(join(OUT, "favicon.ico"), Buffer.concat([icoHeader, ...icoEntries, ...icoImages]));
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

console.log("icons, favicon.ico en site.webmanifest geschreven in public/");
