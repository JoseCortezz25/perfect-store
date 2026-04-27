'use client';

import { useState } from 'react';
import {
  Clapperboard,
  Image as ImageIcon,
  Check,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { projectMessages } from '../../messages';
import type { BannerPiece } from '../../projects.types';

const msgs = projectMessages.detail.preview;
const qcMsgs = projectMessages.detail.qcActions;
const rejectMsgs = projectMessages.detail.qcActions.rejectComment;

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
  onReject?: (ids: string[], comment: string) => void;
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
  onReject
}: PieceListPanelProps) {
  const [pendingRejectIds, setPendingRejectIds] = useState<string[] | null>(
    null
  );
  const [rejectComment, setRejectComment] = useState('');

  const checkedCount = checkedIds?.size ?? 0;
  const allChecked = pieces.length > 0 && checkedCount === pieces.length;
  const someChecked = checkedCount > 0 && !allChecked;

  function handleRejectClick(ids: string[]) {
    setPendingRejectIds(ids);
    setRejectComment('');
  }

  function handleConfirmReject() {
    if (!pendingRejectIds) return;
    onReject?.(pendingRejectIds, rejectComment);
    setPendingRejectIds(null);
    setRejectComment('');
  }

  function handleCancelReject() {
    setPendingRejectIds(null);
    setRejectComment('');
  }

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
            className={cn(
              'piece-item__checkbox',
              allChecked && 'piece-item__checkbox--checked',
              !allChecked && someChecked && 'piece-item__checkbox--partial'
            )}
            onClick={() => (allChecked ? onClearAll?.() : onSelectAll?.())}
          >
            {allChecked && (
              <Check size={9} strokeWidth={3} aria-hidden="true" />
            )}
            {someChecked && (
              <span className="piece-item__checkbox-dash" aria-hidden="true" />
            )}
          </span>
        )}
        {msgs.piecesTitle}
        <span className="piece-list__count">{pieces.length}</span>
      </h3>

      {/* Rejection comment form — shown while pending confirmation */}
      {pendingRejectIds ? (
        <div className="piece-list__reject-form">
          <span className="piece-list__reject-count">
            {rejectMsgs.rejecting(pendingRejectIds.length)}
          </span>
          <p className="piece-list__reject-label">
            {rejectMsgs.label}{' '}
            <span className="piece-list__reject-optional">
              {rejectMsgs.optional}
            </span>
          </p>
          <textarea
            className="piece-list__reject-textarea"
            placeholder={rejectMsgs.placeholder}
            value={rejectComment}
            onChange={e => setRejectComment(e.target.value)}
            rows={3}
            autoFocus
          />
          <div className="piece-list__reject-actions">
            <button
              type="button"
              className="piece-list__reject-cancel"
              onClick={handleCancelReject}
            >
              {rejectMsgs.cancel}
            </button>
            <button
              type="button"
              className="piece-list__reject-confirm"
              onClick={handleConfirmReject}
            >
              <XCircle size={11} strokeWidth={2} aria-hidden="true" />
              {rejectMsgs.confirm}
            </button>
          </div>
        </div>
      ) : showCheckboxes && checkedCount > 0 ? (
        /* Bulk action bar */
        <div className="piece-list__action-bar">
          <span className="piece-list__action-count">
            {qcMsgs.selected(checkedCount)}
          </span>
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
              onClick={() => handleRejectClick(Array.from(checkedIds ?? []))}
            >
              <XCircle size={12} strokeWidth={2} aria-hidden="true" />
              {qcMsgs.reject}
            </button>
          </div>
        </div>
      ) : null}

      <div className="piece-list__items">
        {pieces.map(piece => {
          const isChecked = checkedIds?.has(piece.id) ?? false;
          const decision = pieceDecisions?.get(piece.id);
          return (
            <div
              key={piece.id}
              role="button"
              tabIndex={0}
              className={cn(
                'piece-item',
                selectedId === piece.id && 'piece-item--selected'
              )}
              onClick={() => onSelect(piece.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(piece.id);
                }
              }}
            >
              {showCheckboxes && (
                <span
                  role="checkbox"
                  aria-checked={isChecked}
                  className={cn(
                    'piece-item__checkbox',
                    isChecked && 'piece-item__checkbox--checked'
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    onToggleCheck?.(piece.id);
                  }}
                >
                  {isChecked && (
                    <Check size={9} strokeWidth={3} aria-hidden="true" />
                  )}
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
                  <span
                    className={cn(
                      'piece-item__anim',
                      piece.hasAnimation && 'piece-item__anim--yes'
                    )}
                  >
                    {piece.hasAnimation ? (
                      <>
                        <Clapperboard
                          size={10}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        {msgs.animated}
                      </>
                    ) : (
                      <>
                        <ImageIcon
                          size={10}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        {msgs.static}
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Decision icon — shown once a QC decision exists */}
              {decision ? (
                <span
                  className={cn(
                    'piece-item__decision',
                    `piece-item__decision--${decision}`
                  )}
                  aria-label={
                    decision === 'approved' ? 'Aprobada' : 'Rechazada'
                  }
                >
                  {decision === 'approved' ? (
                    <CheckCircle size={14} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <XCircle size={14} strokeWidth={2} aria-hidden="true" />
                  )}
                </span>
              ) : showCheckboxes ? (
                /* Inline approve / reject — visible on hover, hidden once decided */
                <span
                  className="piece-item__qc-actions"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="piece-item__qc-btn piece-item__qc-btn--approve"
                    title={qcMsgs.approve}
                    aria-label={qcMsgs.approve}
                    onClick={e => {
                      e.stopPropagation();
                      onApprove?.([piece.id]);
                    }}
                  >
                    <CheckCircle size={13} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="piece-item__qc-btn piece-item__qc-btn--reject"
                    title={qcMsgs.reject}
                    aria-label={qcMsgs.reject}
                    onClick={e => {
                      e.stopPropagation();
                      handleRejectClick([piece.id]);
                    }}
                  >
                    <XCircle size={13} strokeWidth={2} aria-hidden="true" />
                  </button>
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
