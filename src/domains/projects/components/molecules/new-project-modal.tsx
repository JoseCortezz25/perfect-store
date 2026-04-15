'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { X } from 'lucide-react';
import { createProjectAction } from '../../actions';
import { projectMessages } from '../../messages';

const msgs = projectMessages.modal;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn--primary modal-form__submit">
      {pending ? msgs.creatingButton : msgs.createButton}
    </button>
  );
}

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [state, formAction, isPending] = useActionState(createProjectAction, null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state?.success, onClose]);

  function handleClose() {
    if (!isPending) onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) handleClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={handleBackdropClick}
      onClose={handleClose}
    >
      <div className="modal__card">
        <div className="modal__header">
          <h2 className="modal__title">{msgs.title}</h2>
          <button
            type="button"
            onClick={handleClose}
            className="modal__close"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <p className="modal__subtitle">{msgs.subtitle}</p>

        <form action={formAction} className="modal-form">
          <div className="modal-form__field">
            <label htmlFor="project-name" className="modal-form__label">
              {msgs.nameLabel}
            </label>
            <input
              id="project-name"
              name="name"
              type="text"
              placeholder={msgs.namePlaceholder}
              className="modal-form__input"
              autoFocus
            />
          </div>

          <div className="modal-form__field">
            <label htmlFor="project-brand" className="modal-form__label">
              {msgs.brandLabel}
            </label>
            <input
              id="project-brand"
              name="brand"
              type="text"
              placeholder={msgs.brandPlaceholder}
              className="modal-form__input"
            />
          </div>

          {state?.error && (
            <p className="modal-form__error" role="alert">
              {state.error}
            </p>
          )}

          <div className="modal-form__actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn--secondary"
            >
              {msgs.cancelButton}
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </dialog>
  );
}
