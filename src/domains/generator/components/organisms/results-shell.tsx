'use client';

import { useState, useSyncExternalStore, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  RefreshCw,
  Download,
  X,
  ArrowLeft,
  FolderPlus,
  Plus,
  ChevronDown
} from 'lucide-react';
import { generatorStore } from '../../stores/generator.store';
import { generatorMessages } from '../../messages';
import { getAllPsProjects } from '@/domains/projects/ps-project-detail.repository';
import type { GeneratedImage } from '../../generator.types';

const msgs = generatorMessages.results;
const cfgMsgs = generatorMessages.config;
const modalMsgs = generatorMessages.projectModal;

const EXISTING_PROJECTS = getAllPsProjects().map(p => ({
  id: p.id,
  name: p.name,
  brand: p.brand
}));

const ALL_BRANDS = Array.from(
  new Set(EXISTING_PROJECTS.map(p => p.brand))
).sort();

export function ResultsShell() {
  const router = useRouter();
  const images = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getImages,
    generatorStore.getImages
  );
  const config = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getConfig,
    generatorStore.getConfig
  );

  const [activeImage, setActiveImage] = useState<GeneratedImage | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState<'existing' | 'new'>('existing');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isProjectDropOpen, setIsProjectDropOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectBrand, setNewProjectBrand] = useState('');
  const [isBrandDropOpen, setIsBrandDropOpen] = useState(false);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('');
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(false);
  const projDropRef = useRef<HTMLDivElement>(null);
  const brandDropRef = useRef<HTMLDivElement>(null);
  const brandFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        projDropRef.current &&
        !projDropRef.current.contains(e.target as Node)
      ) {
        setIsProjectDropOpen(false);
      }
      if (
        brandDropRef.current &&
        !brandDropRef.current.contains(e.target as Node)
      ) {
        setIsBrandDropOpen(false);
      }
      if (
        brandFilterRef.current &&
        !brandFilterRef.current.contains(e.target as Node)
      ) {
        setIsBrandFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  function handleAddConfirm() {
    // Mock: just close modal
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
    setIsProjectDropOpen(false);
    setSelectedBrandFilter('');
    setIsBrandFilterOpen(false);
    setNewProjectName('');
    setNewProjectBrand('');
    setIsBrandDropOpen(false);
  }

  const angleLabel = config.angle ? cfgMsgs.angle.options[config.angle] : '—';
  const qualityLabel = cfgMsgs.quality.options[config.quality];

  return (
    <>
      <div className="results-page">
        <div className="results-body">
          {/* ── Header row: back + add CTA ── */}
          <div className="results-header">
            <button
              type="button"
              className="pd-back-btn"
              onClick={() => router.push('/generator')}
            >
              <ArrowLeft size={13} strokeWidth={1.5} aria-hidden="true" />
              {msgs.back}
            </button>
            <button
              type="button"
              className="btn btn--secondary results-add-btn"
              onClick={() => setShowAddModal(true)}
            >
              <FolderPlus size={14} strokeWidth={1.5} aria-hidden="true" />
              {msgs.addToProject}
            </button>
          </div>

          {/* ── Section title ── */}
          <div className="section-header">
            <div className="section-header__accent-line" />
            <div className="section-header__body">
              <h1 className="section-header__title">{msgs.title}</h1>
              <p className="section-header__subtitle">
                {images.length}{' '}
                {images.length === 1 ? 'imagen generada' : 'imágenes generadas'}
              </p>
            </div>
          </div>

          {/* ── Images grid — no card container ── */}
          <div className="results-grid">
            {images.map((img, idx) => (
              <div key={img.id} className="result-img">
                <button
                  type="button"
                  className="result-img__btn"
                  onClick={() => setActiveImage(img)}
                  aria-label={msgs.imageAlt(idx + 1)}
                >
                  <div
                    className="result-img__placeholder"
                    style={{
                      backgroundColor: img.accentColor + '33',
                      borderColor: img.accentColor + '55'
                    }}
                  >
                    <span
                      className="result-img__num"
                      style={{ color: img.accentColor }}
                    >
                      {idx + 1}
                    </span>
                  </div>
                </button>
                <div className="result-img__overlay">
                  <button
                    type="button"
                    className="result-img__action"
                    onClick={() => handleRegenerate(img)}
                    aria-label={msgs.regenerate}
                  >
                    <RefreshCw size={13} strokeWidth={1.5} />
                    {msgs.regenerate}
                  </button>
                  <button
                    type="button"
                    className="result-img__action result-img__action--primary"
                    onClick={() => handleDownload(img)}
                    aria-label={msgs.download}
                  >
                    <Download size={13} strokeWidth={1.5} />
                    {msgs.download}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ Image detail modal ════ */}
      {activeImage &&
        createPortal(
          <div
            className="gen-modal-overlay"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={msgs.modal.title}
          >
            <div
              className="gen-modal gen-modal--image"
              onClick={e => e.stopPropagation()}
            >
              <div className="gen-modal__header">
                <h2 className="gen-modal__title">{msgs.modal.title}</h2>
                <button
                  type="button"
                  className="gen-modal__close"
                  onClick={() => setActiveImage(null)}
                  aria-label={msgs.modal.close}
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              <div
                className="gen-modal__image-preview"
                style={{
                  backgroundColor: activeImage.accentColor + '33',
                  borderColor: activeImage.accentColor + '55'
                }}
                aria-hidden="true"
              >
                <span
                  style={{
                    color: activeImage.accentColor,
                    fontSize: 64,
                    fontWeight: 700
                  }}
                >
                  AI
                </span>
              </div>

              <div className="gen-modal__params">
                <div className="gen-modal__param">
                  <span className="gen-modal__param-key">
                    {msgs.modal.params.skus}
                  </span>
                  <span className="gen-modal__param-val">
                    {config.selectedSkus.map(s => s.name).join(', ') || '—'}
                  </span>
                </div>
                <div className="gen-modal__param">
                  <span className="gen-modal__param-key">
                    {msgs.modal.params.angle}
                  </span>
                  <span className="gen-modal__param-val">{angleLabel}</span>
                </div>
                <div className="gen-modal__param">
                  <span className="gen-modal__param-key">
                    {msgs.modal.params.channel}
                  </span>
                  <span className="gen-modal__param-val">
                    {config.channels.map(c => c.channel).join(', ') || '—'}
                  </span>
                </div>
                <div className="gen-modal__param">
                  <span className="gen-modal__param-key">
                    {msgs.modal.params.quality}
                  </span>
                  <span className="gen-modal__param-val">{qualityLabel}</span>
                </div>
                {config.freeText && (
                  <div className="gen-modal__param gen-modal__param--full">
                    <span className="gen-modal__param-key">
                      {msgs.modal.params.prompt}
                    </span>
                    <span className="gen-modal__param-val">
                      {config.freeText}
                    </span>
                  </div>
                )}
              </div>

              <div className="gen-modal__footer">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setActiveImage(null)}
                >
                  {msgs.modal.close}
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    handleDownload(activeImage);
                    setActiveImage(null);
                  }}
                >
                  <Download size={14} strokeWidth={1.5} aria-hidden="true" />
                  {msgs.download}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ════ Add to project modal ════ */}
      {showAddModal &&
        createPortal(
          <div
            className="gen-modal-overlay"
            onClick={handleAddModalClose}
            role="dialog"
            aria-modal="true"
            aria-label={msgs.addToProject}
          >
            <div
              className="gen-modal gen-modal--add-project"
              onClick={e => e.stopPropagation()}
            >
              <div className="gen-modal__header">
                <h2 className="gen-modal__title">{msgs.addToProject}</h2>
                <button
                  type="button"
                  className="gen-modal__close"
                  onClick={handleAddModalClose}
                  aria-label={modalMsgs.cancel}
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Mode tabs */}
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

              {/* Tab content */}
              {addMode === 'existing' ? (
                <>
                  <div className="gen-modal__field">
                    <label className="gen-modal__label">
                      {modalMsgs.newBrandLabel}
                    </label>
                    <div className="gen-proj-drop" ref={brandFilterRef}>
                      <button
                        type="button"
                        className={cn(
                          'gen-proj-drop__trigger',
                          !selectedBrandFilter &&
                            'gen-proj-drop__trigger--placeholder'
                        )}
                        data-open={isBrandFilterOpen}
                        onClick={() => setIsBrandFilterOpen(o => !o)}
                      >
                        <span>
                          {selectedBrandFilter || 'Seleccionar marca...'}
                        </span>
                        <ChevronDown
                          size={13}
                          strokeWidth={1.5}
                          className="gen-proj-drop__chevron"
                          data-open={isBrandFilterOpen}
                          aria-hidden="true"
                        />
                      </button>
                      {isBrandFilterOpen && (
                        <div className="gen-proj-drop__dropdown">
                          {ALL_BRANDS.map(brand => (
                            <button
                              key={brand}
                              type="button"
                              className="gen-proj-drop__option"
                              data-active={selectedBrandFilter === brand}
                              onClick={() => {
                                setSelectedBrandFilter(brand);
                                setSelectedProjectId('');
                                setIsBrandFilterOpen(false);
                              }}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="gen-modal__field">
                    <label className="gen-modal__label">
                      {modalMsgs.selectLabel}
                    </label>
                    <div className="gen-proj-drop" ref={projDropRef}>
                      <button
                        type="button"
                        className={cn(
                          'gen-proj-drop__trigger',
                          !selectedProjectId &&
                            'gen-proj-drop__trigger--placeholder'
                        )}
                        data-open={isProjectDropOpen}
                        onClick={() => setIsProjectDropOpen(o => !o)}
                      >
                        <span>
                          {selectedProjectId
                            ? (() => {
                                const p = EXISTING_PROJECTS.find(
                                  x => x.id === selectedProjectId
                                );
                                return p ? p.name : modalMsgs.selectPlaceholder;
                              })()
                            : modalMsgs.selectPlaceholder}
                        </span>
                        <ChevronDown
                          size={13}
                          strokeWidth={1.5}
                          className="gen-proj-drop__chevron"
                          data-open={isProjectDropOpen}
                          aria-hidden="true"
                        />
                      </button>
                      {isProjectDropOpen && (
                        <div className="gen-proj-drop__dropdown">
                          {(selectedBrandFilter
                            ? EXISTING_PROJECTS.filter(
                                p => p.brand === selectedBrandFilter
                              )
                            : EXISTING_PROJECTS
                          ).map(p => (
                            <button
                              key={p.id}
                              type="button"
                              className="gen-proj-drop__option"
                              data-active={selectedProjectId === p.id}
                              onClick={() => {
                                setSelectedProjectId(p.id);
                                setIsProjectDropOpen(false);
                              }}
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
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
                    <label className="gen-modal__label">
                      {modalMsgs.newBrandLabel}
                    </label>
                    <div className="gen-proj-drop" ref={brandDropRef}>
                      <button
                        type="button"
                        className={cn(
                          'gen-proj-drop__trigger',
                          !newProjectBrand &&
                            'gen-proj-drop__trigger--placeholder'
                        )}
                        data-open={isBrandDropOpen}
                        onClick={() => setIsBrandDropOpen(o => !o)}
                      >
                        <span>{newProjectBrand || 'Seleccionar marca...'}</span>
                        <ChevronDown
                          size={13}
                          strokeWidth={1.5}
                          className="gen-proj-drop__chevron"
                          data-open={isBrandDropOpen}
                          aria-hidden="true"
                        />
                      </button>
                      {isBrandDropOpen && (
                        <div className="gen-proj-drop__dropdown">
                          {ALL_BRANDS.map(brand => (
                            <button
                              key={brand}
                              type="button"
                              className="gen-proj-drop__option"
                              data-active={newProjectBrand === brand}
                              onClick={() => {
                                setNewProjectBrand(brand);
                                setIsBrandDropOpen(false);
                              }}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
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
    </>
  );
}
