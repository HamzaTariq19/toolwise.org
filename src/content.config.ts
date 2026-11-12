import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tools = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/tools' }),
  schema: z.object({
    /** <title> override (keep under ~60 chars) */
    seoTitle: z.string().optional(),
    /** meta description override (~150 chars) */
    metaDescription: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(3).max(6),
  }),
});

export const collections = { tools };
