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

export type FormatCategory = 'carousel' | 'instagram' | 'facebook' | 'youtube';

export interface FormatSelection {
  category: FormatCategory;
  format: string;
  count: number;
}

export interface FormatDef {
  id: string;
  label: string;
  ratio: AspectRatio;
  minCount: number;
}

export interface FormatCategoryDef {
  id: FormatCategory;
  label: string;
  subtitle?: string;
  formats: FormatDef[];
  expandable: boolean;
}

export const FORMAT_CATALOG: FormatCategoryDef[] = [
  {
    id: 'carousel',
    label: 'Carrusel',
    subtitle: 'Para tiendas online',
    expandable: false,
    formats: [{ id: 'main', label: 'Carrusel', ratio: '1:1', minCount: 2 }]
  },
  {
    id: 'instagram',
    label: 'Instagram',
    expandable: true,
    formats: [
      { id: 'feed', label: 'Feed', ratio: '1:1', minCount: 1 },
      { id: 'story', label: 'Story', ratio: '9:16', minCount: 1 }
    ]
  },
  {
    id: 'facebook',
    label: 'Facebook',
    expandable: true,
    formats: [
      { id: 'feed', label: 'Feed', ratio: '1:1', minCount: 1 },
      { id: 'story', label: 'Story', ratio: '9:16', minCount: 1 }
    ]
  },
  {
    id: 'youtube',
    label: 'YouTube',
    expandable: false,
    formats: [{ id: 'main', label: 'YouTube', ratio: '16:9', minCount: 1 }]
  }
];

export const FORMAT_STEPPER_MAX = 10;

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
  formats: FormatSelection[];
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
  category?: FormatCategory;
  format?: string;
}
