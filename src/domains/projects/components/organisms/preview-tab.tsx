'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, MessageSquare, X } from 'lucide-react';
import { PreviewToolbar } from '../molecules/preview-toolbar';
import { PreviewCanvas } from './preview-canvas';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import { projectMessages } from '../../messages';
import type { BannerPiece } from '../../projects.types';
import type { PreviewBackground } from '../molecules/preview-toolbar';

const msgs = projectMessages.detail.preview;

interface PreviewTabProps {
  piece: BannerPiece | null;
}

export function PreviewTab({ piece }: PreviewTabProps) {
  const { canClientApprove } = useCurrentUser();
  const [background, setBackground] = useState<PreviewBackground>('dark');
  const [reloadKey, setReloadKey] = useState(0);
  const [clientDecision, setClientDecision] = useState<'approved' | 'correction' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* Close fullscreen on Escape */
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsFullscreen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen]);

  return (
    <div className="preview-right-panel">

      {/* ── Static toolbar bar: piece info left, controls right ── */}
      <PreviewToolbar
        background={background}
        onBackgroundChange={setBackground}
        onReload={() => setReloadKey(k => k + 1)}
        onFullscreen={() => setIsFullscreen(true)}
        selectedPiece={piece}
      />

      {/* ── Canvas (no toolbar inside) ── */}
      <div className="preview-right-panel__canvas-wrap">
        <PreviewCanvas
          piece={piece}
          background={background}
          reloadKey={reloadKey}
        />
      </div>

      {/* ── Fullscreen overlay — portaled to body to escape stacking contexts ── */}
      {isFullscreen && piece && mounted && createPortal(
        <div className="preview-fullscreen" role="dialog" aria-modal="true" aria-label={piece.name}>
          <div className="preview-fullscreen__topbar">
            <div className="preview-fullscreen__info">
              <p className="preview-fullscreen__name">{piece.name}</p>
              <p className="preview-fullscreen__size">{piece.size}</p>
            </div>
            <button
              type="button"
              className="preview-fullscreen__close"
              onClick={() => setIsFullscreen(false)}
              aria-label={msgs.toolbar.exitFullscreen}
            >
              <X size={13} strokeWidth={2} aria-hidden="true" />
              {msgs.toolbar.exitFullscreen}
            </button>
          </div>
          <div className="preview-fullscreen__canvas-wrap">
            <PreviewCanvas
              piece={piece}
              background={background}
              reloadKey={reloadKey}
              trueSize
            />
          </div>
        </div>,
        document.body
      )}

      {/* ── Client approval bar ── */}
      {canClientApprove && (
        <div className="client-approval-bar">
          {clientDecision ? (
            <div className={`client-approval-bar__feedback client-approval-bar__feedback--${clientDecision}`}>
              {clientDecision === 'approved'
                ? '✓ Piezas aprobadas para producción'
                : '✎ Correcciones solicitadas al equipo'}
              <button
                type="button"
                className="client-approval-bar__undo"
                onClick={() => setClientDecision(null)}
              >
                Cambiar
              </button>
            </div>
          ) : (
            <>
              <p className="client-approval-bar__label">¿Apruebas estas piezas?</p>
              <div className="client-approval-bar__actions">
                <button
                  type="button"
                  className="btn btn--primary client-approval-bar__btn"
                  onClick={() => setClientDecision('approved')}
                >
                  <CheckCircle size={15} strokeWidth={1.5} aria-hidden="true" />
                  Aprobar para producción
                </button>
                <button
                  type="button"
                  className="btn btn--secondary client-approval-bar__btn"
                  onClick={() => setClientDecision('correction')}
                >
                  <MessageSquare size={15} strokeWidth={1.5} aria-hidden="true" />
                  Solicitar corrección
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
