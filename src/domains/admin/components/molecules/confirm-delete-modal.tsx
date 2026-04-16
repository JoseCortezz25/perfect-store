'use client';

import { X, Trash2 } from 'lucide-react';
import { adminMessages } from '../../messages';

interface ConfirmDeleteModalProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  closeLabel?: string;
  variant?: 'destructive' | 'confirm';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  title,
  description,
  confirmLabel,
  cancelLabel,
  closeLabel = adminMessages.nav.close,
  variant = 'destructive',
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div
        className="admin-modal admin-modal--narrow"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <div className="admin-modal__header">
          <h2 id="confirm-modal-title" className="admin-modal__title">{title}</h2>
          <button type="button" className="admin-modal__close" onClick={onCancel} aria-label={closeLabel}>
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <p className="admin-modal__description">{description}</p>

        <div className="admin-modal__footer admin-modal__footer--full">
          <button type="button" className="btn btn--secondary admin-modal__cancel admin-modal__btn-half" onClick={onCancel}>
            {cancelLabel}
          </button>
          {variant === 'destructive' ? (
            <button
              type="button"
              className="btn btn--primary admin-modal__btn-half"
              onClick={onConfirm}
            >
              <Trash2 size={13} strokeWidth={1.5} aria-hidden="true" />
              {confirmLabel}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--primary admin-modal__btn-half"
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
