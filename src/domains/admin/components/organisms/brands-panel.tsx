'use client';

import { useState } from 'react';
import { Trash2, Layers } from 'lucide-react';
import { ConfirmDeleteModal } from '../molecules/confirm-delete-modal';
import { adminMessages } from '../../messages';
import { MOCK_ADMIN_BRANDS } from '../../admin.repository';
import type { AdminBrand } from '../../admin.types';

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

type DeleteTarget = { type: 'brand'; item: AdminBrand };

export function BrandsPanel() {
  const [brands, setBrands] = useState<AdminBrand[]>(MOCK_ADMIN_BRANDS);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  function handleDeleteBrand(brandId: string) {
    setBrands(prev => prev.filter(b => b.id !== brandId));
    setDeleteTarget(null);
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    handleDeleteBrand(deleteTarget.item.id);
  }

  return (
    <>
      <section className="admin-section">
        <div className="admin-section__card admin-brands-card">
          {/* Heading */}
          <div className="admin-brands-top">
            <div className="admin-section__heading">
              <div className="admin-section__heading-top">
                <div className="admin-section__icon-container">
                  <Layers
                    size={24}
                    strokeWidth={1.5}
                    className="admin-section__icon"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="admin-section__title">{msgs.sectionTitle}</h2>
              </div>
            </div>
          </div>

          {/* Table header */}
          <div className="admin-table-header admin-brands-cols">
            <span className="admin-table-header__cell admin-table-header__cell--brand-offset">
              {msgs.tableHeaders.brand}
            </span>
            <span className="admin-table-header__cell">
              {msgs.tableHeaders.client}
            </span>
            <span className="admin-table-header__cell">
              {msgs.tableHeaders.projects}
            </span>
            <span className="admin-table-header__cell">
              {msgs.tableHeaders.images}
            </span>
            <span className="admin-table-header__cell">
              {msgs.tableHeaders.delete}
            </span>
          </div>

          {/* Brand rows */}
          {brands.map((brand, idx) => {
            const totalImages = brand.projects.reduce(
              (sum, p) => sum + p.pieces,
              0
            );
            return (
              <div
                key={brand.id}
                className={`admin-brand-item${idx < brands.length - 1 ? 'admin-brand-item--bordered' : ''}`}
              >
                <div className="admin-brand-item__header admin-brands-cols">
                  {/* MARCA */}
                  <div className="admin-brand-item__info">
                    <div
                      className="admin-user-avatar"
                      style={{ backgroundColor: BRAND_AVATAR_COLOR }}
                      aria-hidden="true"
                    >
                      {getBrandInitials(brand.name)}
                    </div>
                    <span className="admin-brand-item__name">{brand.name}</span>
                  </div>

                  {/* CLIENTE */}
                  <span className="admin-brand-item__client">
                    {brand.client}
                  </span>

                  {/* PROYECTOS */}
                  <span className="admin-brand-item__count">
                    {brand.projects.length}
                  </span>

                  {/* IMÁGENES */}
                  <span className="admin-project-row__pieces">
                    {totalImages} {msgs.imagesUnit}
                  </span>

                  {/* ELIMINAR */}
                  <div className="admin-user-row__actions">
                    <button
                      type="button"
                      className="admin-action-btn admin-action-btn--delete"
                      title={msgs.actions.deleteBrand}
                      onClick={() =>
                        setDeleteTarget({ type: 'brand', item: brand })
                      }
                      aria-label={`${msgs.actions.deleteBrand}: ${brand.name}`}
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {deleteTarget && (
        <ConfirmDeleteModal
          title={msgs.deleteBrand.modalTitle}
          description={msgs.deleteBrand.description(deleteTarget.item.name)}
          confirmLabel={msgs.deleteBrand.confirm}
          cancelLabel={msgs.deleteBrand.cancel}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
