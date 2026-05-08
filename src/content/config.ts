import { defineCollection, z } from 'astro:content';

const committees = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    topics: z.array(z.string()),
    chairs: z.array(z.string()),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  })
});

const schedule = defineCollection({
  type: 'data',
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
  type: 'data',
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