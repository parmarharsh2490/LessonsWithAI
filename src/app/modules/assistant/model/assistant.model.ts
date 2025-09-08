import { z } from 'zod';

const assistantListSchema = z.object({
  id: z.string(),
  assistant_name: z.string(),
  model: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

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
export type IAssistantList = z.infer<typeof assistantListSchema>;
export type IAssistantUpdate = Partial<IAssistant>;
