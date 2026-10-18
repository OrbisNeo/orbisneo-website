import { writeFile, mkdir, rm } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import TurndownService from "turndown";

const API = "https://orbisneo.nl/wp-json/wp/v2";
const REPO_ROOT = new URL("..", import.meta.url).pathname;
const CONTENT_DIR = join(REPO_ROOT, "src/content/blog");
const IMG_ROOT = join(REPO_ROOT, "src/assets/blog");

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
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&#8216;|&#x2019;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const yamlString = (s: string): string =>
  `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

const extForUrl = (url: string): string => {
  const m = url.match(/\.(jpg|jpeg|png|webp|avif|gif)(\?|$)/i);
  return m ? m[1].toLowerCase() : "jpg";
};

const stemFromUrl = (url: string): string =>
  basename(url.split("?")[0]).replace(/\.[a-z]+$/i, "").replace(/-\d{3,4}x\d{3,4}$/i, "");

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
  };
}

interface WpMedia {
  source_url: string;
  alt_text: string;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

async function downloadImage(url: string, dir: string, filename: string): Promise<void> {
  const target = join(dir, filename);
  await mkdir(dirname(target), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`image ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(target, buf);
}

interface ImgTag {
  fullTag: string;
  src: string;
  alt: string;
}

const parseImgs = (html: string): ImgTag[] => {
  const re = /<img\b[^>]*>/gi;
  const out: ImgTag[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    const srcMatch = tag.match(/\bsrc=["']([^"']+)["']/i);
    const altMatch = tag.match(/\balt=["']([^"']*)["']/i);
    if (srcMatch) {
      out.push({
        fullTag: tag,
        src: srcMatch[1],
        alt: altMatch ? altMatch[1] : "",
      });
    }
  }
  return out;
};

async function run(): Promise<void> {
  await rm(IMG_ROOT, { recursive: true, force: true });
  await mkdir(join(CONTENT_DIR, "en"), { recursive: true });
  await mkdir(join(CONTENT_DIR, "nl"), { recursive: true });
  await mkdir(IMG_ROOT, { recursive: true });

  for (const p of posts) {
    console.log(`\n→ ${p.lang}/${p.translationKey} (wp ${p.wpId})`);
    const wp = await fetchJson<WpPost>(`${API}/posts/${p.wpId}`);
    const slugDir = join(IMG_ROOT, p.translationKey);
    await mkdir(slugDir, { recursive: true });

    const title = stripHtml(wp.title.rendered);
    const description = (
      wp.yoast_head_json?.og_description ??
      wp.yoast_head_json?.description ??
      stripHtml(wp.excerpt.rendered)
    ).slice(0, 200);
    const pubDate = wp.date.slice(0, 10);
    const modified = wp.modified.slice(0, 10);
    const includeModified = modified !== pubDate;

    // Hero (featured) image
    let heroStem = "";
    let heroFilename = "";
    let heroAlt = title;
    if (wp.featured_media) {
      try {
        const media = await fetchJson<WpMedia>(`${API}/media/${wp.featured_media}`);
        const ext = extForUrl(media.source_url);
        heroFilename = `hero.${ext}`;
        heroStem = stemFromUrl(media.source_url);
        heroAlt = media.alt_text || title;
        await downloadImage(media.source_url, slugDir, heroFilename);
        console.log(`  hero → ${p.translationKey}/${heroFilename} (alt: ${heroAlt.slice(0, 60)})`);
      } catch (err) {
        console.warn(`  no hero: ${(err as Error).message}`);
      }
    }

    // Content images: download, rewrite src, drop duplicate hero
    let html = wp.content.rendered;
    const imgs = parseImgs(html);
    const perLangTranslationKey = p.translationKey; // for folder lookup from markdown
    let bodyImgIndex = 0;
    for (const img of imgs) {
      const stem = stemFromUrl(img.src);
      // skip if same base image as hero (dedup)
      if (heroStem && stem === heroStem) {
        html = html.replace(img.fullTag, "");
        console.log(`  skipped duplicate hero reference in body`);
        continue;
      }
      bodyImgIndex++;
      const ext = extForUrl(img.src);
      const filename = `img-${bodyImgIndex}.${ext}`;
      try {
        await downloadImage(img.src, slugDir, filename);
        console.log(`  body img → ${perLangTranslationKey}/${filename} (alt: ${img.alt.slice(0, 60) || "(empty)"})`);
      } catch (err) {
        console.warn(`  failed body img ${img.src}: ${(err as Error).message}`);
        continue;
      }
      // Build new img tag with local src so turndown keeps the alt
      const finalAlt = img.alt.trim() || title; // fallback to article title for decorative WP images
      const safeAlt = finalAlt.replace(/"/g, "&quot;");
      const newTag = `<img src="../../../assets/blog/${perLangTranslationKey}/${filename}" alt="${safeAlt}" />`;
      html = html.replace(img.fullTag, newTag);
    }

    // Remove paragraph wrappers around now-empty content
    html = html.replace(/<p>\s*<\/p>/g, "");

    const body = td.turndown(html).trim();

    const frontmatter = [
      "---",
      `title: ${yamlString(title)}`,
      `translationKey: ${p.translationKey}`,
      `urlSlug: ${p.urlSlug}`,
      `description: ${yamlString(description)}`,
      `pubDate: ${pubDate}`,
      ...(includeModified ? [`updatedDate: ${modified}`] : []),
      `category: "AI in organisations"`,
      ...(heroFilename
        ? [`heroImage: "../../../assets/blog/${p.translationKey}/${heroFilename}"`, `heroAlt: ${yamlString(heroAlt)}`]
        : []),
      `legacyUrl: ${yamlString(wp.link)}`,
      "---",
      "",
      body,
      "",
    ].join("\n");

    const target = join(CONTENT_DIR, p.lang, `${p.translationKey}.md`);
    await writeFile(target, frontmatter);
    const wordCount = body.split(/\s+/).filter(Boolean).length;
    console.log(`  wrote ${p.lang}/${p.translationKey}.md (${wordCount} words)`);
  }

  console.log("\nDone.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
