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
export type AspectRatio =
  | '1:1'
  | '16:9'
  | '9:16'
  | '4:3'
  | '3:4'
  | '2:3'
  | '1:2'
  | '2:1'
  | '4:5'
  | '3:2';
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
  imageCount: number;
}

export interface GeneratedImage {
  id: string;
  accentColor: string;
}
