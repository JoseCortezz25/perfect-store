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
export type ImageQuality = 'bajo' | 'medio' | 'alto';

export type Channel = 'carousel' | 'instagram' | 'facebook' | 'youtube';

export interface ChannelConfig {
  channel: Channel;
  imageCount: number; // carousel: extra AI images beyond 2 base; others: total images
}

export interface ChannelSection {
  channel: Channel;
  images: GeneratedImage[];
}

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
  channels: ChannelConfig[];
  formats: FormatSelection[];
  freeText: string;
  elementChips: string[];
  atmosphericChips: string[];
  dayMoment: number;
  prominence: number;
  quality: ImageQuality;
}

export type FormatCategory = 'story' | 'feed' | 'carousel' | 'landscape';

export interface FormatItem {
  id: string;
  label: string;
  minCount: number;
}

export interface FormatCategoryConfig {
  id: FormatCategory;
  label: string;
  expandable: boolean;
  formats: FormatItem[];
}

export interface FormatSelection {
  category: FormatCategory;
  format: string;
  count: number;
}

export const FORMAT_STEPPER_MAX = 10;

export const FORMAT_CATALOG: FormatCategoryConfig[] = [
  {
    id: 'story',
    label: 'Story',
    expandable: false,
    formats: [{ id: 'default', label: 'Story', minCount: 1 }]
  },
  {
    id: 'feed',
    label: 'Feed',
    expandable: true,
    formats: [
      { id: 'square', label: 'Cuadrado 1:1', minCount: 1 },
      { id: 'portrait', label: 'Retrato 4:5', minCount: 1 }
    ]
  },
  {
    id: 'carousel',
    label: 'Carousel',
    expandable: false,
    formats: [{ id: 'default', label: 'Carousel', minCount: 2 }]
  },
  {
    id: 'landscape',
    label: 'Landscape',
    expandable: false,
    formats: [{ id: 'default', label: 'Landscape', minCount: 1 }]
  }
];

export interface GeneratedImage {
  id: string;
  accentColor: string;
  category?: FormatCategory;
  format?: string;
}
