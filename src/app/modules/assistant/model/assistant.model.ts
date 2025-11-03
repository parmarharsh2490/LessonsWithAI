import { z } from 'zod';
import { voiceSchema } from './voice.model';
import { modelSchema } from './model.model';
import { knowledgebaseSchema } from '../../knowledgebase/model/knowledgebase.model';

export const assistantSchema = z.object({
  id: z.string(),
  assistantId: z.string(),
  userId: z.string(),
  name: z.string().min(0).max(20),
  modelName: z.string(),
  voiceName: z.string(),
  voice: voiceSchema,
  model: modelSchema,
  toolId: z.string().optional(),
  knowledgebase: knowledgebaseSchema,
  createdAt: z.date().optional,
  updatedAt: z.date().optional,
});

export type IAssistant = z.infer<typeof assistantSchema>;
export type IAssistantUpdate = Partial<IAssistant>;
