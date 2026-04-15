import { z } from 'zod';

export const uploadVersionSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  versionLabel: z
    .string()
    .min(1, 'La etiqueta de versión es requerida')
    .max(10, 'Máximo 10 caracteres'),
  file: z
    .instanceof(File)
    .refine(f => f.size > 0, 'Selecciona un archivo ZIP')
    .refine(
      f => f.name.toLowerCase().endsWith('.zip'),
      'Solo se aceptan archivos .zip'
    )
});

export type UploadVersion = z.infer<typeof uploadVersionSchema>;
