export type ImageType = 'aislado' | 'lifestyle' | 'perfect_store';
export type ImageIllumination =
  | 'natural'
  | 'estudio'
  | 'golden_hour'
  | 'rembrandt'
  | 'contraluz'
  | 'cenital'
  | 'dramatica'
  | 'suave';
export type ImageAngle =
  | 'frontal'
  | 'tres_cuartos'
  | 'lateral'
  | 'cenital'
  | 'bajo'
  | 'isometrico'
  | 'detalle'
  | 'trasero';
export type AspectRatio = '16:9' | '4:3' | '1:1' | '3:4' | '9:16';
export type ImageQuality = 'bajo' | 'medio' | 'alto';

export interface Sku {
  id: string;
  name: string;
  brand: string;
  volume: string;
  accentColor: string;
}

export interface GeneratorConfig {
  projectId: string | null;
  projectName: string | null;
  selectedSkus: Sku[];
  referenceImageName: string | null;
  imageType: ImageType | null;
  angle: ImageAngle | null;
  illumination: ImageIllumination | null;
  aspectRatio: AspectRatio | null;
  freeText: string;
  elementChips: string[];
  atmosphericChips: string[];
  dayMoment: number;
  prominence: number;
  quality: ImageQuality;
}

export interface GeneratedImage {
  id: string;
  accentColor: string;
}
