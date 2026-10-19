import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { inLang } from "../../../i18n/utils";

export async function GET(context: APIContext) {
  const all = await getCollection("blog", (p) => !p.data.draft);
  const posts = inLang(all, "nl").sort((a, b) => +b.data.pubDate - +a.data.pubDate);

  return rss({
    title: "Orbis Neo Blog",
    description: "Visie op organisatie, strategie en AI.",
    site: context.site ?? "https://www.orbisneoconsulting.com",
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: `/blog/${p.data.urlSlug}/`,
      categories: [p.data.category, ...p.data.tags],
    })),
    customData: `<language>nl-nl</language>`,
  });
}
