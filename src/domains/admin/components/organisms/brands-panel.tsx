'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Trash2, Building2 } from 'lucide-react';
import { StatusBadge } from '@/domains/projects/components/atoms/status-badge';
import { ConfirmDeleteModal } from '../molecules/confirm-delete-modal';
import { adminMessages } from '../../messages';
import { MOCK_ADMIN_BRANDS } from '../../admin.repository';
import type { AdminBrand, AdminProject } from '../../admin.types';

const msgs = adminMessages.brands;

type DeleteTarget =
  | { type: 'brand'; item: AdminBrand }
  | { type: 'project'; brand: AdminBrand; item: AdminProject };

export function BrandsPanel() {
  const router = useRouter();
  const [brands, setBrands] = useState<AdminBrand[]>(MOCK_ADMIN_BRANDS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  function handleDeleteBrand(brandId: string) {
    setBrands(prev => prev.filter(b => b.id !== brandId));
    setDeleteTarget(null);
    if (expandedId === brandId) setExpandedId(null);
  }

  function handleDeleteProject(brandId: string, projectId: string) {
    setBrands(prev =>
      prev
        .map(b =>
          b.id === brandId
            ? { ...b, projects: b.projects.filter(p => p.id !== projectId) }
            : b
        )
        .filter(b => b.projects.length > 0)
    );
    setDeleteTarget(null);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'brand') {
      handleDeleteBrand(deleteTarget.item.id);
    } else {
      handleDeleteProject(deleteTarget.brand.id, deleteTarget.item.id);
    }
  }

  const confirmTitle = deleteTarget?.type === 'brand'
    ? msgs.deleteBrand.modalTitle
    : msgs.deleteProject.modalTitle;

  const confirmDescription = deleteTarget?.type === 'brand'
    ? msgs.deleteBrand.description(deleteTarget.item.name)
    : deleteTarget?.type === 'project'
      ? msgs.deleteProject.description(deleteTarget.item.name)
      : '';

  return (
    <>
      <section className="admin-section">
        <div className="admin-section__top">
          <div className="admin-section__heading">
            <h2 className="admin-section__title">{msgs.sectionTitle}</h2>
            <span className="admin-section__subtitle">{msgs.sectionSubtitle(brands.length)}</span>
          </div>
        </div>

        <div className="admin-section__card">
          {/* Table header */}
          <div className="admin-table-header admin-brands-cols">
            <span className="admin-table-header__cell">Marca</span>
            <span className="admin-table-header__cell">Cliente</span>
            <span className="admin-table-header__cell">Proyectos</span>
            <span className="admin-table-header__cell" />
          </div>

          {/* Brand rows */}
          {brands.map((brand, idx) => {
            const isExpanded = expandedId === brand.id;
            return (
              <div
                key={brand.id}
                className={`admin-brand-item${isExpanded ? ' admin-brand-item--expanded' : ''}${idx < brands.length - 1 ? ' admin-brand-item--bordered' : ''}`}
              >
                {/* Brand header row */}
                <div className="admin-brand-item__header admin-brands-cols">
                  {/* MARCA col */}
                  <button
                    type="button"
                    className="admin-brand-item__expand-btn"
                    onClick={() => setExpandedId(isExpanded ? null : brand.id)}
                    aria-expanded={isExpanded}
                  >
                    <ChevronRight
                      size={14}
                      strokeWidth={1.5}
                      className={`admin-brand-item__chevron${isExpanded ? ' admin-brand-item__chevron--open' : ''}`}
                      aria-hidden="true"
                    />
                    <Building2 size={15} strokeWidth={1.5} className="admin-brand-item__icon" aria-hidden="true" />
                    <span className="admin-brand-item__name">{brand.name}</span>
                  </button>

                  {/* CLIENTE col */}
                  <span className="admin-brand-item__client">{brand.client}</span>

                  {/* PROYECTOS col */}
                  <span className="admin-brand-item__count">
                    {msgs.projectCount(brand.projects.length)}
                  </span>

                  {/* ACCIONES col */}
                  <button
                    type="button"
                    className="admin-action-btn admin-action-btn--delete"
                    title={msgs.actions.deleteBrand}
                    onClick={() => setDeleteTarget({ type: 'brand', item: brand })}
                    aria-label={`${msgs.actions.deleteBrand}: ${brand.name}`}
                  >
                    <Trash2 size={14} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Expanded projects sub-table */}
                {isExpanded && (
                  <div className="admin-brand-item__projects">
                    {/* Sub-table header */}
                    <div className="admin-brand-project-header">
                      <span className="admin-table-header__cell">Proyecto</span>
                      <span className="admin-table-header__cell">Estado</span>
                      <span className="admin-table-header__cell">Piezas</span>
                      <span className="admin-table-header__cell" />
                    </div>

                    {/* Project rows */}
                    {brand.projects.map(project => (
                      <div
                        key={project.id}
                        className="admin-project-row--link admin-brand-project-cols"
                        onClick={() => router.push(`/projects/${project.id}`)}
                        role="link"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter') router.push(`/projects/${project.id}`); }}
                      >
                        {/* PROYECTO col */}
                        <div className="admin-project-row__info">
                          <span className="admin-project-row__name">{project.name}</span>
                          <span className="admin-project-row__designer">{project.designer}</span>
                        </div>

                        {/* ESTADO col */}
                        <div>
                          <StatusBadge status={project.status} />
                        </div>

                        {/* PIEZAS col */}
                        <span className="admin-project-row__pieces">{project.pieces} pzs</span>

                        {/* ACCIONES col */}
                        <button
                          type="button"
                          className="admin-action-btn admin-action-btn--delete"
                          title={msgs.actions.deleteProject}
                          onClick={e => {
                            e.stopPropagation();
                            setDeleteTarget({ type: 'project', brand, item: project });
                          }}
                          aria-label={`${msgs.actions.deleteProject}: ${project.name}`}
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {deleteTarget && (
        <ConfirmDeleteModal
          title={confirmTitle}
          description={confirmDescription}
          confirmLabel={
            deleteTarget.type === 'brand'
              ? msgs.deleteBrand.confirm
              : msgs.deleteProject.confirm
          }
          cancelLabel={
            deleteTarget.type === 'brand'
              ? msgs.deleteBrand.cancel
              : msgs.deleteProject.cancel
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
