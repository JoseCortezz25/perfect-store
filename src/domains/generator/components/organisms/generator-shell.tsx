'use client';

import { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Upload, X, Wand2, Check, Search } from 'lucide-react';
import { StepSlider } from '../atoms/step-slider';
import { ChipSelector } from '../atoms/chip-selector';
import { generatorStore } from '../../stores/generator.store';
import { generatorMessages } from '../../messages';
import { MOCK_SKUS, SKU_BRANDS } from '../../generator.repository';
import type {
  ImageAngle,
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

function buildPrompt(
  freeText: string,
  elements: string[],
  atmospheric: string[],
  dayStep: string,
  prominenceStep: string
): string {
  const parts: string[] = [];
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

  const promptText = buildPrompt(
    config.freeText,
    config.elementChips,
    config.atmosphericChips,
    ctxMsgs.dayMoment.steps[config.dayMoment] ?? '',
    ctxMsgs.prominence.steps[config.prominence] ?? ''
  );
  const canGenerate = config.selectedSkus.length > 0 && !isGenerating;
  const selectedCount = config.selectedSkus.length;

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
        {/* ════════════════ LEFT PANEL ════════════════ */}
        <aside className="gen-left">
          <div className="gen-left__body">
            {/* ── Productos ── */}
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
                            className={`brand-filter__checkbox${isChecked ? 'brand-filter__checkbox--checked' : ''}`}
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
                    className={`gen-drop__value${selectedCount === 0 ? 'gen-drop__value--empty' : ''}`}
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
                              className={`brand-filter__checkbox${isSelected ? 'brand-filter__checkbox--checked' : ''}`}
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

              {/* Selected chips */}
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

            <div className="gen-left__sep" />

            {/* ── Formato ── */}
            <div className="gen-left__section">
              <p className="gen-left__section-label">Formato</p>

              <div className="gen-param">
                <span className="gen-param__label">{msgs.angle.label}</span>
                <div className="gen-param__opts">
                  {(Object.keys(msgs.angle.options) as ImageAngle[]).map(
                    angle => (
                      <button
                        key={angle}
                        type="button"
                        className={`gen-param__btn${config.angle === angle ? 'gen-param__btn--on' : ''}`}
                        onClick={() => generatorStore.setConfig({ angle })}
                      >
                        {msgs.angle.options[angle]}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="gen-param">
                <span className="gen-param__label">
                  {msgs.aspectRatio.label}
                </span>
                <div className="gen-param__opts">
                  {(['16:9', '4:3', '1:1', '3:4', '9:16'] as AspectRatio[]).map(
                    ratio => {
                      const shape = ASPECT_SHAPES[ratio];
                      return (
                        <button
                          key={ratio}
                          type="button"
                          className={`gen-param__btn gen-param__btn--ratio${config.aspectRatio === ratio ? 'gen-param__btn--on' : ''}`}
                          onClick={() =>
                            generatorStore.setConfig({ aspectRatio: ratio })
                          }
                        >
                          <span
                            className="gen-ratio-icon"
                            style={{ width: shape.w, height: shape.h }}
                            aria-hidden="true"
                          />
                          {ratio}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="gen-param">
                <span className="gen-param__label">{msgs.quality.label}</span>
                <div className="gen-param__opts">
                  {(Object.keys(msgs.quality.options) as ImageQuality[]).map(
                    q => (
                      <button
                        key={q}
                        type="button"
                        className={`gen-param__btn${config.quality === q ? 'gen-param__btn--on' : ''}`}
                        onClick={() => generatorStore.setConfig({ quality: q })}
                      >
                        {msgs.quality.options[q]}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ════════════════ RIGHT PANEL ════════════════ */}
        <div className="gen-right">
          <div className="gen-right__inner">
            {/* Section label */}
            <h2 className="gen-right__title">{msgs.context.label}</h2>

            {/* Free text */}
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

            {/* Reference image — directly after description */}
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

            {/* Sliders */}
            <div className="gen-two-col">
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

            {/* Generate CTA */}
            <div className="gen-cta">
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
        </div>
      </div>
      {/* end .gen-panels */}
    </div>
  );
}
