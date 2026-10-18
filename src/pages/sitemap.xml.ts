import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { routes } from "../i18n/routes";
import { langOf } from "../i18n/utils";

interface Entry {
  loc: string;
  lastmod?: string;
  alternates?: { en: string; nl: string };
}

const SITE = "https://www.orbisneoconsulting.com";
const abs = (path: string) => new URL(path, SITE).toString();

export async function GET(_context: APIContext) {
  const entries: Entry[] = [];

  // Fixed pages that currently exist. Contact comes in PR 8.
  const existingKeys = new Set([
    "/",
    "/services/",
    "/about/",
    "/blog/",
    "/news/",
    "/privacy/",
  ]);
  for (const route of routes) {
    if (existingKeys.has(route.en)) {
      entries.push({
        loc: abs(route.en),
        alternates: { en: abs(route.en), nl: abs(route.nl) },
      });
      entries.push({
        loc: abs(route.nl),
        alternates: { en: abs(route.en), nl: abs(route.nl) },
      });
    }
  }

  // Blog articles — pair each EN with its NL via translationKey.
  const posts = await getCollection("blog", (p) => !p.data.draft);
  const byKey = new Map<string, { en?: string; nl?: string; lastmod?: string }>();
  for (const p of posts) {
    const lang = langOf(p);
    const url = abs(`/blog/${p.data.urlSlug}/`);
    const existing = byKey.get(p.data.translationKey) ?? {};
    existing[lang] = url;
    const date = (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10);
    if (!existing.lastmod || existing.lastmod < date) existing.lastmod = date;
    byKey.set(p.data.translationKey, existing);
  }
  for (const pair of byKey.values()) {
    if (pair.en && pair.nl) {
      entries.push({ loc: pair.en, lastmod: pair.lastmod, alternates: { en: pair.en, nl: pair.nl } });
      entries.push({ loc: pair.nl, lastmod: pair.lastmod, alternates: { en: pair.en, nl: pair.nl } });
    } else {
      const only = pair.en ?? pair.nl;
      if (only) entries.push({ loc: only, lastmod: pair.lastmod });
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries
      .map((e) => {
        const lastmod = e.lastmod ? `  <lastmod>${e.lastmod}</lastmod>\n` : "";
        const alt = e.alternates
          ? `  <xhtml:link rel="alternate" hreflang="en" href="${e.alternates.en}" />\n` +
            `  <xhtml:link rel="alternate" hreflang="nl" href="${e.alternates.nl}" />\n` +
            `  <xhtml:link rel="alternate" hreflang="x-default" href="${e.alternates.en}" />\n`
          : "";
        return `<url>\n  <loc>${e.loc}</loc>\n${lastmod}${alt}</url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
