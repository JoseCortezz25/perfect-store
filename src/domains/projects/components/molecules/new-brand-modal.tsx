'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { projectMessages } from '../../messages';

const msgs = projectMessages.brandModal;

interface NewBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewBrandModal({ isOpen, onClose }: NewBrandModalProps) {
  const [isPending, setIsPending] = useState(false);

  function handleClose() {
    if (!isPending) onClose();
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) handleClose();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      onClose();
    }, 800);
  }

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal__card">
        <div className="modal__header">
          <h2 className="modal__title">{msgs.title}</h2>
          <button
            type="button"
            onClick={handleClose}
            className="modal__close"
            aria-label="Cerrar"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <p className="modal__subtitle">{msgs.subtitle}</p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form__field">
            <label htmlFor="brand-name" className="modal-form__label">
              {msgs.nameLabel}
            </label>
            <input
              id="brand-name"
              name="name"
              type="text"
              placeholder={msgs.namePlaceholder}
              className="modal-form__input"
              autoFocus
              required
            />
          </div>

          <div className="modal-form__field">
            <label htmlFor="brand-client" className="modal-form__label">
              {msgs.clientLabel}
            </label>
            <input
              id="brand-client"
              name="client"
              type="text"
              placeholder={msgs.clientPlaceholder}
              className="modal-form__input"
            />
          </div>

          <div className="modal-form__actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn--secondary"
            >
              {msgs.cancelButton}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn--primary modal-form__submit"
            >
              {isPending ? msgs.creatingButton : msgs.createButton}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
