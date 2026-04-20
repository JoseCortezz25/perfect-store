import { Cpu } from 'lucide-react';

export function ModeloPanel() {
  return (
    <div className="admin-placeholder">
      <Cpu
        size={28}
        strokeWidth={1}
        className="admin-placeholder__icon"
        aria-hidden="true"
      />
      <p className="admin-placeholder__text">Modelo generativo próximamente</p>
    </div>
  );
}
