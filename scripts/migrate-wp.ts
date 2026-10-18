import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import TurndownService from "turndown";

const API = "https://orbisneo.nl/wp-json/wp/v2";
const REPO_ROOT = new URL("..", import.meta.url).pathname;
const CONTENT_DIR = join(REPO_ROOT, "src/content/blog");
const IMG_DIR = join(REPO_ROOT, "src/assets/blog");

interface PostMap {
  wpId: number;
  lang: "en" | "nl";
  translationKey: string;
  urlSlug: string;
}

const posts: PostMap[] = [
  { wpId: 398, lang: "en", translationKey: "agent-sprawl", urlSlug: "agent-sprawl-the-new-shadow-it" },
  { wpId: 391, lang: "nl", translationKey: "agent-sprawl", urlSlug: "agent-sprawl-de-nieuwe-shadow-it" },
  { wpId: 400, lang: "en", translationKey: "ai-agents", urlSlug: "ai-agents-in-organisations" },
  { wpId: 45, lang: "nl", translationKey: "ai-agents", urlSlug: "ai-agents-in-organisaties" },
  { wpId: 401, lang: "en", translationKey: "getting-started-with-ai", urlSlug: "getting-started-with-ai" },
  { wpId: 44, lang: "nl", translationKey: "getting-started-with-ai", urlSlug: "beginnen-met-ai" },
  { wpId: 306, lang: "en", translationKey: "is-ai-just-automation", urlSlug: "is-ai-just-automation-with-a-new-label" },
  { wpId: 43, lang: "nl", translationKey: "is-ai-just-automation", urlSlug: "ai-gewoon-automatisering-met-nieuw-label" },
  { wpId: 402, lang: "en", translationKey: "ai-without-the-hype", urlSlug: "ai-without-the-hype" },
  { wpId: 41, lang: "nl", translationKey: "ai-without-the-hype", urlSlug: "ai-zonder-hype" },
  { wpId: 403, lang: "en", translationKey: "ethical-ai", urlSlug: "ethical-ai-from-sentiment-to-working-agreements" },
  { wpId: 42, lang: "nl", translationKey: "ethical-ai", urlSlug: "ethische-ai" },
];

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
td.addRule("stripEmptyParagraphs", {
  filter: (node) => node.nodeName === "P" && !node.textContent?.trim(),
  replacement: () => "",
});

const stripHtml = (html: string): string =>
  html.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8211;/g, "–").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const yamlString = (s: string): string => {
  const escaped = s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${escaped}"`;
};

interface WpPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  link: string;
  yoast_head_json?: {
    og_description?: string;
    description?: string;
    og_image?: Array<{ url: string; width?: number; height?: number }>;
  };
}

interface WpMedia {
  source_url: string;
  alt_text: string;
  media_details: { file: string };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

async function downloadImage(url: string, slug: string): Promise<{ localPath: string; filename: string }> {
  const extMatch = url.match(/\.(jpg|jpeg|png|webp|avif)(\?|$)/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
  const filename = `${slug}.${ext}`;
  const localPath = join(IMG_DIR, filename);
  await mkdir(dirname(localPath), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`image ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(localPath, buf);
  return { localPath, filename };
}

async function run(): Promise<void> {
  await mkdir(join(CONTENT_DIR, "en"), { recursive: true });
  await mkdir(join(CONTENT_DIR, "nl"), { recursive: true });
  await mkdir(IMG_DIR, { recursive: true });

  for (const p of posts) {
    console.log(`\n→ ${p.lang}/${p.translationKey} (wp ${p.wpId})`);
    const wp = await fetchJson<WpPost>(`${API}/posts/${p.wpId}`);

    const title = stripHtml(wp.title.rendered);
    const description = (wp.yoast_head_json?.og_description ?? wp.yoast_head_json?.description ?? stripHtml(wp.excerpt.rendered)).slice(0, 200);
    const pubDate = wp.date.slice(0, 10);
    const modified = wp.modified.slice(0, 10);
    const includeModified = modified !== pubDate;

    let heroLine = "";
    let heroAltLine = "";
    if (wp.featured_media) {
      try {
        const media = await fetchJson<WpMedia>(`${API}/media/${wp.featured_media}`);
        const { filename } = await downloadImage(media.source_url, p.translationKey);
        heroLine = `heroImage: "../../../assets/blog/${filename}"`;
        heroAltLine = `heroAlt: ${yamlString(media.alt_text || title)}`;
        console.log(`  image → ${filename}`);
      } catch (err) {
        console.warn(`  no image: ${(err as Error).message}`);
      }
    }

    const body = td.turndown(wp.content.rendered).trim();
    const frontmatter = [
      "---",
      `title: ${yamlString(title)}`,
      `translationKey: ${p.translationKey}`,
      `urlSlug: ${p.urlSlug}`,
      `description: ${yamlString(description)}`,
      `pubDate: ${pubDate}`,
      ...(includeModified ? [`updatedDate: ${modified}`] : []),
      `category: "AI in organisations"`,
      ...(heroLine ? [heroLine, heroAltLine] : []),
      `legacyUrl: ${yamlString(wp.link)}`,
      "---",
      "",
      body,
      "",
    ].join("\n");

    const target = join(CONTENT_DIR, p.lang, `${p.translationKey}.md`);
    await writeFile(target, frontmatter);
    console.log(`  wrote ${p.lang}/${p.translationKey}.md (${body.split(/\s+/).length} words)`);
  }

  console.log("\nDone.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
