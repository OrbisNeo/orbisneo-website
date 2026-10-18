import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const cases = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cases" }),
  schema: z.object({
    translationKey: z.string(),
    order: z.number(),
    org: z.string(),
    role: z.string(),
    period: z.string(),
    situation: z.string(),
    result: z.string(),
    featured: z.boolean().default(true),
  }),
});

const diensten = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/diensten" }),
  schema: z.object({
    translationKey: z.string(),
    order: z.number(),
    title: z.string(),
    tagline: z.string(),
    forWho: z.string(),
    duration: z.string(),
    delivery: z.string(),
    price: z.string(),
    anchor: z.string(),
  }),
});

const clients = defineCollection({
  loader: file("src/content/clients/clients.yaml"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string(),
    order: z.number(),
  }),
});

export const collections = { cases, diensten, clients };
