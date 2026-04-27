// ─── Generator Store ──────────────────────────────────────────────────────────
// Module-level singleton. Persists config and generated images across
// navigation between /generator and /generator/results.

import type { GeneratorConfig, GeneratedImage } from '../generator.types';

const DEFAULT_CONFIG: GeneratorConfig = {
  projectId: null,
  projectName: null,
  selectedSkus: [],
  referenceImageName: null,
  imageType: null,
  angle: null,
  illumination: null,
  aspectRatio: '1:1',
  freeText: '',
  elementChips: [],
  atmosphericChips: [],
  dayMoment: 2,
  prominence: 2,
  quality: 'medio',
  imageCount: 4
};

type Listener = () => void;

let _config: GeneratorConfig = { ...DEFAULT_CONFIG };
let _images: GeneratedImage[] = [];
let _isGenerating = false;
const _listeners = new Set<Listener>();

function notify() {
  _listeners.forEach(l => l());
}

export const generatorStore = {
  getConfig: (): GeneratorConfig => _config,
  getImages: (): GeneratedImage[] => _images,
  getIsGenerating: (): boolean => _isGenerating,

  setConfig: (patch: Partial<GeneratorConfig>): void => {
    _config = { ..._config, ...patch };
    notify();
  },

  setImages: (images: GeneratedImage[]): void => {
    _images = images;
    notify();
  },

  setIsGenerating: (val: boolean): void => {
    _isGenerating = val;
    notify();
  },

  reset: (): void => {
    _config = { ...DEFAULT_CONFIG };
    _images = [];
    _isGenerating = false;
    notify();
  },

  subscribe: (listener: Listener): (() => void) => {
    _listeners.add(listener);
    return () => _listeners.delete(listener);
  }
};
