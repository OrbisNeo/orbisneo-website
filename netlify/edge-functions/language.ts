import type { Config, Context } from "@netlify/edge-functions";

const PRIMARY_HOSTS = ["www.orbisneoconsulting.com", "test.orbisneoconsulting.com"];
const BOT =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|embedly|lighthouse|headless|google|bing|duckduck|yandex|baidu|petal|applebot|ahrefs|semrush/i;
const USE_GEO = Netlify.env.get("LANG_USE_GEO") === "true";
const ONE_YEAR = 60 * 60 * 24 * 365;

function prefersDutch(header: string | null): boolean | null {
  if (!header) return null;
  const langs = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of langs) {
    if (tag.startsWith("nl")) return true;
    if (tag.startsWith("en")) return false;
  }
  return null;
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const isPreview = url.hostname.endsWith(".netlify.app");
  if (!PRIMARY_HOSTS.includes(url.hostname) && !isPreview) return;
  if (request.method !== "GET") return;
  if (BOT.test(request.headers.get("user-agent") ?? "")) return;

  if (url.searchParams.get("lang") === "en") {
    context.cookies.set({
      name: "on_lang",
      value: "en",
      path: "/",
      maxAge: ONE_YEAR,
      sameSite: "Lax",
      secure: true,
    });
    return;
  }

  const saved = context.cookies.get("on_lang");
  let target: "en" | "nl";
  if (saved === "en" || saved === "nl") {
    target = saved;
  } else {
    const nl = prefersDutch(request.headers.get("accept-language"));
    const geoNl = USE_GEO && ["NL", "BE"].includes(context.geo?.country?.code ?? "");
    target = nl === true || (nl === null && geoNl) ? "nl" : "en";
    context.cookies.set({
      name: "on_lang",
      value: target,
      path: "/",
      maxAge: ONE_YEAR,
      sameSite: "Lax",
      secure: true,
    });
  }

  if (target === "nl") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/welkom/",
        "Cache-Control": "private, no-store",
        Vary: "Accept-Language, Cookie",
      },
    });
  }
  return;
};

export const config: Config = { path: "/" };
