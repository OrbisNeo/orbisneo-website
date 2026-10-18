import type { CollectionEntry } from "astro:content";
import type { Lang } from "./ui";

export const langOf = (
  entry: CollectionEntry<"cases"> | CollectionEntry<"diensten">,
): Lang => (entry.id.startsWith("en/") ? "en" : "nl");

export const inLang = <T extends CollectionEntry<"cases"> | CollectionEntry<"diensten">>(
  entries: T[],
  lang: Lang,
): T[] => entries.filter((e) => langOf(e) === lang);

export const sortByOrder = <T extends { data: { order: number } }>(entries: T[]): T[] =>
  [...entries].sort((a, b) => a.data.order - b.data.order);
