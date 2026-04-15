'use server';

import { uploadVersionSchema } from './project-detail.schema';

export type UploadVersionState = {
  error?: string;
  success?: boolean;
  versionLabel?: string;
} | null;

export async function uploadVersionAction(
  _prevState: UploadVersionState,
  formData: FormData
): Promise<UploadVersionState> {
  const raw = {
    projectId: formData.get('projectId'),
    versionLabel: formData.get('versionLabel'),
    file: formData.get('file')
  };

  const parsed = uploadVersionSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };
  }

  // TODO: Replace with real upload + QC validation logic
  return { success: true, versionLabel: parsed.data.versionLabel };
}
