import { Package } from 'lucide-react';

export function SkusPanel() {
  return (
    <div className="admin-placeholder">
      <Package
        size={28}
        strokeWidth={1}
        className="admin-placeholder__icon"
        aria-hidden="true"
      />
      <p className="admin-placeholder__text">Gestión de SKUs próximamente</p>
    </div>
  );
}
