// Refresh config
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    metadataTitle: z.string().optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    rank: z.number().optional(),
    customSlug: z.string().optional(),
  }),
});

const locales = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/locales" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    metadataTitle: z.string().optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
  }),
});

export const collections = { docs, locales };
