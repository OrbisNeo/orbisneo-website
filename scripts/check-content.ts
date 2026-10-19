import { readFile, readdir } from "node:fs/promises";
import { join, basename, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const DIST = join(ROOT, "dist");

const EM_DASH = String.fromCharCode(0x2014);
const RESERVED_SLUGS = ["overzicht", "feed.xml", "2", "3", "4", "5"];
// Strict only for the real launch build: production context with indexing switched on.
const STRICT = process.env.CONTEXT === "production" && process.env.PUBLIC_NOINDEX === "false";
const NOINDEX_MODE = process.env.PUBLIC_NOINDEX === "true";
// Pages that must never be indexed, also after launch.
const ALWAYS_NOINDEX = new Set([
  "404.html",
  "410.html",
  "__forms.html",
  "admin/index.html",
  "styleguide/index.html",
  "contact/thanks/index.html",
  "kennismaken/bedankt/index.html",
]);

const errors: string[] = [];
const warnings: string[] = [];
const fail = (m: string) => errors.push(m);

const walk = async (dir: string, exts: string[]): Promise<string[]> => {
  const out: string[] = [];
  let entries: string[] = [];
  try {
    entries = (await readdir(dir, { recursive: true })) as string[];
  } catch {
    return out;
  }
  for (const e of entries) if (exts.some((x) => e.endsWith(x))) out.push(join(dir, e));
  return out;
};

const frontmatter = (text: string): string => {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : "";
};
const field = (fm: string, name: string): string | undefined => {
  const m = fm.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, "m"));
  return m ? m[1].replace(/^["']|["']$/g, "") : undefined;
};

interface Entry {
  collection: string;
  lang: "en" | "nl";
  file: string;
  key: string;
  slug?: string;
  draft: boolean;
}

const entries: Entry[] = [];
for (const collection of ["blog", "diensten", "cases", "nieuws"]) {
  for (const lang of ["en", "nl"] as const) {
    const dir = join(SRC, "content", collection, lang);
    for (const file of await walk(dir, [".md"])) {
      const fm = frontmatter(await readFile(file, "utf8"));
      const key = field(fm, "translationKey");
      const rel = relative(ROOT, file);
      if (!key) {
        fail(`${rel}: translationKey ontbreekt`);
        continue;
      }
      if (basename(file, ".md") !== key) {
        fail(`${rel}: bestandsnaam moet gelijk zijn aan translationKey (${key})`);
      }
      entries.push({
        collection,
        lang,
        file: rel,
        key,
        slug: field(fm, "urlSlug"),
        draft: field(fm, "draft") === "true",
      });
    }
  }
}

// 1. Translation pairs (news may be single-language)
for (const collection of ["blog", "diensten", "cases"]) {
  const keys = new Map<string, Set<string>>();
  for (const e of entries.filter((x) => x.collection === collection)) {
    if (!keys.has(e.key)) keys.set(e.key, new Set());
    keys.get(e.key)!.add(e.lang);
  }
  for (const [key, langs] of keys) {
    if (!langs.has("en") || !langs.has("nl")) {
      fail(`${collection}/${key}: ontbreekt in ${langs.has("en") ? "nl" : "en"}`);
    }
  }
}

// 2. Blog slugs: unique over both languages, none reserved
const slugSeen = new Map<string, string>();
for (const e of entries.filter((x) => x.collection === "blog" && x.slug)) {
  if (RESERVED_SLUGS.includes(e.slug!)) fail(`${e.file}: gereserveerde slug ${e.slug}`);
  const prev = slugSeen.get(e.slug!);
  if (prev) fail(`${e.file}: urlSlug ${e.slug} komt ook voor in ${prev}`);
  slugSeen.set(e.slug!, e.file);
}

// 3. No em dash in own sources (migrated blog texts are copied verbatim and excluded)
const textFiles = [
  ...(await walk(SRC, [".astro", ".ts", ".md", ".yaml", ".css"])),
  ...(await walk(join(ROOT, "public"), [".html", ".yml", ".css", "_redirects"])),
  ...(await walk(join(ROOT, "scripts"), [".ts"])),
  ...(await walk(join(ROOT, "netlify"), [".ts"])),
].filter((f) => !f.includes(`${join("content", "blog")}`));
for (const f of textFiles) {
  const lines = (await readFile(f, "utf8")).split("\n");
  lines.forEach((l, i) => {
    if (l.includes(EM_DASH)) fail(`${relative(ROOT, f)}:${i + 1}: em-streepje, gebruik een komma, dubbele punt of punt`);
  });
}

// 4. Built output: placeholders and drafts
const html = await walk(DIST, [".html"]);
if (!html.length) {
  fail("dist/ is leeg; draai eerst astro build");
} else {
  const withPlaceholder: string[] = [];
  for (const f of html) {
    if ((await readFile(f, "utf8")).includes("[PLACEHOLDER")) withPlaceholder.push(relative(DIST, f));
  }
  if (withPlaceholder.length) {
    const msg = `${withPlaceholder.length} gebouwde pagina's bevatten [PLACEHOLDER: ${withPlaceholder.slice(0, 6).join(", ")}${withPlaceholder.length > 6 ? ", ..." : ""}`;
    if (STRICT) fail(msg);
    else warnings.push(msg + " (nog toegestaan; blokkeert pas bij de lancering)");
  }

  if (STRICT) {
    for (const e of entries.filter((x) => x.draft)) {
      const base = e.collection === "blog" ? "blog" : e.lang === "en" ? "news" : "nieuws";
      if (e.slug && html.some((f) => f.includes(join(DIST, base, e.slug!)))) {
        fail(`${e.file}: draft staat in de productiebuild`);
      }
    }
  }
}


// 5. Indexing: meta tag, X-Robots-Tag header and robots.txt must agree
const toml = await readFile(join(ROOT, "netlify.toml"), "utf8");
for (const part of toml.split("[[headers]]").slice(1)) {
  if (/for\s*=\s*"\/\*"/.test(part) && /X-Robots-Tag/.test(part)) {
    fail('netlify.toml: vaste X-Robots-Tag op "/*" gevonden; die hoort per build gegenereerd te worden (astro.config.mjs)');
  }
}

const readOptional = async (p: string): Promise<string | null> => {
  try {
    return await readFile(p, "utf8");
  } catch {
    return null;
  }
};

if (html.length) {
  const noindexMeta = /<meta[^>]+name="robots"[^>]+content="noindex/;
  for (const f of html) {
    const rel = relative(DIST, f);
    const has = noindexMeta.test(await readFile(f, "utf8"));
    if (NOINDEX_MODE && !has) fail(`${rel}: mist noindex-meta terwijl PUBLIC_NOINDEX=true`);
    if (ALWAYS_NOINDEX.has(rel) && !has) fail(`${rel}: moet altijd noindex hebben`);
    if (STRICT && has && !ALWAYS_NOINDEX.has(rel)) fail(`${rel}: heeft noindex in de lanceerbuild`);
  }

  const headers = await readOptional(join(DIST, "_headers"));
  const hasHeader = headers?.includes("X-Robots-Tag") ?? false;
  if (NOINDEX_MODE && !hasHeader) fail("dist/_headers mist X-Robots-Tag: noindex terwijl PUBLIC_NOINDEX=true");
  if (STRICT && hasHeader) fail("dist/_headers bevat X-Robots-Tag in de lanceerbuild");

  const robots = (await readOptional(join(DIST, "robots.txt"))) ?? "";
  if (NOINDEX_MODE && !/^Disallow: \/\s*$/m.test(robots)) fail("robots.txt moet Disallow: / bevatten terwijl PUBLIC_NOINDEX=true");
  if (STRICT && !robots.includes("Sitemap:")) fail("robots.txt verwijst in de lanceerbuild niet naar de sitemap");
}

for (const w of warnings) console.warn(`check-content, waarschuwing: ${w}`);
if (errors.length) {
  console.error(`check-content: ${errors.length} fout(en)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `check-content: ${entries.length} contentbestanden, paren en slugs kloppen, geen em-streepjes, indexering consistent${STRICT ? ", strikte lanceermodus" : ""}`,
);
