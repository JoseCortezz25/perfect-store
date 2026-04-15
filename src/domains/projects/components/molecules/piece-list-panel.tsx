'use client';

import { Clapperboard, Image as ImageIcon, Check, CheckCircle, XCircle } from 'lucide-react';
import { projectMessages } from '../../messages';
import type { BannerPiece } from '../../projects.types';

const msgs = projectMessages.detail.preview;
const qcMsgs = projectMessages.detail.qcActions;

interface PieceListPanelProps {
  pieces: BannerPiece[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  showCheckboxes?: boolean;
  checkedIds?: Set<string>;
  onToggleCheck?: (id: string) => void;
  onSelectAll?: () => void;
  onClearAll?: () => void;
  pieceDecisions?: Map<string, 'approved' | 'rejected'>;
  onApprove?: (ids: string[]) => void;
  onReject?: (ids: string[]) => void;
}

export function PieceListPanel({
  pieces,
  selectedId,
  onSelect,
  showCheckboxes = false,
  checkedIds,
  onToggleCheck,
  onSelectAll,
  onClearAll,
  pieceDecisions,
  onApprove,
  onReject,
}: PieceListPanelProps) {
  const checkedCount = checkedIds?.size ?? 0;
  const allChecked = pieces.length > 0 && checkedCount === pieces.length;
  const someChecked = checkedCount > 0 && !allChecked;

  if (pieces.length === 0) {
    return (
      <div className="piece-list">
        <h3 className="piece-list__title">{msgs.piecesTitle}</h3>
        <p className="piece-list__empty">{msgs.noPieces}</p>
      </div>
    );
  }

  return (
    <div className="piece-list">
      <h3 className="piece-list__title">
        {showCheckboxes && (
          <span
            role="checkbox"
            aria-checked={allChecked ? true : someChecked ? 'mixed' : false}
            aria-label={qcMsgs.selectAll}
            className={`piece-item__checkbox${allChecked ? ' piece-item__checkbox--checked' : someChecked ? ' piece-item__checkbox--partial' : ''}`}
            onClick={() => allChecked ? onClearAll?.() : onSelectAll?.()}
          >
            {allChecked && <Check size={9} strokeWidth={3} aria-hidden="true" />}
            {someChecked && <span className="piece-item__checkbox-dash" aria-hidden="true" />}
          </span>
        )}
        {msgs.piecesTitle}
        <span className="piece-list__count">{pieces.length}</span>
      </h3>

      {/* Action bar — appears when pieces are selected */}
      {showCheckboxes && checkedCount > 0 && (
        <div className="piece-list__action-bar">
          <span className="piece-list__action-count">{qcMsgs.selected(checkedCount)}</span>
          <div className="piece-list__action-btns">
            <button
              type="button"
              className="piece-list__action-btn piece-list__action-btn--approve"
              onClick={() => onApprove?.(Array.from(checkedIds ?? []))}
            >
              <CheckCircle size={12} strokeWidth={2} aria-hidden="true" />
              {qcMsgs.approve}
            </button>
            <button
              type="button"
              className="piece-list__action-btn piece-list__action-btn--reject"
              onClick={() => onReject?.(Array.from(checkedIds ?? []))}
            >
              <XCircle size={12} strokeWidth={2} aria-hidden="true" />
              {qcMsgs.reject}
            </button>
          </div>
        </div>
      )}

      <div className="piece-list__items">
        {pieces.map(piece => {
          const isChecked = checkedIds?.has(piece.id) ?? false;
          return (
            <button
              key={piece.id}
              type="button"
              className={`piece-item${selectedId === piece.id ? ' piece-item--selected' : ''}`}
              onClick={() => onSelect(piece.id)}
            >
              {showCheckboxes && (
                <span
                  role="checkbox"
                  aria-checked={isChecked}
                  className={`piece-item__checkbox${isChecked ? ' piece-item__checkbox--checked' : ''}`}
                  onClick={e => { e.stopPropagation(); onToggleCheck?.(piece.id); }}
                >
                  {isChecked && <Check size={9} strokeWidth={3} aria-hidden="true" />}
                </span>
              )}
              <div
                className="piece-item__thumb"
                aria-hidden="true"
                style={{ backgroundColor: piece.accentColor ?? '#1e3a8a' }}
              />
              <div className="piece-item__info">
                <p className="piece-item__name">{piece.name}</p>
                <div className="piece-item__meta">
                  <span className="piece-item__size">{piece.size}</span>
                  <span className={`piece-item__anim${piece.hasAnimation ? ' piece-item__anim--yes' : ''}`}>
                    {piece.hasAnimation
                      ? <><Clapperboard size={10} strokeWidth={1.5} aria-hidden="true" />{msgs.animated}</>
                      : <><ImageIcon size={10} strokeWidth={1.5} aria-hidden="true" />{msgs.static}</>
                    }
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
