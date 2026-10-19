import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const RESERVED = ["overzicht", "feed.xml", "2", "3", "4", "5"];
const urlSlug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "alleen kleine letters, cijfers en koppeltekens")
  .refine((s) => !RESERVED.includes(s), "gereserveerde slug");

const seo = z
  .object({
    title: z.string().max(60).optional(),
    description: z.string().min(70).max(160).optional(),
    noindex: z.boolean().default(false),
  })
  .default({ noindex: false });

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        translationKey: z.string(),
        urlSlug,
        description: z.string().max(300),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        category: z.string().default("AI in organisations"),
        tags: z.array(z.string()).default([]),
        heroImage: image().optional(),
        heroAlt: z.string().optional(),
        author: z.string().default("Daniel Fokker"),
        legacyUrl: z.string().optional(),
        draft: z.boolean().default(false),
        seo,
      })
      .refine((d) => !d.heroImage || !!d.heroAlt, { message: "heroAlt verplicht bij heroImage" }),
});

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
    width: z.number().optional(),
    height: z.number().optional(),
    order: z.number(),
  }),
});

const nieuws = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/nieuws" }),
  schema: z.object({
    title: z.string(),
    translationKey: z.string().regex(/^\d{4}-week-\d{2}$/),
    urlSlug: z.string().regex(/^\d{4}-week-\d{2}$/),
    week: z.string().regex(/^\d{4}-W\d{2}$/),
    date: z.coerce.date(),
    summary: z.string().max(240),
    items: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          source: z.string(),
          sourceDate: z.coerce.date().optional(),
          commentary: z.string().max(400),
          tags: z.array(z.string()).default([]),
        }),
      )
      .min(3)
      .max(8),
    curatedBy: z.string().default("Vera"),
    approvedBy: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog, cases, diensten, clients, nieuws };
