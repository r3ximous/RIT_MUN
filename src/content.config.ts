import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const committees = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/committees" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    topics: z.array(z.string()),
    chairs: z.array(z.string()),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  })
});

const schedule = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/schedule" }),
  schema: z.object({
    day: z.string(),
    events: z.array(z.object({
      startTime: z.string(),
      endTime: z.string(),
      label: z.string(),
      location: z.string(),
      type: z.string()
    }))
  })
});

const faqs = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    order: z.number()
  })
});

export const collections = {
  'committees': committees,
  'schedule': schedule,
  'faqs': faqs
};
