import { z } from 'zod';

export const voiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  tone: z.string(),
  accent: z.string(),
  gender: z.string(),
});

export type IVoice = z.infer<typeof voiceSchema>;
