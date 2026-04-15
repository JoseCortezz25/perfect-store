'use client';

import { useState } from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { PreviewToolbar } from '../molecules/preview-toolbar';
import { PreviewCanvas } from './preview-canvas';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import type { BannerPiece } from '../../projects.types';
import type { PreviewBackground } from '../molecules/preview-toolbar';

interface PreviewTabProps {
  piece: BannerPiece | null;
}

export function PreviewTab({ piece }: PreviewTabProps) {
  const { canClientApprove } = useCurrentUser();
  const [background, setBackground] = useState<PreviewBackground>('dark');
  const [reloadKey, setReloadKey] = useState(0);
  const [clientDecision, setClientDecision] = useState<'approved' | 'correction' | null>(null);

  return (
    <div className="preview-right-panel">
      <div className="preview-right-panel__canvas-wrap">
        <PreviewCanvas
          piece={piece}
          background={background}
          reloadKey={reloadKey}
        />
        <PreviewToolbar
          background={background}
          onBackgroundChange={setBackground}
          onReload={() => setReloadKey(k => k + 1)}
          selectedPiece={piece}
        />
      </div>

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
