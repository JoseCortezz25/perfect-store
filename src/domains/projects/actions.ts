'use server';

import { newProjectSchema } from './new-project.schema';
import { projectMessages } from './messages';

export type NewProjectState = {
  error?: string;
  success?: boolean;
} | null;

export async function createProjectAction(
  _prevState: NewProjectState,
  formData: FormData
): Promise<NewProjectState> {
  const raw = {
    name: formData.get('name'),
    brand: formData.get('brand')
  };

  const parsed = newProjectSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  // TODO: Replace with real DB logic
  return { success: true };
}
