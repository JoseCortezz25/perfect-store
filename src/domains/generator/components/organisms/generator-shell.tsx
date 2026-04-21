'use client';

import { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  Upload,
  X,
  Wand2,
  Check,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StepSlider } from '../atoms/step-slider';
import { ChipSelector } from '../atoms/chip-selector';
import { generatorStore } from '../../stores/generator.store';
import { generatorMessages } from '../../messages';
import { MOCK_SKUS, SKU_BRANDS } from '../../generator.repository';
import type {
  ImageAngle,
  ImageIllumination,
  AspectRatio,
  ImageQuality,
  GeneratedImage,
  Sku
} from '../../generator.types';

const msgs = generatorMessages.config;
const ctxMsgs = msgs.context;
const MOCK_ACCENT_COLORS = ['#4361EF', '#A78BFA', '#2DD4BF', '#FBB024'];

const ASPECT_SHAPES: Record<AspectRatio, { w: number; h: number }> = {
  '16:9': { w: 22, h: 13 },
  '4:3': { w: 16, h: 12 },
  '1:1': { w: 13, h: 13 },
  '3:4': { w: 12, h: 16 },
  '9:16': { w: 13, h: 22 }
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
  }
];

/* ── Default advanced values (for dot indicator on Más) ─────────── */
const DEFAULT_ASPECT: AspectRatio = '1:1';
const DEFAULT_QUALITY: ImageQuality = 'medio';
const DEFAULT_DAY_MOMENT = 2;
const DEFAULT_PROMINENCE = 2;

type ToolbarPanel =
  | 'angle'
  | 'illumination'
  | 'aspect'
  | 'quality'
  | 'advanced'
  | null;

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
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const brandDropRef = useRef<HTMLDivElement>(null);
  const skuDropRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

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

  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [brandOpen, setBrandOpen] = useState(false);
  const [skuOpen, setSkuOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [skuSearch, setSkuSearch] = useState('');
  const [toolbarPanel, setToolbarPanel] = useState<ToolbarPanel>(null);
  const [refPanel, setRefPanel] = useState<'angle' | 'illumination' | null>(
    null
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        brandDropRef.current &&
        !brandDropRef.current.contains(e.target as Node)
      ) {
        setBrandOpen(false);
        setBrandSearch('');
      }
      if (
        skuDropRef.current &&
        !skuDropRef.current.contains(e.target as Node)
      ) {
        setSkuOpen(false);
        setSkuSearch('');
      }
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(e.target as Node)
      ) {
        setToolbarPanel(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  function handleRefTileClick(type: 'angle' | 'illumination', key: string) {
    if (type === 'angle') {
      const next = config.angle === key ? null : (key as ImageAngle);
      generatorStore.setConfig({ angle: next });
    } else {
      const next =
        config.illumination === key ? null : (key as ImageIllumination);
      generatorStore.setConfig({ illumination: next });
    }
    setTimeout(() => setRefPanel(null), 220);
  }

  function handleGenerate() {
    if (config.selectedSkus.length === 0) return;
    generatorStore.setIsGenerating(true);
    const images: GeneratedImage[] = Array.from({ length: 4 }, (_, i) => ({
      id: `img-${Date.now()}-${i}`,
      accentColor: MOCK_ACCENT_COLORS[i % MOCK_ACCENT_COLORS.length]
    }));
    setTimeout(() => {
      generatorStore.setImages(images);
      generatorStore.setIsGenerating(false);
      router.push('/generator/results');
    }, 1800);
  }

  const angleLabel = config.angle ? msgs.angle.options[config.angle] : null;
  const illuminationLabel = config.illumination
    ? msgs.illumination.options[config.illumination]
    : null;

  const promptText = buildPrompt(
    angleLabel,
    illuminationLabel,
    config.freeText,
    config.elementChips,
    config.atmosphericChips,
    ctxMsgs.dayMoment.steps[config.dayMoment] ?? '',
    ctxMsgs.prominence.steps[config.prominence] ?? ''
  );

  const canGenerate = config.selectedSkus.length > 0 && !isGenerating;
  const selectedCount = config.selectedSkus.length;

  const hasAdvancedChanges =
    config.aspectRatio !== DEFAULT_ASPECT ||
    config.quality !== DEFAULT_QUALITY ||
    config.dayMoment !== DEFAULT_DAY_MOMENT ||
    config.prominence !== DEFAULT_PROMINENCE;

  const refItems = refPanel === 'angle' ? ANGLE_REFS : ILLUMINATION_REFS;
  const refTitle =
    refPanel === 'angle' ? msgs.angle.label : msgs.illumination.label;

  return (
    <div className="generator-page">
      {/* ════════════════ PAGE TITLE ════════════════ */}
      <div className="section-header">
        <div className="section-header__accent-line" />
        <div className="section-header__body">
          <h1 className="section-header__title">
            {generatorMessages.pageTitle}
          </h1>
          <p className="section-header__subtitle">
            {generatorMessages.pageSubtitle}
          </p>
        </div>
      </div>

      {/* ════════════════ PANELS ════════════════ */}
      <div className="gen-panels">
        {/* ════════════════ LEFT PANEL — SKUs only ════════════════ */}
        <aside className="gen-left">
          <div className="gen-left__body">
            <div className="gen-left__section">
              <p className="gen-left__section-label">Productos</p>

              {/* Brand dropdown */}
              <div className="gen-drop" ref={brandDropRef}>
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
                      ? 'Todas las marcas'
                      : activeBrands.length === 1
                        ? activeBrands[0]
                        : `${activeBrands.length} marcas seleccionadas`}
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

              {/* SKU multi-select dropdown */}
              <div className="gen-drop" ref={skuDropRef}>
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
                      ? `${selectedCount} ${selectedCount === 1 ? 'SKU seleccionado' : 'SKUs seleccionados'}`
                      : 'Seleccionar SKUs...'}
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
                                isSelected && 'brand-filter__checkbox--checked'
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

              {/* Selected SKU chips */}
              {selectedCount > 0 && (
                <div className="gen-sel-chips">
                  {config.selectedSkus.map(sku => (
                    <div key={sku.id} className="gen-sel-chip">
                      <span
                        className="gen-sel-chip__dot"
                        style={{ backgroundColor: sku.accentColor }}
                      />
                      <span className="gen-sel-chip__name">{sku.name}</span>
                      <button
                        type="button"
                        className="gen-sel-chip__rm"
                        onClick={() =>
                          generatorStore.setConfig({
                            selectedSkus: config.selectedSkus.filter(
                              s => s.id !== sku.id
                            )
                          })
                        }
                        aria-label={`Quitar ${sku.name}`}
                      >
                        <X size={9} strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ════════════════ RIGHT PANEL ════════════════ */}
        <div className="gen-right">
          {/* ── Visual reference panel (overlay) ── */}
          {refPanel && (
            <div className="gen-ref-panel">
              <div className="gen-ref-panel__header">
                <span className="gen-ref-panel__title">{refTitle}</span>
                <button
                  type="button"
                  className="gen-ref-panel__close"
                  onClick={() => setRefPanel(null)}
                  aria-label="Cerrar panel de referencias"
                >
                  <X size={14} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              <p className="gen-ref-panel__hint">
                Selecciona una referencia visual para aplicarla
              </p>

              <div className="gen-ref-grid">
                {refItems.map(item => {
                  const isSelected =
                    refPanel === 'angle'
                      ? config.angle === item.key
                      : config.illumination === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      className={cn(
                        'gen-ref-tile',
                        isSelected && 'gen-ref-tile--selected'
                      )}
                      onClick={() => handleRefTileClick(refPanel, item.key)}
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
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Main content ── */}
          <div className="gen-right__inner">
            <h2 className="gen-right__title">{msgs.context.label}</h2>

            <textarea
              className="gen-textarea"
              placeholder={ctxMsgs.freeText.placeholder}
              value={config.freeText}
              rows={3}
              onChange={e =>
                generatorStore.setConfig({ freeText: e.target.value })
              }
              aria-label={ctxMsgs.freeText.label}
            />

            {/* Reference image */}
            <div className="gen-ref">
              <div className="gen-ref__header">
                <span className="gen-ref__label">
                  {msgs.referenceImage.label}
                </span>
                <span className="gen-ref__hint">
                  {msgs.referenceImage.hint}
                </span>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="gen-hidden-input"
                onChange={handleFile}
              />
              {config.referenceImageName ? (
                <div className="gen-file-preview">
                  <span className="gen-file-preview__name">
                    {config.referenceImageName}
                  </span>
                  <button
                    type="button"
                    className="gen-file-preview__remove"
                    onClick={() =>
                      generatorStore.setConfig({ referenceImageName: null })
                    }
                    aria-label={msgs.referenceImage.remove}
                  >
                    <X size={12} strokeWidth={2} />
                    {msgs.referenceImage.remove}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="gen-upload-btn"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload size={14} strokeWidth={1.5} aria-hidden="true" />
                  {msgs.referenceImage.cta}
                </button>
              )}
            </div>

            <div className="gen-right__sep" />

            {/* Chips */}
            <div className="gen-two-col">
              <ChipSelector
                label={ctxMsgs.elements.label}
                options={ctxMsgs.elements.chips}
                selected={config.elementChips}
                onToggle={v => toggleChip('elementChips', v)}
              />
              <ChipSelector
                label={ctxMsgs.atmospheric.label}
                options={ctxMsgs.atmospheric.chips}
                selected={config.atmosphericChips}
                onToggle={v => toggleChip('atmosphericChips', v)}
              />
            </div>

            {/* Prompt preview */}
            <div className="gen-prompt-preview">
              <span className="gen-prompt-preview__label">
                {ctxMsgs.promptPreview.label}
              </span>
              <p className="gen-prompt-preview__text">
                {promptText || ctxMsgs.promptPreview.empty}
              </p>
              <p className="gen-prompt-preview__disclaimer">
                {ctxMsgs.promptPreview.disclaimer}
              </p>
            </div>
          </div>

          {/* ════════════ TOOLBAR ════════════ */}
          <div className="gen-toolbar" ref={toolbarRef}>
            {/* ── Ángulo ── */}
            <div className="gen-toolbar__item">
              <button
                type="button"
                className={cn(
                  'gen-toolbar__btn',
                  toolbarPanel === 'angle' && 'gen-toolbar__btn--active'
                )}
                onClick={() =>
                  setToolbarPanel(p => (p === 'angle' ? null : 'angle'))
                }
              >
                <span className="gen-toolbar__btn-label">
                  {msgs.angle.label}
                </span>
                <span
                  className={cn(
                    'gen-toolbar__btn-value',
                    !config.angle && 'gen-toolbar__btn-value--empty'
                  )}
                >
                  {angleLabel ?? '—'}
                </span>
              </button>

              {toolbarPanel === 'angle' && (
                <div className="gen-toolbar__popover">
                  <div className="gen-param__opts">
                    {(Object.keys(msgs.angle.options) as ImageAngle[]).map(
                      angle => (
                        <button
                          key={angle}
                          type="button"
                          className={cn(
                            'gen-param__btn',
                            config.angle === angle && 'gen-param__btn--on'
                          )}
                          onClick={() =>
                            generatorStore.setConfig({
                              angle: config.angle === angle ? null : angle
                            })
                          }
                        >
                          {msgs.angle.options[angle]}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    type="button"
                    className="gen-ref-trigger gen-ref-trigger--in-popover"
                    onClick={() => {
                      setToolbarPanel(null);
                      setRefPanel('angle');
                    }}
                  >
                    {msgs.angle.viewExamples} →
                  </button>
                </div>
              )}
            </div>

            {/* ── Iluminación ── */}
            <div className="gen-toolbar__item">
              <button
                type="button"
                className={cn(
                  'gen-toolbar__btn',
                  toolbarPanel === 'illumination' && 'gen-toolbar__btn--active'
                )}
                onClick={() =>
                  setToolbarPanel(p =>
                    p === 'illumination' ? null : 'illumination'
                  )
                }
              >
                <span className="gen-toolbar__btn-label">
                  {msgs.illumination.label}
                </span>
                <span
                  className={cn(
                    'gen-toolbar__btn-value',
                    !config.illumination && 'gen-toolbar__btn-value--empty'
                  )}
                >
                  {illuminationLabel ?? '—'}
                </span>
              </button>

              {toolbarPanel === 'illumination' && (
                <div className="gen-toolbar__popover">
                  <div className="gen-param__opts">
                    {(
                      Object.keys(
                        msgs.illumination.options
                      ) as ImageIllumination[]
                    ).map(ill => (
                      <button
                        key={ill}
                        type="button"
                        className={cn(
                          'gen-param__btn',
                          config.illumination === ill && 'gen-param__btn--on'
                        )}
                        onClick={() =>
                          generatorStore.setConfig({
                            illumination:
                              config.illumination === ill ? null : ill
                          })
                        }
                      >
                        {msgs.illumination.options[ill]}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="gen-ref-trigger gen-ref-trigger--in-popover"
                    onClick={() => {
                      setToolbarPanel(null);
                      setRefPanel('illumination');
                    }}
                  >
                    {msgs.illumination.viewExamples} →
                  </button>
                </div>
              )}
            </div>

            <span className="gen-toolbar__sep" aria-hidden="true" />

            {/* ── Relación de aspecto ── */}
            <div className="gen-toolbar__item">
              <button
                type="button"
                className={cn(
                  'gen-toolbar__btn',
                  toolbarPanel === 'aspect' && 'gen-toolbar__btn--active'
                )}
                onClick={() =>
                  setToolbarPanel(p => (p === 'aspect' ? null : 'aspect'))
                }
              >
                <span className="gen-toolbar__btn-label">
                  {msgs.aspectRatio.label}
                </span>
                <span className="gen-toolbar__btn-value">
                  {config.aspectRatio}
                </span>
              </button>

              {toolbarPanel === 'aspect' && (
                <div className="gen-toolbar__popover">
                  <div className="gen-param__opts">
                    {(
                      ['16:9', '4:3', '1:1', '3:4', '9:16'] as AspectRatio[]
                    ).map(ratio => {
                      const shape = ASPECT_SHAPES[ratio];
                      return (
                        <button
                          key={ratio}
                          type="button"
                          className={cn(
                            'gen-param__btn',
                            'gen-param__btn--ratio',
                            config.aspectRatio === ratio && 'gen-param__btn--on'
                          )}
                          onClick={() => {
                            generatorStore.setConfig({ aspectRatio: ratio });
                            setToolbarPanel(null);
                          }}
                        >
                          <span
                            className="gen-ratio-icon"
                            style={{ width: shape.w, height: shape.h }}
                            aria-hidden="true"
                          />
                          {ratio}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── Calidad ── */}
            <div className="gen-toolbar__item">
              <button
                type="button"
                className={cn(
                  'gen-toolbar__btn',
                  toolbarPanel === 'quality' && 'gen-toolbar__btn--active'
                )}
                onClick={() =>
                  setToolbarPanel(p => (p === 'quality' ? null : 'quality'))
                }
              >
                <span className="gen-toolbar__btn-label">
                  {msgs.quality.label}
                </span>
                <span className="gen-toolbar__btn-value">
                  {msgs.quality.options[config.quality]}
                </span>
              </button>

              {toolbarPanel === 'quality' && (
                <div className="gen-toolbar__popover gen-toolbar__popover--sm">
                  <div className="gen-param__opts">
                    {(Object.keys(msgs.quality.options) as ImageQuality[]).map(
                      q => (
                        <button
                          key={q}
                          type="button"
                          className={cn(
                            'gen-param__btn',
                            config.quality === q && 'gen-param__btn--on'
                          )}
                          onClick={() => {
                            generatorStore.setConfig({ quality: q });
                            setToolbarPanel(null);
                          }}
                        >
                          {msgs.quality.options[q]}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <span className="gen-toolbar__sep" aria-hidden="true" />

            {/* ── Más (sliders) ── */}
            <div className="gen-toolbar__item">
              <button
                type="button"
                className={cn(
                  'gen-toolbar__btn',
                  'gen-toolbar__btn--icon',
                  toolbarPanel === 'advanced' && 'gen-toolbar__btn--active'
                )}
                onClick={() =>
                  setToolbarPanel(p => (p === 'advanced' ? null : 'advanced'))
                }
              >
                <SlidersHorizontal
                  size={13}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="gen-toolbar__btn-label">Más</span>
                {hasAdvancedChanges && (
                  <span className="gen-adv-dot" aria-hidden="true" />
                )}
              </button>

              {toolbarPanel === 'advanced' && (
                <div className="gen-toolbar__popover gen-toolbar__popover--advanced">
                  <StepSlider
                    label={ctxMsgs.dayMoment.label}
                    steps={ctxMsgs.dayMoment.steps}
                    value={config.dayMoment}
                    onChange={v => generatorStore.setConfig({ dayMoment: v })}
                  />
                  <StepSlider
                    label={ctxMsgs.prominence.label}
                    steps={ctxMsgs.prominence.steps}
                    value={config.prominence}
                    onChange={v => generatorStore.setConfig({ prominence: v })}
                  />
                </div>
              )}
            </div>

            {/* Spacer */}
            <div className="gen-toolbar__spacer" aria-hidden="true" />

            {/* ── Generate ── */}
            <div className="gen-toolbar__generate">
              {selectedCount === 0 && (
                <p className="gen-cta__hint">{msgs.validationSkus}</p>
              )}
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
          {/* end .gen-toolbar */}
        </div>
        {/* end .gen-right */}
      </div>
      {/* end .gen-panels */}
    </div>
  );
}
