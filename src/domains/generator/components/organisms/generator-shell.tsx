'use client';

import { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronDown,
  X,
  Wand2,
  Check,
  Search,
  Image as ImageIcon,
  Download,
  RefreshCw,
  FolderPlus,
  Plus,
  Minus,
  Aperture,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Cloud,
  Box,
  Package,
  Layers,
  Leaf,
  Mountain,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StepSlider } from '../atoms/step-slider';
import { generatorStore } from '../../stores/generator.store';
import { generatorMessages } from '../../messages';
import { MOCK_SKUS, SKU_BRANDS } from '../../generator.repository';
import { getAllPsProjects } from '@/domains/projects/ps-project-detail.repository';
import type {
  ImageAngle,
  ImageIllumination,
  AspectRatio,
  GeneratedImage,
  Sku
} from '../../generator.types';

const msgs = generatorMessages.config;
const ctxMsgs = msgs.context;
const resMsgs = generatorMessages.results;
const modalMsgs = generatorMessages.projectModal;

const MOCK_ACCENT_COLORS = ['#4361EF', '#A78BFA', '#2DD4BF', '#FBB024'];
const GALLERY_COLORS = [
  '#4361EF',
  '#2DD4BF',
  '#FBB024',
  '#A78BFA',
  '#F87171',
  '#34D399',
  '#60A5FA',
  '#FBBF24'
];
const GALLERY_RATIOS = ['4/3', '3/4', '1/1', '4/5', '3/4', '4/3', '1/1', '4/5'];
const GALLERY_PROMPTS = [
  'frontal · iluminación natural · playa · atardecer dorado · protagonismo destacado',
  'tres cuartos · golden hour · elementos festivos · ambiente tropical',
  'cenital · estudio · fondo blanco · limpio y moderno',
  'frontal · luz dramática · elementos navideños · nieve · ambiente mágico',
  'lateral · natural · campo verde · día soleado · fresco',
  'tres cuartos · contraluz · ciudad · noche · luces urbanas',
  'detalle · estudio · producto solo · fondo neutro · alta definición',
  'isométrico · natural · mercado · colores vibrantes · dinámico'
];

const ASPECT_SHAPES: Record<AspectRatio, { w: number; h: number }> = {
  '1:1': { w: 13, h: 13 },
  '16:9': { w: 22, h: 13 },
  '9:16': { w: 13, h: 22 },
  '4:3': { w: 16, h: 12 },
  '3:4': { w: 12, h: 16 },
  '2:3': { w: 11, h: 17 },
  '1:2': { w: 10, h: 20 },
  '2:1': { w: 22, h: 11 },
  '4:5': { w: 14, h: 17 },
  '3:2': { w: 18, h: 12 }
};

const ASPECT_LABELS: Record<AspectRatio, string> = {
  '1:1': 'Square',
  '16:9': 'Widescreen',
  '9:16': 'Social story',
  '4:3': 'Classic',
  '3:4': 'Traditional',
  '2:3': 'Portrait',
  '1:2': 'Vertical',
  '2:1': 'Horizontal',
  '4:5': 'Social post',
  '3:2': 'Standard'
};

/* ── Reference tile data ─────────────────────────────────────────── */

interface RefItem {
  key: string;
  label: string;
  gradient: string;
}

const ANGLE_REFS: RefItem[] = [
  {
    key: 'frontal',
    label: 'Frontal',
    gradient: 'linear-gradient(180deg, #1A1A2E 0%, #0D0D1A 100%)'
  },
  {
    key: 'tres_cuartos',
    label: '3/4',
    gradient: 'linear-gradient(120deg, #1A2030 0%, #0D1020 100%)'
  },
  {
    key: 'lateral',
    label: 'Lateral',
    gradient: 'linear-gradient(90deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)'
  },
  {
    key: 'cenital',
    label: 'Cenital',
    gradient: 'radial-gradient(ellipse at 50% 10%, #2A2A3A 0%, #0D0D0D 70%)'
  },
  {
    key: 'bajo',
    label: 'Contrapicado',
    gradient: 'radial-gradient(ellipse at 50% 90%, #1E1E30 0%, #0D0D0D 70%)'
  },
  {
    key: 'isometrico',
    label: 'Isométrico',
    gradient: 'linear-gradient(145deg, #1A1A2A 0%, #0D1525 100%)'
  },
  {
    key: 'detalle',
    label: 'Detalle',
    gradient: 'radial-gradient(ellipse at center, #2A2A2A 0%, #0D0D0D 70%)'
  },
  {
    key: 'trasero',
    label: 'Trasero',
    gradient: 'linear-gradient(0deg, #1A1A1A 0%, #0D0D0D 100%)'
  },
  {
    key: 'frontal_b',
    label: 'Frontal bajo',
    gradient: 'linear-gradient(160deg, #0D1A2E 0%, #050A14 100%)'
  },
  {
    key: 'picado',
    label: 'Picado',
    gradient: 'radial-gradient(ellipse at 50% 0%, #1E2030 0%, #080808 80%)'
  },
  {
    key: 'holandés',
    label: 'Holandés',
    gradient: 'linear-gradient(170deg, #181828 0%, #0A0A12 100%)'
  },
  {
    key: 'subjetivo',
    label: 'Subjetivo',
    gradient: 'linear-gradient(200deg, #141420 0%, #050508 100%)'
  }
];

const ILLUMINATION_REFS: RefItem[] = [
  {
    key: 'natural',
    label: 'Natural',
    gradient: 'linear-gradient(180deg, #1A3A5C 0%, #0D1E30 60%, #0A0A0A 100%)'
  },
  {
    key: 'estudio',
    label: 'Estudio',
    gradient: 'linear-gradient(180deg, #2A2A2A 0%, #141414 100%)'
  },
  {
    key: 'golden_hour',
    label: 'Golden Hour',
    gradient: 'linear-gradient(180deg, #FF8C00 0%, #C44B00 60%, #1A0A00 100%)'
  },
  {
    key: 'rembrandt',
    label: 'Rembrandt',
    gradient:
      'radial-gradient(ellipse at 30% 40%, #C87A2A 0%, #4A2800 40%, #0D0800 100%)'
  },
  {
    key: 'contraluz',
    label: 'Contraluz',
    gradient: 'radial-gradient(ellipse at center, #3A3A3A 0%, #000000 65%)'
  },
  {
    key: 'cenital',
    label: 'Cenital',
    gradient: 'linear-gradient(180deg, #3A3A3A 0%, #0D0D0D 55%, #000000 100%)'
  },
  {
    key: 'dramatica',
    label: 'Dramática',
    gradient: 'linear-gradient(135deg, #1A0020 0%, #000000 60%, #200010 100%)'
  },
  {
    key: 'suave',
    label: 'Suave',
    gradient: 'linear-gradient(135deg, #2A2040 0%, #1A1A2A 50%, #202030 100%)'
  },
  {
    key: 'difusa',
    label: 'Difusa',
    gradient: 'linear-gradient(150deg, #2A2A35 0%, #18181F 100%)'
  },
  {
    key: 'lateral_dura',
    label: 'Lateral dura',
    gradient: 'linear-gradient(90deg, #3A3A3A 0%, #050505 55%, #000000 100%)'
  },
  {
    key: 'amanecer',
    label: 'Amanecer',
    gradient: 'linear-gradient(180deg, #FF6B35 0%, #8B1A00 50%, #0A0000 100%)'
  },
  {
    key: 'neon',
    label: 'Neón',
    gradient:
      'radial-gradient(ellipse at 40% 60%, #1A0040 0%, #000020 50%, #000010 100%)'
  }
];

/* ── Gallery ─────────────────────────────────────────────────────── */

interface GalleryItem {
  id: string;
  projectName: string;
  brand: string;
  color: string;
  aspectRatio: string;
  prompt: string;
}

const GALLERY_ITEMS: GalleryItem[] = getAllPsProjects().map((p, i) => ({
  id: p.id,
  projectName: p.name,
  brand: p.brand,
  color: GALLERY_COLORS[i % GALLERY_COLORS.length],
  aspectRatio: GALLERY_RATIOS[i % GALLERY_RATIOS.length],
  prompt: GALLERY_PROMPTS[i % GALLERY_PROMPTS.length]
}));

/* ── Context chip ────────────────────────────────────────────────── */

interface ContextChip {
  key: string;
  label: string;
  color?: string; // accent dot — used for SKU chips
  onRemove: () => void;
}

/* ── Existing projects for add-to-project modal ──────────────────── */

const EXISTING_PROJECTS = getAllPsProjects().map(p => ({
  id: p.id,
  name: p.name,
  brand: p.brand
}));

function buildPrompt(
  angle: string | null,
  illumination: string | null,
  freeText: string,
  elements: string[],
  atmospheric: string[],
  dayStep: string,
  prominenceStep: string
): string {
  const parts: string[] = [];
  if (angle) parts.push(angle.toLowerCase());
  if (illumination) parts.push(illumination.toLowerCase());
  if (elements.length > 0) parts.push(elements.join(', ').toLowerCase());
  if (atmospheric.length > 0) parts.push(atmospheric.join(', ').toLowerCase());
  if (dayStep) parts.push(dayStep.toLowerCase());
  if (prominenceStep) parts.push(prominenceStep.toLowerCase());
  if (freeText.trim()) parts.push(freeText.trim());
  return parts.join(' · ');
}

export function GeneratorShell() {
  const fileRef = useRef<HTMLInputElement>(null);
  const brandDropRef = useRef<HTMLDivElement>(null);
  const skuDropRef = useRef<HTMLDivElement>(null);
  const angleDropRef = useRef<HTMLDivElement>(null);
  const illuminationDropRef = useRef<HTMLDivElement>(null);
  const elementsDropRef = useRef<HTMLDivElement>(null);
  const atmosphericDropRef = useRef<HTMLDivElement>(null);
  const aspectDropRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);

  const config = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getConfig,
    generatorStore.getConfig
  );
  const isGenerating = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getIsGenerating,
    generatorStore.getIsGenerating
  );
  const images = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getImages,
    generatorStore.getImages
  );

  /* ── Dropdown open states ── */
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [brandOpen, setBrandOpen] = useState(false);
  const [skuOpen, setSkuOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [skuSearch, setSkuSearch] = useState('');
  const [angleOpen, setAngleOpen] = useState(false);
  const [illuminationOpen, setIlluminationOpen] = useState(false);
  const [elementsOpen, setElementsOpen] = useState(false);
  const [atmosphericOpen, setAtmosphericOpen] = useState(false);
  const [aspectOpen, setAspectOpen] = useState(false);

  const [refPanel, setRefPanel] = useState<'angle' | 'illumination' | null>(
    null
  );

  /* ── Results panel state ── */
  const [activeImage, setActiveImage] = useState<GeneratedImage | null>(null);
  const [activeGalleryItem, setActiveGalleryItem] =
    useState<GalleryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState<'existing' | 'new'>('existing');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectBrand, setNewProjectBrand] = useState('');

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const targets = [
        {
          ref: brandDropRef,
          close: () => {
            setBrandOpen(false);
            setBrandSearch('');
          }
        },
        {
          ref: skuDropRef,
          close: () => {
            setSkuOpen(false);
            setSkuSearch('');
          }
        },
        { ref: angleDropRef, close: () => setAngleOpen(false) },
        { ref: illuminationDropRef, close: () => setIlluminationOpen(false) },
        { ref: elementsDropRef, close: () => setElementsOpen(false) },
        { ref: atmosphericDropRef, close: () => setAtmosphericOpen(false) },
        { ref: aspectDropRef, close: () => setAspectOpen(false) },
        { ref: qualityRef, close: () => {} }
      ];
      targets.forEach(({ ref, close }) => {
        if (ref.current && !ref.current.contains(e.target as Node)) close();
      });
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── Computed values ── */
  const visibleBrands = brandSearch
    ? SKU_BRANDS.filter(b =>
        b.toLowerCase().includes(brandSearch.toLowerCase())
      )
    : SKU_BRANDS;

  const filteredSkus = MOCK_SKUS.filter(s => {
    const matchBrand =
      activeBrands.length > 0 ? activeBrands.includes(s.brand) : true;
    const matchSearch = skuSearch
      ? s.name.toLowerCase().includes(skuSearch.toLowerCase())
      : true;
    return matchBrand && matchSearch;
  });

  const angleLabel = config.angle ? msgs.angle.options[config.angle] : null;
  const illuminationLabel = config.illumination
    ? msgs.illumination.options[config.illumination]
    : null;

  /* builtContext: all params as readable text — day/prominence included as literal text */
  const dayLabel = ctxMsgs.dayMoment.steps[config.dayMoment] ?? '';
  const promLabel = ctxMsgs.prominence.steps[config.prominence] ?? '';
  const builtContext = buildPrompt(
    angleLabel,
    illuminationLabel,
    '',
    config.elementChips,
    config.atmosphericChips,
    dayLabel,
    promLabel
  );

  /* contextChips: SKU chips first, then angle/illumination/elements/atmospheric
     Day/prominence are part of builtContext text, NOT chips */
  const contextChips: ContextChip[] = [];

  // Selected SKU chips — accent dot shows brand color
  config.selectedSkus.forEach(sku => {
    contextChips.push({
      key: `sku-${sku.id}`,
      label: sku.name,
      color: sku.accentColor,
      onRemove: () =>
        generatorStore.setConfig({
          selectedSkus: config.selectedSkus.filter(s => s.id !== sku.id)
        })
    });
  });
  if (angleLabel) {
    contextChips.push({
      key: 'angle',
      label: angleLabel,
      onRemove: () => generatorStore.setConfig({ angle: null })
    });
  }
  if (illuminationLabel) {
    contextChips.push({
      key: 'illumination',
      label: illuminationLabel,
      onRemove: () => generatorStore.setConfig({ illumination: null })
    });
  }
  config.elementChips.forEach(chip => {
    contextChips.push({
      key: `el-${chip}`,
      label: chip,
      onRemove: () => toggleChip('elementChips', chip)
    });
  });
  config.atmosphericChips.forEach(chip => {
    contextChips.push({
      key: `atm-${chip}`,
      label: chip,
      onRemove: () => toggleChip('atmosphericChips', chip)
    });
  });

  const canGenerate = config.selectedSkus.length > 0 && !isGenerating;
  const selectedCount = config.selectedSkus.length;
  const hasImages = images.length > 0;

  const refItems = refPanel === 'angle' ? ANGLE_REFS : ILLUMINATION_REFS;

  /* ── Handlers ── */
  function toggleSku(sku: Sku) {
    const exists = config.selectedSkus.find(s => s.id === sku.id);
    generatorStore.setConfig({
      selectedSkus: exists
        ? config.selectedSkus.filter(s => s.id !== sku.id)
        : [...config.selectedSkus, sku]
    });
  }

  function toggleChip(
    field: 'elementChips' | 'atmosphericChips',
    value: string
  ) {
    const current = config[field];
    generatorStore.setConfig({
      [field]: current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
    });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) generatorStore.setConfig({ referenceImageName: file.name });
  }

  function handleGenerate() {
    if (config.selectedSkus.length === 0) return;
    generatorStore.setIsGenerating(true);
    const newImages: GeneratedImage[] = Array.from(
      { length: config.imageCount },
      (_, i) => ({
        id: `img-${Date.now()}-${i}`,
        accentColor: MOCK_ACCENT_COLORS[i % MOCK_ACCENT_COLORS.length]
      })
    );
    setTimeout(() => {
      generatorStore.setImages(newImages);
      generatorStore.setIsGenerating(false);
    }, 1800);
  }

  function handleImageCountStep(direction: 'up' | 'down') {
    const current = config.imageCount;
    if (direction === 'up' && current < 8) {
      generatorStore.setConfig({ imageCount: current + 1 });
    } else if (direction === 'down' && current > 1) {
      generatorStore.setConfig({ imageCount: current - 1 });
    }
  }

  function handleRegenerate(img: GeneratedImage) {
    const next = images.map(i =>
      i.id === img.id
        ? {
            ...i,
            accentColor: `hsl(${Math.floor(Math.random() * 360)}, 60%, 40%)`
          }
        : i
    );
    generatorStore.setImages(next);
  }

  function handleDownload(img: GeneratedImage) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = img.accentColor;
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = '#ffffff44';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Perfect Store', 256, 256);
    }
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `perfectstore-${img.id}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function handleDownloadAll() {
    images.forEach(img => handleDownload(img));
  }

  function handleRegenerateAll() {
    const next = images.map(img => ({
      ...img,
      accentColor: `hsl(${Math.floor(Math.random() * 360)}, 60%, 40%)`
    }));
    generatorStore.setImages(next);
  }

  function handleAddConfirm() {
    setShowAddModal(false);
    setSelectedProjectId('');
    setNewProjectName('');
    setNewProjectBrand('');
    setAddMode('existing');
  }

  function handleAddModalClose() {
    setShowAddModal(false);
    setAddMode('existing');
    setSelectedProjectId('');
    setNewProjectName('');
    setNewProjectBrand('');
  }

  const qualityLabel = msgs.quality.options[config.quality];

  /* ════════════════ RENDER ════════════════ */
  return (
    <div className="generator-page">
      {/* ── PAGE HEADER ── */}
      <div className="gen-page-header">
        <div className="gen-page-header__accent" aria-hidden="true" />
        <h1 className="gen-page-header__title">
          {generatorMessages.pageTitle}
        </h1>
      </div>

      {/* ════ UNIFIED PANEL ════ */}
      <div className="gen-unified">
        {/* ════ COL 1 — LEFT (controls + prompt + generate) ════ */}
        <div className="gen-unified__left">
          <div className="gen-left__body">
            {/* ── PRODUCTOS ── */}
            <div className="gen-left__section">
              <p className="gen-left__section-label">Productos</p>
              <div className="gen-left__visual-row">
                {/* Brand dropdown */}
                <div className="gen-drop gen-drop--half" ref={brandDropRef}>
                  <button
                    type="button"
                    className="gen-drop__trigger"
                    data-open={brandOpen}
                    onClick={() => {
                      setBrandOpen(o => !o);
                      setSkuOpen(false);
                      setSkuSearch('');
                    }}
                  >
                    <span className="gen-drop__value">
                      {activeBrands.length === 0
                        ? 'Marcas'
                        : activeBrands.length === 1
                          ? activeBrands[0]
                          : `${activeBrands.length} marcas`}
                    </span>
                    <ChevronDown
                      size={13}
                      strokeWidth={1.5}
                      className="gen-drop__chevron"
                      data-open={brandOpen}
                      aria-hidden="true"
                    />
                  </button>
                  {brandOpen && (
                    <div className="gen-drop__menu">
                      <div className="gen-drop__search">
                        <Search
                          size={12}
                          strokeWidth={1.5}
                          className="gen-drop__search-icon"
                          aria-hidden="true"
                        />
                        <input
                          type="text"
                          className="gen-drop__search-input"
                          placeholder="Buscar marca..."
                          value={brandSearch}
                          onChange={e => setBrandSearch(e.target.value)}
                          autoFocus
                        />
                      </div>
                      {visibleBrands.map(brand => {
                        const isChecked = activeBrands.includes(brand);
                        return (
                          <button
                            key={brand}
                            type="button"
                            className="brand-filter__item"
                            onClick={() =>
                              setActiveBrands(prev =>
                                isChecked
                                  ? prev.filter(b => b !== brand)
                                  : [...prev, brand]
                              )
                            }
                          >
                            <span
                              className={cn(
                                'brand-filter__checkbox',
                                isChecked && 'brand-filter__checkbox--checked'
                              )}
                            >
                              {isChecked && (
                                <Check
                                  size={10}
                                  strokeWidth={3}
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                            {brand}
                          </button>
                        );
                      })}
                      {visibleBrands.length === 0 && (
                        <p className="gen-drop__empty">Sin resultados</p>
                      )}
                      {activeBrands.length > 0 && !brandSearch && (
                        <button
                          type="button"
                          className="brand-filter__item brand-filter__item--clear"
                          onClick={() => {
                            setActiveBrands([]);
                            setBrandOpen(false);
                          }}
                        >
                          Limpiar marcas
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* SKU dropdown */}
                <div
                  className="gen-drop gen-drop--half gen-drop--half-right"
                  ref={skuDropRef}
                >
                  <button
                    type="button"
                    className="gen-drop__trigger"
                    data-open={skuOpen}
                    onClick={() => {
                      setSkuOpen(o => !o);
                      setBrandOpen(false);
                      setBrandSearch('');
                    }}
                  >
                    <span
                      className={cn(
                        'gen-drop__value',
                        selectedCount === 0 && 'gen-drop__value--empty'
                      )}
                    >
                      {selectedCount > 0
                        ? `${selectedCount} ${selectedCount === 1 ? 'SKU' : 'SKUs'}`
                        : 'SKU'}
                    </span>
                    <ChevronDown
                      size={13}
                      strokeWidth={1.5}
                      className="gen-drop__chevron"
                      data-open={skuOpen}
                      aria-hidden="true"
                    />
                  </button>
                  {skuOpen && (
                    <div className="gen-drop__menu gen-drop__menu--sku">
                      <div className="gen-drop__search">
                        <Search
                          size={12}
                          strokeWidth={1.5}
                          className="gen-drop__search-icon"
                          aria-hidden="true"
                        />
                        <input
                          type="text"
                          className="gen-drop__search-input"
                          placeholder="Buscar SKU..."
                          value={skuSearch}
                          onChange={e => setSkuSearch(e.target.value)}
                          autoFocus
                        />
                      </div>
                      {filteredSkus.length === 0 ? (
                        <p className="gen-drop__empty">Sin resultados</p>
                      ) : (
                        filteredSkus.map(sku => {
                          const isSelected = !!config.selectedSkus.find(
                            s => s.id === sku.id
                          );
                          return (
                            <button
                              key={sku.id}
                              type="button"
                              className="brand-filter__item"
                              onClick={() => toggleSku(sku)}
                            >
                              <span
                                className={cn(
                                  'brand-filter__checkbox',
                                  isSelected &&
                                    'brand-filter__checkbox--checked'
                                )}
                              >
                                {isSelected && (
                                  <Check
                                    size={10}
                                    strokeWidth={3}
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                              <span
                                className="gen-sku-opt__avatar"
                                style={{
                                  background: sku.accentColor + '22',
                                  color: sku.accentColor
                                }}
                              >
                                {sku.name.slice(0, 2).toUpperCase()}
                              </span>
                              <span className="gen-sku-opt__info">
                                <span className="gen-sku-opt__name">
                                  {sku.name}
                                </span>
                                <span className="gen-sku-opt__vol">
                                  {sku.volume}
                                </span>
                              </span>
                            </button>
                          );
                        })
                      )}
                      {selectedCount > 0 && (
                        <button
                          type="button"
                          className="brand-filter__item brand-filter__item--clear"
                          onClick={() =>
                            generatorStore.setConfig({ selectedSkus: [] })
                          }
                        >
                          Limpiar selección
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="gen-left__sep" />

            {/* ── VISUAL ── */}
            <div className="gen-left__section">
              <p className="gen-left__section-label">Visual</p>

              {/* Ángulo + Iluminación — side by side */}
              <div className="gen-left__visual-row">
                <div className="gen-drop gen-drop--half" ref={angleDropRef}>
                  <button
                    type="button"
                    className={cn(
                      'gen-box-trigger',
                      config.angle && 'gen-box-trigger--active'
                    )}
                    data-open={angleOpen}
                    onClick={() => {
                      setAngleOpen(o => !o);
                      setIlluminationOpen(false);
                    }}
                  >
                    <Aperture
                      size={14}
                      strokeWidth={1.5}
                      className="gen-box-trigger__icon"
                      aria-hidden="true"
                    />
                    <span className="gen-box-trigger__label">
                      {angleLabel ?? msgs.angle.label}
                    </span>
                    <ChevronDown
                      size={12}
                      strokeWidth={1.5}
                      className="gen-drop__chevron"
                      data-open={angleOpen}
                      aria-hidden="true"
                    />
                  </button>
                  {angleOpen && (
                    <div className="gen-drop__menu gen-drop__menu--visual">
                      {(Object.keys(msgs.angle.options) as ImageAngle[]).map(
                        angle => {
                          const isSelected = config.angle === angle;
                          return (
                            <button
                              key={angle}
                              type="button"
                              className={cn(
                                'gen-visual-item',
                                isSelected && 'gen-visual-item--active'
                              )}
                              onClick={() => {
                                generatorStore.setConfig({
                                  angle: isSelected ? null : angle
                                });
                                setAngleOpen(false);
                              }}
                            >
                              {msgs.angle.options[angle]}
                            </button>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>

                <div
                  className="gen-drop gen-drop--half gen-drop--half-right"
                  ref={illuminationDropRef}
                >
                  <button
                    type="button"
                    className={cn(
                      'gen-box-trigger',
                      config.illumination && 'gen-box-trigger--active'
                    )}
                    data-open={illuminationOpen}
                    onClick={() => {
                      setIlluminationOpen(o => !o);
                      setAngleOpen(false);
                    }}
                  >
                    <Sun
                      size={14}
                      strokeWidth={1.5}
                      className="gen-box-trigger__icon"
                      aria-hidden="true"
                    />
                    <span className="gen-box-trigger__label">
                      {illuminationLabel ?? msgs.illumination.label}
                    </span>
                    <ChevronDown
                      size={12}
                      strokeWidth={1.5}
                      className="gen-drop__chevron"
                      data-open={illuminationOpen}
                      aria-hidden="true"
                    />
                  </button>
                  {illuminationOpen && (
                    <div className="gen-drop__menu gen-drop__menu--visual">
                      {(
                        Object.keys(
                          msgs.illumination.options
                        ) as ImageIllumination[]
                      ).map(ill => {
                        const isSelected = config.illumination === ill;
                        return (
                          <button
                            key={ill}
                            type="button"
                            className={cn(
                              'gen-visual-item',
                              isSelected && 'gen-visual-item--active'
                            )}
                            onClick={() => {
                              generatorStore.setConfig({
                                illumination: isSelected ? null : ill
                              });
                              setIlluminationOpen(false);
                            }}
                          >
                            {msgs.illumination.options[ill]}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="gen-ref-link gen-ref-link--right"
                onClick={() => setRefPanel('angle')}
              >
                Ver referencias
              </button>
            </div>

            <div className="gen-left__sep" />

            {/* ── CONTEXTO ── */}
            <div className="gen-left__section">
              <p className="gen-left__section-label">{ctxMsgs.toolbarLabel}</p>
              <div className="gen-left__visual-row">
                <div className="gen-drop gen-drop--half" ref={elementsDropRef}>
                  <button
                    type="button"
                    className="gen-drop__trigger"
                    data-open={elementsOpen}
                    onClick={() => {
                      setElementsOpen(o => !o);
                      setAtmosphericOpen(false);
                    }}
                  >
                    <span
                      className={cn(
                        'gen-drop__value',
                        config.elementChips.length === 0 &&
                          'gen-drop__value--empty'
                      )}
                    >
                      {config.elementChips.length > 0
                        ? config.elementChips.length === 1
                          ? config.elementChips[0]
                          : `${config.elementChips.length} elementos`
                        : ctxMsgs.elements.label}
                    </span>
                    <ChevronDown
                      size={13}
                      strokeWidth={1.5}
                      className="gen-drop__chevron"
                      data-open={elementsOpen}
                      aria-hidden="true"
                    />
                  </button>
                  {elementsOpen && (
                    <div className="gen-drop__menu gen-drop__menu--visual">
                      {ctxMsgs.elements.chips.map(chip => {
                        const isChecked = config.elementChips.includes(chip);
                        return (
                          <button
                            key={chip}
                            type="button"
                            className="gen-visual-item gen-visual-item--check"
                            onClick={() => toggleChip('elementChips', chip)}
                          >
                            <span
                              className={cn(
                                'gen-visual-checkbox',
                                isChecked && 'gen-visual-checkbox--checked'
                              )}
                            >
                              {isChecked && (
                                <Check
                                  size={9}
                                  strokeWidth={3}
                                  color="#fff"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                            {chip}
                          </button>
                        );
                      })}
                      {config.elementChips.length > 0 && (
                        <button
                          type="button"
                          className="gen-visual-item gen-visual-item--clear"
                          onClick={() =>
                            generatorStore.setConfig({ elementChips: [] })
                          }
                        >
                          Limpiar elementos
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div
                  className="gen-drop gen-drop--half gen-drop--half-right"
                  ref={atmosphericDropRef}
                >
                  <button
                    type="button"
                    className="gen-drop__trigger"
                    data-open={atmosphericOpen}
                    onClick={() => {
                      setAtmosphericOpen(o => !o);
                      setElementsOpen(false);
                    }}
                  >
                    <span
                      className={cn(
                        'gen-drop__value',
                        config.atmosphericChips.length === 0 &&
                          'gen-drop__value--empty'
                      )}
                    >
                      {config.atmosphericChips.length > 0
                        ? config.atmosphericChips.length === 1
                          ? config.atmosphericChips[0]
                          : `${config.atmosphericChips.length} ambientes`
                        : ctxMsgs.atmospheric.label}
                    </span>
                    <ChevronDown
                      size={13}
                      strokeWidth={1.5}
                      className="gen-drop__chevron"
                      data-open={atmosphericOpen}
                      aria-hidden="true"
                    />
                  </button>
                  {atmosphericOpen && (
                    <div className="gen-drop__menu gen-drop__menu--visual">
                      {ctxMsgs.atmospheric.chips.map(chip => {
                        const isChecked =
                          config.atmosphericChips.includes(chip);
                        return (
                          <button
                            key={chip}
                            type="button"
                            className="gen-visual-item gen-visual-item--check"
                            onClick={() => toggleChip('atmosphericChips', chip)}
                          >
                            <span
                              className={cn(
                                'gen-visual-checkbox',
                                isChecked && 'gen-visual-checkbox--checked'
                              )}
                            >
                              {isChecked && (
                                <Check
                                  size={9}
                                  strokeWidth={3}
                                  color="#fff"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                            {chip}
                          </button>
                        );
                      })}
                      {config.atmosphericChips.length > 0 && (
                        <button
                          type="button"
                          className="gen-visual-item gen-visual-item--clear"
                          onClick={() =>
                            generatorStore.setConfig({ atmosphericChips: [] })
                          }
                        >
                          Limpiar atmósfera
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="gen-left__sep" />

            <div className="gen-left__section">
              <StepSlider
                label={ctxMsgs.dayMoment.label}
                icons={[
                  <Sunrise key="sunrise" size={12} strokeWidth={1.5} />,
                  <Sun key="sun-sm" size={12} strokeWidth={1.5} />,
                  <Sun key="sun-lg" size={14} strokeWidth={2} />,
                  <Cloud key="cloud" size={12} strokeWidth={1.5} />,
                  <Sunset key="sunset" size={12} strokeWidth={1.5} />,
                  <Moon key="moon" size={12} strokeWidth={1.5} />
                ]}
                steps={ctxMsgs.dayMoment.steps}
                value={config.dayMoment}
                onChange={v => generatorStore.setConfig({ dayMoment: v })}
              />
            </div>

            <div className="gen-left__sep" />

            <div className="gen-left__section">
              <StepSlider
                label={ctxMsgs.prominence.label}
                icons={[
                  <Box key="box" size={12} strokeWidth={1.5} />,
                  <Package key="package" size={12} strokeWidth={1.5} />,
                  <Layers key="layers" size={12} strokeWidth={1.5} />,
                  <Leaf key="leaf" size={12} strokeWidth={1.5} />,
                  <Mountain key="mountain" size={12} strokeWidth={1.5} />
                ]}
                steps={ctxMsgs.prominence.steps}
                value={config.prominence}
                onChange={v => generatorStore.setConfig({ prominence: v })}
              />
            </div>

            <div className="gen-left__sep" />

            {/* ── PROMPT / CONTEXTO ── */}
            <div className="gen-left__section">
              <p className="gen-left__section-label">
                {ctxMsgs.freeText.label}
              </p>
              <div className="gen-chat-wrap">
                {contextChips.length > 0 && (
                  <div className="gen-ctx-chips gen-ctx-chips--inside">
                    {contextChips.map(chip => (
                      <div key={chip.key} className="gen-ctx-chip">
                        {chip.color && (
                          <span
                            className="gen-ctx-chip__dot"
                            style={{ backgroundColor: chip.color }}
                            aria-hidden="true"
                          />
                        )}
                        <span className="gen-ctx-chip__label">
                          {chip.label}
                        </span>
                        <button
                          type="button"
                          className="gen-ctx-chip__rm"
                          onClick={chip.onRemove}
                          aria-label={`Quitar ${chip.label}`}
                        >
                          <X size={9} strokeWidth={2.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <textarea
                  className="gen-textarea gen-textarea--panel"
                  placeholder={ctxMsgs.freeText.placeholder}
                  value={config.freeText}
                  onChange={e =>
                    generatorStore.setConfig({ freeText: e.target.value })
                  }
                  aria-label={ctxMsgs.freeText.label}
                />
                {builtContext && (
                  <div className="gen-chat-context">
                    <p className="gen-chat-context__text">{builtContext}</p>
                  </div>
                )}

                {/* ── Chat footer: upload + aspect ratio + image count ── */}
                <div className="gen-chat-footer">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="gen-hidden-input"
                    onChange={handleFile}
                  />

                  {/* Upload / file preview */}
                  {config.referenceImageName ? (
                    <div className="gen-chat-footer__file">
                      <ImageIcon
                        size={12}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span className="gen-chat-footer__file-name">
                        {config.referenceImageName}
                      </span>
                      <button
                        type="button"
                        className="gen-chat-footer__file-rm"
                        onClick={() =>
                          generatorStore.setConfig({ referenceImageName: null })
                        }
                        aria-label={msgs.referenceImage.remove}
                      >
                        <X size={10} strokeWidth={2} aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="gen-chat-footer__btn gen-chat-footer__btn--icon"
                      onClick={() => fileRef.current?.click()}
                      aria-label={msgs.referenceImage.cta}
                    >
                      <ImageIcon
                        size={13}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  {/* Aspect ratio */}
                  <div className="gen-drop" ref={aspectDropRef}>
                    <button
                      type="button"
                      className="gen-chat-footer__btn"
                      data-open={aspectOpen}
                      onClick={() => setAspectOpen(o => !o)}
                    >
                      <span
                        className="gen-ratio-icon"
                        style={{
                          width:
                            ASPECT_SHAPES[config.aspectRatio ?? '1:1'].w * 0.65,
                          height:
                            ASPECT_SHAPES[config.aspectRatio ?? '1:1'].h * 0.65
                        }}
                        aria-hidden="true"
                      />
                      {config.aspectRatio}
                      <ChevronDown
                        size={10}
                        strokeWidth={1.5}
                        className="gen-drop__chevron"
                        data-open={aspectOpen}
                        aria-hidden="true"
                      />
                    </button>
                    {aspectOpen && (
                      <div className="gen-drop__menu gen-drop__menu--visual gen-drop__menu--up gen-drop__menu--ratio">
                        {(Object.keys(ASPECT_SHAPES) as AspectRatio[]).map(
                          ratio => {
                            const shape = ASPECT_SHAPES[ratio];
                            const isSelected = config.aspectRatio === ratio;
                            return (
                              <button
                                key={ratio}
                                type="button"
                                className={cn(
                                  'gen-visual-item gen-visual-item--ratio',
                                  isSelected && 'gen-visual-item--active'
                                )}
                                onClick={() => {
                                  generatorStore.setConfig({
                                    aspectRatio: ratio
                                  });
                                  setAspectOpen(false);
                                }}
                              >
                                <span
                                  className="gen-ratio-icon gen-ratio-icon--sm"
                                  style={{
                                    width: shape.w * 0.75,
                                    height: shape.h * 0.75
                                  }}
                                  aria-hidden="true"
                                />
                                <span className="gen-visual-item__ratio-value">
                                  {ratio}
                                </span>
                                <span className="gen-visual-item__ratio-label">
                                  {ASPECT_LABELS[ratio]}
                                </span>
                              </button>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>

                  {/* Image count stepper */}
                  <div className="gen-chat-footer__stepper">
                    <button
                      type="button"
                      className="gen-chat-footer__stepper-btn"
                      onClick={() => handleImageCountStep('down')}
                      aria-label="Reducir cantidad"
                      disabled={config.imageCount <= 1}
                    >
                      <Minus size={10} strokeWidth={2} aria-hidden="true" />
                    </button>
                    <span className="gen-chat-footer__stepper-val">
                      {config.imageCount}
                    </span>
                    <button
                      type="button"
                      className="gen-chat-footer__stepper-btn"
                      onClick={() => handleImageCountStep('up')}
                      aria-label="Aumentar cantidad"
                      disabled={config.imageCount >= 8}
                    >
                      <Plus size={10} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CTA — generate ── */}
            <button
              type="button"
              className="btn btn--primary gen-gen-btn"
              onClick={handleGenerate}
              disabled={!canGenerate}
            >
              {isGenerating ? (
                <span className="gen-gen-btn__loading">
                  <span className="gen-gen-btn__spinner" aria-hidden="true" />
                  {msgs.generateBtnLoading}
                </span>
              ) : (
                <>
                  <Wand2 size={15} strokeWidth={1.5} aria-hidden="true" />
                  {msgs.generateBtn}
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── VERTICAL DIVIDER ── */}
        <div className="gen-unified__divider" aria-hidden="true" />

        {/* ════ COL 2 — RESULTS PANEL ════ */}
        <div className="gen-unified__right">
          {/* Top — blank state or generated images */}
          <div className="gen-results__top">
            {hasImages ? (
              <div className="gen-results-imgs">
                <div className="gen-results-imgs__header">
                  <p className="gen-results-imgs__count">
                    {images.length}{' '}
                    {images.length === 1
                      ? resMsgs.imageSingular
                      : resMsgs.imagePlural}
                  </p>
                  <div className="gen-results-imgs__actions">
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={handleRegenerateAll}
                    >
                      <RefreshCw
                        size={12}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      {resMsgs.regenerateAll}
                    </button>
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={handleDownloadAll}
                    >
                      <Download
                        size={12}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      {resMsgs.downloadAll}
                    </button>
                    <button
                      type="button"
                      className="btn btn--primary gen-results-action-btn--cta"
                      onClick={() => setShowAddModal(true)}
                    >
                      <FolderPlus
                        size={12}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      {resMsgs.addToProject}
                    </button>
                  </div>
                </div>
                <div className="gen-results-grid">
                  {images.map((img, idx) => (
                    <div key={img.id} className="result-img">
                      <button
                        type="button"
                        className="result-img__btn"
                        aria-label={resMsgs.imageAlt(idx + 1)}
                      >
                        <img
                          src="/Images/Placceholder-Image.png"
                          alt={resMsgs.imageAlt(idx + 1)}
                          className="result-img__placeholder"
                        />
                      </button>
                      <div
                        className="result-img__overlay"
                        onClick={() => setActiveImage(img)}
                        role="button"
                        aria-label={resMsgs.imageAlt(idx + 1)}
                      >
                        <div
                          className="result-img__pill result-img__pill--top"
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="result-img__pill-btn"
                            aria-label="Me gusta"
                          >
                            <ThumbsUp size={13} strokeWidth={1.5} />
                          </button>
                          <span
                            className="result-img__pill-sep"
                            aria-hidden="true"
                          />
                          <button
                            type="button"
                            className="result-img__pill-btn"
                            aria-label="No me gusta"
                          >
                            <ThumbsDown size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                        <div
                          className="result-img__pill result-img__pill--bottom"
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="result-img__pill-btn"
                            onClick={() => handleDownload(img)}
                            aria-label={resMsgs.download}
                          >
                            <Download size={13} strokeWidth={1.5} />
                          </button>
                          <span
                            className="result-img__pill-sep"
                            aria-hidden="true"
                          />
                          <button
                            type="button"
                            className="result-img__pill-btn"
                            onClick={() => handleRegenerate(img)}
                            aria-label={resMsgs.regenerate}
                          >
                            <RefreshCw size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="gen-results-empty">
                <Wand2
                  size={36}
                  strokeWidth={1}
                  className="gen-results-empty__icon"
                  aria-hidden="true"
                />
                <p className="gen-results-empty__title">
                  {resMsgs.emptyState.title}
                </p>
                <p className="gen-results-empty__sub">
                  {resMsgs.emptyState.subtitle}
                </p>
              </div>
            )}
          </div>

          {/* Bottom ~25% — past project images gallery */}
          {GALLERY_ITEMS.length > 0 && (
            <div className="gen-gallery">
              <p className="gen-gallery__label">{resMsgs.galleryTitle}</p>
              <div className="gen-gallery__grid">
                {GALLERY_ITEMS.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className="gen-gallery-item"
                    onClick={() => setActiveGalleryItem(item)}
                    aria-label={item.projectName}
                  >
                    <img
                      src="/Images/Placceholder-Image.png"
                      alt=""
                      className="gen-gallery-item__thumb"
                      style={{ aspectRatio: item.aspectRatio }}
                      aria-hidden="true"
                    />
                    <p className="gen-gallery-item__name">{item.projectName}</p>
                    <p className="gen-gallery-item__brand">{item.brand}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ════ REFERENCE MODAL — full-screen overlay with tabs ════ */}
      {refPanel &&
        createPortal(
          <div
            className="gen-ref-modal"
            onClick={() => setRefPanel(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="gen-ref-modal__box"
              onClick={e => e.stopPropagation()}
            >
              <div className="gen-ref-modal__header">
                <span className="gen-ref-modal__title">
                  {msgs.visualReferences}
                </span>
                <button
                  type="button"
                  className="gen-modal__close"
                  onClick={() => setRefPanel(null)}
                  aria-label="Cerrar panel de referencias"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
              <div className="gen-ref-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={refPanel === 'angle'}
                  className={cn(
                    'gen-ref-tab',
                    refPanel === 'angle' && 'gen-ref-tab--active'
                  )}
                  onClick={() => setRefPanel('angle')}
                >
                  {msgs.angle.label}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={refPanel === 'illumination'}
                  className={cn(
                    'gen-ref-tab',
                    refPanel === 'illumination' && 'gen-ref-tab--active'
                  )}
                  onClick={() => setRefPanel('illumination')}
                >
                  {msgs.illumination.label}
                </button>
              </div>
              <div className="gen-ref-grid">
                {refItems.map(item => {
                  const isSelected =
                    refPanel === 'angle'
                      ? config.angle === item.key
                      : config.illumination === item.key;
                  return (
                    <div
                      key={item.key}
                      className={cn(
                        'gen-ref-tile gen-ref-tile--readonly',
                        isSelected && 'gen-ref-tile--selected'
                      )}
                      aria-label={item.label}
                    >
                      <span
                        className="gen-ref-tile__img"
                        style={{ background: item.gradient }}
                        aria-hidden="true"
                      />
                      <span className="gen-ref-tile__label">{item.label}</span>
                      {isSelected && (
                        <span
                          className="gen-ref-tile__check"
                          aria-hidden="true"
                        >
                          <Check size={10} strokeWidth={2.5} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ════ IMAGE DETAIL MODAL ════ */}
      {activeImage &&
        createPortal(
          <div
            className="gen-modal-overlay"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={resMsgs.modal.title}
          >
            <div
              className="gen-modal gen-modal--ps-detail"
              onClick={e => e.stopPropagation()}
            >
              <div className="pd-modal-layout">
                <div className="pd-modal-image">
                  <img
                    src="/Images/Placceholder-Image.png"
                    alt=""
                    className="pd-modal-image__preview"
                    aria-hidden="true"
                  />
                </div>
                <div className="pd-modal-info">
                  <div className="pd-modal-info__header">
                    <h2 className="pd-modal-info__title">
                      {resMsgs.modal.title}
                    </h2>
                    <button
                      type="button"
                      className="gen-modal__close"
                      onClick={() => setActiveImage(null)}
                      aria-label={resMsgs.modal.close}
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="pd-modal-info__body">
                    {config.freeText && (
                      <div className="pd-modal-prompt">
                        <span className="pd-modal-prompt__label">
                          {resMsgs.modal.params.prompt}
                        </span>
                        <p className="pd-modal-prompt__text">
                          {config.freeText}
                        </p>
                      </div>
                    )}
                    <div className="pd-modal-sep" />
                    <div className="pd-modal-params">
                      <div className="pd-modal-param">
                        <span className="pd-modal-param__key">
                          {resMsgs.modal.params.skus}
                        </span>
                        <span className="pd-modal-param__val">
                          {config.selectedSkus.map(s => s.name).join(', ') ||
                            '—'}
                        </span>
                      </div>
                      <div className="pd-modal-param">
                        <span className="pd-modal-param__key">
                          {resMsgs.modal.params.angle}
                        </span>
                        <span className="pd-modal-param__val">
                          {angleLabel ?? '—'}
                        </span>
                      </div>
                      <div className="pd-modal-param">
                        <span className="pd-modal-param__key">
                          {resMsgs.modal.params.aspect}
                        </span>
                        <span className="pd-modal-param__val">
                          {config.aspectRatio}
                        </span>
                      </div>
                      <div className="pd-modal-param">
                        <span className="pd-modal-param__key">
                          {resMsgs.modal.params.quality}
                        </span>
                        <span className="pd-modal-param__val">
                          {qualityLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pd-modal-info__footer">
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={() => setActiveImage(null)}
                    >
                      {resMsgs.modal.close}
                    </button>
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => {
                        handleDownload(activeImage);
                        setActiveImage(null);
                      }}
                    >
                      <Download
                        size={14}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      {resMsgs.download}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ════ GALLERY ITEM MODAL — igual al modal de detalle de proyecto ════ */}
      {activeGalleryItem &&
        createPortal(
          <div
            className="gen-modal-overlay"
            onClick={() => setActiveGalleryItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeGalleryItem.projectName}
          >
            <div
              className="gen-modal gen-modal--ps-detail"
              onClick={e => e.stopPropagation()}
            >
              <div className="pd-modal-layout">
                {/* Left: image preview */}
                <div className="pd-modal-image">
                  <img
                    src="/Images/Placceholder-Image.png"
                    alt=""
                    className="pd-modal-image__preview"
                    aria-hidden="true"
                  />
                </div>

                {/* Right: details */}
                <div className="pd-modal-info">
                  <div className="pd-modal-info__header">
                    <h2 className="pd-modal-info__title">
                      {activeGalleryItem.projectName}
                    </h2>
                    <button
                      type="button"
                      className="gen-modal__close"
                      onClick={() => setActiveGalleryItem(null)}
                      aria-label={resMsgs.modal.close}
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="pd-modal-info__body">
                    <div className="pd-modal-prompt">
                      <span className="pd-modal-prompt__label">
                        {resMsgs.modal.params.prompt}
                      </span>
                      <p className="pd-modal-prompt__text">
                        {activeGalleryItem.prompt}
                      </p>
                    </div>

                    <div className="pd-modal-sep" />

                    <div className="pd-modal-params">
                      <div className="pd-modal-param">
                        <span className="pd-modal-param__key">
                          {resMsgs.modal.params.project}
                        </span>
                        <span className="pd-modal-param__val">
                          {activeGalleryItem.projectName}
                        </span>
                      </div>
                      <div className="pd-modal-param">
                        <span className="pd-modal-param__key">
                          {resMsgs.modal.params.brand}
                        </span>
                        <span className="pd-modal-param__val">
                          {activeGalleryItem.brand}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pd-modal-info__footer">
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={() => setActiveGalleryItem(null)}
                    >
                      {resMsgs.modal.close}
                    </button>
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => setActiveGalleryItem(null)}
                    >
                      <Download
                        size={14}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      {resMsgs.download}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ════ ADD TO PROJECT MODAL ════ */}
      {showAddModal &&
        createPortal(
          <div
            className="gen-modal-overlay"
            onClick={handleAddModalClose}
            role="dialog"
            aria-modal="true"
            aria-label={resMsgs.addToProject}
          >
            <div
              className="gen-modal gen-modal--add-project"
              onClick={e => e.stopPropagation()}
            >
              <div className="gen-modal__header">
                <h2 className="gen-modal__title">{resMsgs.addToProject}</h2>
                <button
                  type="button"
                  className="gen-modal__close"
                  onClick={handleAddModalClose}
                  aria-label={modalMsgs.cancel}
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
              <div className="results-add-tabs">
                <button
                  type="button"
                  className={cn(
                    'results-add-tab',
                    addMode === 'existing' && 'results-add-tab--active'
                  )}
                  onClick={() => setAddMode('existing')}
                >
                  {modalMsgs.selectLabel}
                </button>
                <button
                  type="button"
                  className={cn(
                    'results-add-tab',
                    addMode === 'new' && 'results-add-tab--active'
                  )}
                  onClick={() => setAddMode('new')}
                >
                  <Plus size={12} strokeWidth={2} aria-hidden="true" />
                  {modalMsgs.orCreate}
                </button>
              </div>
              {addMode === 'existing' ? (
                <div className="gen-modal__field">
                  <label
                    className="gen-modal__label"
                    htmlFor="add-project-select"
                  >
                    {modalMsgs.selectLabel}
                  </label>
                  <select
                    id="add-project-select"
                    className="gen-modal__select"
                    value={selectedProjectId}
                    onChange={e => setSelectedProjectId(e.target.value)}
                  >
                    <option value="">{modalMsgs.selectPlaceholder}</option>
                    {EXISTING_PROJECTS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.brand}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className="gen-modal__field">
                    <label
                      className="gen-modal__label"
                      htmlFor="add-project-name"
                    >
                      {modalMsgs.newNameLabel}
                    </label>
                    <input
                      id="add-project-name"
                      type="text"
                      className="gen-modal__input"
                      placeholder={modalMsgs.newNamePlaceholder}
                      value={newProjectName}
                      onChange={e => setNewProjectName(e.target.value)}
                    />
                  </div>
                  <div className="gen-modal__field">
                    <label
                      className="gen-modal__label"
                      htmlFor="add-project-brand"
                    >
                      {modalMsgs.newBrandLabel}
                    </label>
                    <input
                      id="add-project-brand"
                      type="text"
                      className="gen-modal__input"
                      placeholder="Ej: Bretaña"
                      value={newProjectBrand}
                      onChange={e => setNewProjectBrand(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="gen-modal__footer">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleAddModalClose}
                >
                  {modalMsgs.cancel}
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleAddConfirm}
                  disabled={
                    addMode === 'existing'
                      ? !selectedProjectId
                      : !newProjectName.trim()
                  }
                >
                  {modalMsgs.confirm}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
