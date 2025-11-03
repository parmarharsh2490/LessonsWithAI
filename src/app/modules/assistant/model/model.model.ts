import { z } from 'zod';

export const modelSchema = z.object({
  name: z.string(),
  provider: z.string(),
  model: z.string(),
  description: z.string(),
});

export type IModel = z.infer<typeof modelSchema>;
