import { z } from 'zod';

export const newProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(80, 'Name is too long'),
  brand: z.string().min(1, 'Brand is required').max(60, 'Brand name is too long')
});

export type NewProject = z.infer<typeof newProjectSchema>;
