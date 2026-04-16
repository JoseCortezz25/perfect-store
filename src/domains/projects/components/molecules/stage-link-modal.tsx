'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { projectMessages } from '../../messages';

const msgs = projectMessages.detail.stageModal;

interface StageLinkModalProps {
  isOpen: boolean;
  stageUrl: string;
  onClose: () => void;
}

export function StageLinkModal({ isOpen, stageUrl, onClose }: StageLinkModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onClose();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(stageUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback: select the input
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="modal__card">
        <div className="modal__header">
          <h2 className="modal__title">{msgs.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="modal__close"
            aria-label={msgs.closeLabel}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <p className="modal__subtitle">{msgs.subtitle}</p>

        <div className="stage-modal__url-row">
          <input
            type="text"
            readOnly
            value={stageUrl}
            className="stage-modal__url-input"
            onFocus={e => e.target.select()}
            aria-label="Stage URL"
          />
          <button
            type="button"
            className={`stage-modal__copy-btn${isCopied ? ' stage-modal__copy-btn--copied' : ''}`}
            onClick={handleCopy}
          >
            {isCopied
              ? <><Check size={14} strokeWidth={2} /><span>{msgs.copiedButton}</span></>
              : <><Copy size={14} strokeWidth={1.5} /><span>{msgs.copyButton}</span></>
            }
          </button>
        </div>
      </div>
    </dialog>
  );
}
