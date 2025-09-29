import { z } from 'zod';

const assistantSchema = z.object({
  _id: z.string(),
  name: z.string().min(0).max(20),
  model: z.string(),
  voice: z.string(),
  toolIds: z.array(z.string()),
  created_at: z.date(),
  updated_at: z.date(),
});

export type IAssistant = z.infer<typeof assistantSchema>;
export type IAssistantUpdate = Partial<IAssistant>;
