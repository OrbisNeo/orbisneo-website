import type { CollectionEntry } from "astro:content";
import type { Lang } from "./ui";

type LangEntry =
  | CollectionEntry<"cases">
  | CollectionEntry<"diensten">
  | CollectionEntry<"blog">
  | CollectionEntry<"nieuws">;

export const langOf = (entry: LangEntry): Lang =>
  entry.id.startsWith("en/") ? "en" : "nl";

export const inLang = <T extends LangEntry>(entries: T[], lang: Lang): T[] =>
  entries.filter((e) => langOf(e) === lang);

export const sortByOrder = <T extends { data: { order: number } }>(entries: T[]): T[] =>
  [...entries].sort((a, b) => a.data.order - b.data.order);
