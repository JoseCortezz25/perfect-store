'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { RefreshCw, Download, X, ArrowLeft } from 'lucide-react';
import { projectMessages } from '../../messages';
import type {
  PsProjectDetail,
  PsGeneratedImage,
  GenerationSession
} from '../../projects.types';

const msgs = projectMessages.psDetail;

function buildFallbackPrompt(
  skus: string[],
  imageType: string,
  angle: string
): string {
  const product = skus[0] ?? 'producto Postobón';
  return `Botella de ${product} en primer plano sobre arena fina de playa caribeña colombiana al atardecer, agua turquesa completamente desenfocada al fondo, gotas de condensación sobre el vidrio frío refractando la luz dorada del sol, palmeras y vegetación tropical fuera de foco creando encuadre natural, ${imageType.toLowerCase()}, perspectiva ${angle.toLowerCase()}, iluminación de hora dorada cálida y saturada con rayos rasantes sobre el empaque, lente 85mm f/1.8, fotografía comercial de producto premium, estética lifestyle veraniego colombiano, colores vibrantes y altamente saturados, sombra suave del producto sobre la arena`;
}

interface PsProjectDetailShellProps {
  project: PsProjectDetail;
}

function formatSessionDate(date: Date): string {
  return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' });
}

function formatCreatedAt(date: Date): string {
  return date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

interface ActiveImageState {
  image: PsGeneratedImage;
  session: GenerationSession;
  index: number;
}

export function PsProjectDetailShell({ project }: PsProjectDetailShellProps) {
  const router = useRouter();
  const [sessions, setSessions] = useState<GenerationSession[]>(
    project.sessions
  );
  const [activeImageState, setActiveImageState] =
    useState<ActiveImageState | null>(null);

  function handleRegenerate(sessionId: string, img: PsGeneratedImage) {
    setSessions(prev =>
      prev.map(s =>
        s.id === sessionId
          ? {
              ...s,
              images: s.images.map(i =>
                i.id === img.id
                  ? {
                      ...i,
                      accentColor: `hsl(${Math.floor(Math.random() * 360)}, 55%, 42%)`
                    }
                  : i
              )
            }
          : s
      )
    );
  }

  function handleDownload(img: PsGeneratedImage) {
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

  const totalImages = sessions.reduce((sum, s) => sum + s.images.length, 0);

  return (
    <>
      <div className="pd-page">
        {/* Back nav */}
        <button
          type="button"
          className="pd-back-btn"
          onClick={() => router.push('/projects')}
          aria-label={msgs.backButton}
        >
          <ArrowLeft size={13} strokeWidth={1.5} aria-hidden="true" />
          {msgs.backButton}
        </button>

        {/* Header row: section-header + CTA */}
        <div className="pd-header-row">
          <div className="section-header">
            <div className="section-header__accent-line" />
            <div className="section-header__body">
              <h1 className="section-header__title">{project.name}</h1>
              <p className="section-header__subtitle">
                {totalImages}{' '}
                {totalImages === 1 ? 'imagen generada' : 'imágenes generadas'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn--primary"
            onClick={() => router.push(`/generator?project=${project.id}`)}
          >
            {msgs.generateMore}
          </button>
        </div>

        {/* Metadata row */}
        <div className="pd-meta">
          <span className="pd-meta__item">{project.brand}</span>
          <span className="pd-meta__sep">{msgs.metaSeparator}</span>
          <span className="pd-meta__item">{project.skus.join(', ')}</span>
          <span className="pd-meta__sep">{msgs.metaSeparator}</span>
          <span className="pd-meta__item">
            {formatCreatedAt(project.createdAt)}
          </span>
        </div>

        {/* Chronological image feed */}
        <div className="pd-feed">
          {sessions.map(session => (
            <div key={session.id} className="pd-session">
              {/* Session divider */}
              <div className="pd-session-divider">
                <span className="pd-session-divider__label">
                  {msgs.sessionDivider(
                    formatSessionDate(session.generatedAt),
                    session.images.length
                  )}
                </span>
                <div className="pd-session-divider__line" aria-hidden="true" />
              </div>

              {/* Image grid — 3 columns via .pd-feed override */}
              <div className="results-grid">
                {session.images.map((img, idx) => (
                  <div key={img.id} className="result-card">
                    <button
                      type="button"
                      className="result-card__image-btn"
                      onClick={() =>
                        setActiveImageState({ image: img, session, index: idx })
                      }
                      aria-label={msgs.imageAlt(idx + 1)}
                    >
                      <img
                        src="/Images/Placceholder-Image.png"
                        alt={msgs.imageAlt(idx + 1)}
                        className="result-card__placeholder"
                      />
                    </button>
                    <div className="result-card__actions">
                      <button
                        type="button"
                        className="result-action-btn"
                        onClick={() => handleRegenerate(session.id, img)}
                        title={msgs.regenerate}
                        aria-label={msgs.regenerate}
                      >
                        <RefreshCw size={14} strokeWidth={1.5} />
                        <span>{msgs.regenerate}</span>
                      </button>
                      <button
                        type="button"
                        className="result-action-btn result-action-btn--primary"
                        onClick={() => handleDownload(img)}
                        title={msgs.download}
                        aria-label={msgs.download}
                      >
                        <Download size={14} strokeWidth={1.5} />
                        <span>{msgs.download}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image detail modal — wide two-column layout */}
      {activeImageState && createPortal(
        <div
          className="gen-modal-overlay"
          onClick={() => setActiveImageState(null)}
          role="dialog"
          aria-modal="true"
          aria-label={msgs.modal.title}
        >
          <div
            className="gen-modal gen-modal--ps-detail"
            onClick={e => e.stopPropagation()}
          >
            <div className="pd-modal-layout">
              {/* Left: large image */}
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
                  <h2 className="pd-modal-info__title">{msgs.modal.title}</h2>
                  <button
                    type="button"
                    className="gen-modal__close"
                    onClick={() => setActiveImageState(null)}
                    aria-label={msgs.modal.close}
                  >
                    <X size={16} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="pd-modal-info__body">
                  {/* Prompt — always visible */}
                  <div className="pd-modal-prompt">
                    <span className="pd-modal-prompt__label">
                      {msgs.modal.params.prompt}
                    </span>
                    <p className="pd-modal-prompt__text">
                      {activeImageState.session.params.freeText ??
                        buildFallbackPrompt(
                          activeImageState.session.params.skus,
                          activeImageState.session.params.imageType,
                          activeImageState.session.params.angle
                        )}
                    </p>
                  </div>
                  <div className="pd-modal-sep" />

                  {/* Flat params list */}
                  <div className="pd-modal-params">
                    <div className="pd-modal-param">
                      <span className="pd-modal-param__key">
                        {msgs.modal.params.skus}
                      </span>
                      <span className="pd-modal-param__val">
                        {activeImageState.session.params.skus.join(', ')}
                      </span>
                    </div>
                    <div className="pd-modal-param">
                      <span className="pd-modal-param__key">
                        {msgs.modal.params.type}
                      </span>
                      <span className="pd-modal-param__val">
                        {activeImageState.session.params.imageType}
                      </span>
                    </div>
                    <div className="pd-modal-param">
                      <span className="pd-modal-param__key">
                        {msgs.modal.params.angle}
                      </span>
                      <span className="pd-modal-param__val">
                        {activeImageState.session.params.angle}
                      </span>
                    </div>
                    <div className="pd-modal-param">
                      <span className="pd-modal-param__key">
                        {msgs.modal.params.aspect}
                      </span>
                      <span className="pd-modal-param__val">
                        {activeImageState.session.params.aspectRatio}
                      </span>
                    </div>
                    <div className="pd-modal-param">
                      <span className="pd-modal-param__key">
                        {msgs.modal.params.quality}
                      </span>
                      <span className="pd-modal-param__val">
                        {activeImageState.session.params.quality}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pd-modal-info__footer">
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => setActiveImageState(null)}
                  >
                    {msgs.modal.close}
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => {
                      handleDownload(activeImageState.image);
                      setActiveImageState(null);
                    }}
                  >
                    <Download size={14} strokeWidth={1.5} aria-hidden="true" />
                    {msgs.download}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
