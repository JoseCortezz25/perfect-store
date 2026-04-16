'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Trash2, Layers } from 'lucide-react';
import { StatusBadge } from '@/domains/projects/components/atoms/status-badge';
import { ConfirmDeleteModal } from '../molecules/confirm-delete-modal';
import { adminMessages } from '../../messages';
import { MOCK_ADMIN_BRANDS } from '../../admin.repository';
import type { AdminBrand, AdminProject } from '../../admin.types';

const msgs = adminMessages.brands;

const BRAND_AVATAR_COLOR = '#4361EF';

function getBrandInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

type BrandAggregateStatus = 'approved' | 'rejected' | 'pending';

function getBrandStatus(projects: AdminProject[]): BrandAggregateStatus | null {
  if (projects.length === 0) return null;
  const statuses = projects.map(p => p.status);
  if (statuses.some(s => s === 'qc_rejected' || s === 'needs_fix')) return 'rejected';
  if (statuses.every(s => s === 'qc_approved' || s === 'client_approved' || s === 'delivered')) return 'approved';
  return 'pending';
}

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
        <div className="admin-section__card admin-brands-card">
          {/* Heading */}
          <div className="admin-brands-top">
            <div className="admin-section__heading">
              <div className="admin-section__heading-top">
                <div className="admin-section__icon-container">
                  <Layers size={24} strokeWidth={1.5} className="admin-section__icon" aria-hidden="true" />
                </div>
                <h2 className="admin-section__title">{msgs.sectionTitle}</h2>
              </div>
            </div>
          </div>

          {/* Table header */}
          <div className="admin-table-header admin-brands-cols">
            <span className="admin-table-header__cell admin-table-header__cell--brand-offset">{msgs.tableHeaders.brand}</span>
            <span className="admin-table-header__cell">{msgs.tableHeaders.client}</span>
            <span className="admin-table-header__cell">{msgs.tableHeaders.projects}</span>
            <span className="admin-table-header__cell">{msgs.tableHeaders.status}</span>
            <span className="admin-table-header__cell">{msgs.tableHeaders.pieces}</span>
            <span className="admin-table-header__cell">{msgs.tableHeaders.delete}</span>
          </div>

          {/* Brand rows */}
          {brands.map((brand, idx) => {
            const isExpanded = expandedId === brand.id;
            const totalPieces = brand.projects.reduce((sum, p) => sum + p.pieces, 0);
            const aggregateStatus = getBrandStatus(brand.projects);
            return (
              <div
                key={brand.id}
                className={`admin-brand-item${isExpanded ? ' admin-brand-item--expanded' : ''}${idx < brands.length - 1 ? ' admin-brand-item--bordered' : ''}`}
              >
                {/* Brand header row — 6 cols: Marca | Cliente | Proyectos | Estado | Piezas | Eliminar */}
                <div className="admin-brand-item__header admin-brands-cols">
                  {/* MARCA */}
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
                    <div
                      className="admin-user-avatar"
                      style={{ backgroundColor: BRAND_AVATAR_COLOR }}
                      aria-hidden="true"
                    >
                      {getBrandInitials(brand.name)}
                    </div>
                    <span className="admin-brand-item__name">{brand.name}</span>
                  </button>

                  {/* CLIENTE */}
                  <span className="admin-brand-item__client">{brand.client}</span>

                  {/* PROYECTOS */}
                  <span className="admin-brand-item__count">
                    {brand.projects.length}
                  </span>

                  {/* ESTADO — aggregate status chip */}
                  <span>
                    {aggregateStatus && (
                      <span className={`admin-brand-status admin-brand-status--${aggregateStatus}`}>
                        {msgs.brandStatus[aggregateStatus]}
                      </span>
                    )}
                  </span>

                  {/* PIEZAS — total across all projects */}
                  <span className="admin-project-row__pieces">{totalPieces} pzs</span>

                  {/* ELIMINAR */}
                  <div className="admin-user-row__actions">
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
                </div>

                {/* Expanded project rows — use same 6-col grid, no sub-header needed */}
                {isExpanded && (
                  <div className="admin-brand-item__projects">
                    {brand.projects.map(project => (
                      <div
                        key={project.id}
                        className="admin-project-row--link admin-brands-cols"
                        onClick={() => router.push(`/projects/${project.id}`)}
                        role="link"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter') router.push(`/projects/${project.id}`); }}
                      >
                        {/* MARCA — project name + designer (indented) */}
                        <div className="admin-project-row__info admin-project-row__info--indented">
                          <span className="admin-project-row__name">{project.name}</span>
                          <span className="admin-project-row__designer">{project.designer}</span>
                        </div>

                        {/* CLIENTE — empty */}
                        <span />

                        {/* PROYECTOS — empty */}
                        <span />

                        {/* ESTADO */}
                        <div>
                          <StatusBadge status={project.status} />
                        </div>

                        {/* PIEZAS */}
                        <span className="admin-project-row__pieces">{project.pieces} {msgs.piecesUnit}</span>

                        {/* ELIMINAR */}
                        <div className="admin-user-row__actions">
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
