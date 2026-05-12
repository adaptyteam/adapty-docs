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

// Scope the `locales` collection to the locales actually being built.
// Without this, every matrix job (e.g. BUILD_LOCALES=zh) parses every
// locale's MDX and OOMs as total locale content grows.
const SUPPORTED_LOCALES = ['zh', 'tr', 'ru', 'es'] as const;
const buildLocalesEnv = (process.env.BUILD_LOCALES ?? '').trim();
const selectedLocales = !buildLocalesEnv
  ? [...SUPPORTED_LOCALES]
  : buildLocalesEnv === 'none'
    ? []
    : buildLocalesEnv
        .split(',')
        .map(s => s.trim())
        .filter((l): l is typeof SUPPORTED_LOCALES[number] =>
          (SUPPORTED_LOCALES as readonly string[]).includes(l)
        );
const localesPattern =
  selectedLocales.length === 0
    ? '__no_locales__/**/*.mdx'
    : selectedLocales.length === 1
      ? `${selectedLocales[0]}/**/*.mdx`
      : `{${selectedLocales.join(',')}}/**/*.mdx`;

const locales = defineCollection({
  loader: glob({ pattern: localesPattern, base: "./src/locales" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    metadataTitle: z.string().optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
  }),
});

export const collections = { docs, locales };
