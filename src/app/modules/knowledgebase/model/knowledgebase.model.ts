import { z } from 'zod';

export const knowledgebaseSchema = z.object({
  id: z.string().optional(),
  toolId: z.string().optional(),
  assistantId: z.string(),
  description: z.string(),
  fileIds: z.array(z.string()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type IKnowledgeBase = z.infer<typeof knowledgebaseSchema>;
