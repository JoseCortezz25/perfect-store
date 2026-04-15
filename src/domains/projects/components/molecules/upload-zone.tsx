'use client';

import { useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { UploadCloud, File } from 'lucide-react';
import { uploadVersionAction } from '../../project-detail.actions';
import { projectMessages } from '../../messages';

const msgs = projectMessages.detail.validador;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn--primary upload-zone__submit">
      {pending ? msgs.submittingButton : msgs.submitButton}
    </button>
  );
}

interface UploadZoneProps {
  projectId: string;
}

export function UploadZone({ projectId }: UploadZoneProps) {
  const [state, formAction] = useActionState(uploadVersionAction, null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      setSelectedFile(file);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  }

  return (
    <form action={formAction} className="upload-zone">
      <input type="hidden" name="projectId" value={projectId} />

      {/* Drop area */}
      <div
        className={`upload-zone__area${isDragging ? ' upload-zone__area--dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Área de carga de archivos"
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
      >
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept=".zip"
          className="upload-zone__file-input"
          onChange={handleFileChange}
        />

        <div className="upload-zone__icon-wrap" aria-hidden="true">
          {selectedFile
            ? <File size={22} strokeWidth={1.5} />
            : <UploadCloud size={22} strokeWidth={1.5} />
          }
        </div>

        {selectedFile ? (
          <p className="upload-zone__file-name">{selectedFile.name}</p>
        ) : (
          <p className="upload-zone__label">
            {msgs.dropLabel}{' '}
            <span className="upload-zone__label-cta">{msgs.dropCta}</span>
          </p>
        )}
        <p className="upload-zone__hint">{msgs.dropHint}</p>
      </div>

      {/* Version label + submit */}
      <div className="upload-zone__fields">
        <div className="upload-zone__field">
          <label htmlFor="version-label" className="upload-zone__field-label">
            {msgs.versionFieldLabel}
          </label>
          <input
            id="version-label"
            name="versionLabel"
            type="text"
            placeholder={msgs.versionPlaceholder}
            className="upload-zone__input"
            maxLength={10}
          />
        </div>
        <SubmitButton />
      </div>

      {state?.error && (
        <p className="upload-zone__error" role="alert">{state.error}</p>
      )}
      {state?.success && (
        <p className="upload-zone__success" role="status">
          {msgs.uploadSuccess(state.versionLabel ?? '')}
        </p>
      )}
    </form>
  );
}
