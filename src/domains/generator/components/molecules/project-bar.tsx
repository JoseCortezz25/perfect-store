'use client';

import { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { FolderOpen, ChevronDown, X, Plus } from 'lucide-react';
import { generatorStore } from '../../stores/generator.store';
import { generatorMessages } from '../../messages';

const msgs = generatorMessages.projectBar;
const modalMsgs = generatorMessages.projectModal;

// Mock projects — same as home page
const MOCK_PROJECTS = [
  { id: '1', name: 'Campaña Verano Bretaña', brand: 'Bretaña' },
  { id: '2', name: 'Bretaña Mora Lanzamiento', brand: 'Bretaña' },
  { id: '3', name: 'Refresh Manzana Q2', brand: 'Manzana' },
  { id: '4', name: 'Manzana Perfect Store', brand: 'Manzana' },
  { id: '5', name: 'Colombiana 70 Años', brand: 'Colombiana' },
  { id: '6', name: 'Colombiana Navidad', brand: 'Colombiana' },
  { id: '7', name: 'Hit Tropical Summer', brand: 'Hit' },
  { id: '8', name: 'Hit Maracuyá Drop', brand: 'Hit' },
  { id: '9', name: 'Mr. Tea Limón 2026', brand: 'Mr. Tea' },
  { id: '10', name: 'Mr. Tea Durazno Lanzamiento', brand: 'Mr. Tea' },
  { id: '11', name: 'Hipinto Refresh Escolar', brand: 'Hipinto' },
  { id: '12', name: 'Pepsi Black Friday', brand: 'Pepsi' },
  { id: '13', name: 'Pepsi Mundo 2026', brand: 'Pepsi' },
  { id: '14', name: 'Uva Fest Verano', brand: 'Uva' },
  { id: '15', name: 'Naranja Fresh Campo', brand: 'Naranja' }
];

export function ProjectBar() {
  const config = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getConfig,
    generatorStore.getConfig
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(config.projectId);
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('');

  function handleConfirm() {
    if (isCreating) {
      if (!newName.trim()) return;
      generatorStore.setConfig({
        projectId: 'new',
        projectName: `${newName} · ${newBrand}`
      });
    } else if (selectedId) {
      const project = MOCK_PROJECTS.find(p => p.id === selectedId);
      if (project)
        generatorStore.setConfig({
          projectId: project.id,
          projectName: project.name
        });
    }
    setIsOpen(false);
    setIsCreating(false);
    setNewName('');
    setNewBrand('');
  }

  function handleClose() {
    setIsOpen(false);
    setIsCreating(false);
    setNewName('');
    setNewBrand('');
    setSelectedId(config.projectId);
  }

  return (
    <>
      <div className="project-bar">
        <FolderOpen
          size={14}
          strokeWidth={1.5}
          className="project-bar__icon"
          aria-hidden="true"
        />
        <span className="project-bar__label">{msgs.label}:</span>
        <button
          type="button"
          className="project-bar__selector"
          onClick={() => setIsOpen(true)}
        >
          <span
            className={`project-bar__name${!config.projectName ? 'project-bar__name--empty' : ''}`}
          >
            {config.projectName ?? msgs.none}
          </span>
          <ChevronDown size={12} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      {isOpen && createPortal(
        <div
          className="gen-modal-overlay"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div className="gen-modal" onClick={e => e.stopPropagation()}>
            <div className="gen-modal__header">
              <h2 className="gen-modal__title">{modalMsgs.title}</h2>
              <button
                type="button"
                className="gen-modal__close"
                onClick={handleClose}
                aria-label="Cerrar"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
            <p className="gen-modal__subtitle">{modalMsgs.subtitle}</p>

            {!isCreating ? (
              <>
                <div className="gen-modal__field">
                  <label className="gen-modal__label">
                    {modalMsgs.selectLabel}
                  </label>
                  <select
                    className="gen-modal__select"
                    value={selectedId ?? ''}
                    onChange={e => setSelectedId(e.target.value || null)}
                  >
                    <option value="">{modalMsgs.selectPlaceholder}</option>
                    {MOCK_PROJECTS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.brand}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="gen-modal__create-link"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus size={12} strokeWidth={2} aria-hidden="true" />
                  {modalMsgs.orCreate}
                </button>
              </>
            ) : (
              <>
                <div className="gen-modal__field">
                  <label className="gen-modal__label">
                    {modalMsgs.newNameLabel}
                  </label>
                  <input
                    type="text"
                    className="gen-modal__input"
                    placeholder={modalMsgs.newNamePlaceholder}
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                  />
                </div>
                <div className="gen-modal__field">
                  <label className="gen-modal__label">
                    {modalMsgs.newBrandLabel}
                  </label>
                  <select
                    className="gen-modal__select"
                    value={newBrand}
                    onChange={e => setNewBrand(e.target.value)}
                  >
                    <option value="">Seleccionar marca...</option>
                    {[
                      'Bretaña',
                      'Manzana',
                      'Colombiana',
                      'Hit',
                      'Mr. Tea',
                      'Hipinto',
                      'Pepsi',
                      'Uva',
                      'Naranja'
                    ].map(b => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="gen-modal__create-link"
                  onClick={() => setIsCreating(false)}
                >
                  ← {modalMsgs.selectLabel}
                </button>
              </>
            )}

            <div className="gen-modal__footer">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleClose}
              >
                {modalMsgs.cancel}
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleConfirm}
                disabled={isCreating ? !newName.trim() : !selectedId}
              >
                {modalMsgs.confirm}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
