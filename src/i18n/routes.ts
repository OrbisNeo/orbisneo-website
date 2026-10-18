import type { Lang } from "./ui";

export interface RoutePair {
  en: string;
  nl: string;
  navKey?: "services" | "about" | "blog" | "contact";
}

export const routes: RoutePair[] = [
  { en: "/", nl: "/welkom/" },
  { en: "/services/", nl: "/diensten/", navKey: "services" },
  { en: "/about/", nl: "/over/", navKey: "about" },
  { en: "/blog/", nl: "/blog/overzicht/", navKey: "blog" },
  { en: "/contact/", nl: "/kennismaken/", navKey: "contact" },
  { en: "/privacy/", nl: "/privacybeleid/" },
];

export const navRoutes = routes.filter((r): r is RoutePair & { navKey: NonNullable<RoutePair["navKey"]> } =>
  Boolean(r.navKey),
);

export const homeFor = (lang: Lang): string => (lang === "en" ? "/" : "/welkom/");

export const alternateFor = (lang: Lang, path: string): string | null => {
  const pair = routes.find((r) => r[lang] === path);
  if (!pair) return null;
  return lang === "en" ? pair.nl : pair.en;
};

export interface Alternates {
  en: string | null;
  nl: string | null;
}

export const alternatesFor = (lang: Lang, path: string): Alternates => {
  const other = alternateFor(lang, path);
  if (!other) return { en: null, nl: null };
  return lang === "en" ? { en: path, nl: other } : { en: other, nl: path };
};
