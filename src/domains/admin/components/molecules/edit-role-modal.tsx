'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import { adminMessages } from '../../messages';
import { RoleBadge } from '../atoms/role-badge';
import type { AdminUser } from '../../admin.types';
import type { UserRole } from '@/domains/auth/stores/user.store';

const msgs = adminMessages.users.editRole;
const ROLES: { value: UserRole; label: string }[] = [
  { value: 'agencia', label: 'Agencia' },
  { value: 'cliente', label: 'Cliente' },
  { value: 'admin', label: 'Admin' }
];

interface EditRoleModalProps {
  user: AdminUser;
  onSave: (userId: string, newRole: UserRole) => void;
  onCancel: () => void;
}

export function EditRoleModal({ user, onSave, onCancel }: EditRoleModalProps) {
  const [role, setRole] = useState<UserRole>(user.role);
  const [confirming, setConfirming] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const newRoleLabel = adminMessages.users.roles[role];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (role === user.role) {
      onCancel();
      return;
    }
    setConfirming(true);
  }

  function handleConfirm() {
    onSave(user.id, role);
  }

  return createPortal(
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-role-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <div className="admin-modal__header">
          <h2 id="edit-role-modal-title" className="admin-modal__title">
            {confirming ? msgs.confirmTitle : msgs.modalTitle}
          </h2>
          <button
            type="button"
            className="admin-modal__close"
            onClick={onCancel}
            aria-label={adminMessages.nav.close}
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        {/* User preview */}
        <div className="admin-modal__user-preview">
          <div className="admin-user-avatar admin-user-avatar--modal">
            {user.initials}
          </div>
          <div className="admin-modal__user-info">
            <span className="admin-modal__user-name">{user.name}</span>
            <span className="admin-modal__user-email">{user.email}</span>
          </div>
          <RoleBadge role={confirming ? role : user.role} />
        </div>

        {confirming ? (
          /* Step 2 — confirmation */
          <>
            <p className="admin-modal__description">
              {msgs.confirmDescription(
                user.name,
                adminMessages.users.roles[user.role],
                newRoleLabel
              )}
            </p>
            <div className="admin-modal__footer admin-modal__footer--full">
              <button
                type="button"
                className="btn btn--secondary admin-modal__btn-half"
                onClick={() => setConfirming(false)}
              >
                {msgs.back}
              </button>
              <button
                type="button"
                className="btn btn--primary admin-modal__btn-half"
                onClick={handleConfirm}
              >
                {msgs.confirm}
              </button>
            </div>
          </>
        ) : (
          /* Step 1 — role selector */
          <form className="admin-modal__body" onSubmit={handleSubmit}>
            <div className="admin-modal__field">
              <label className="admin-modal__label">{msgs.roleLabel}</label>
              <div className="admin-custom-select" ref={roleRef}>
                <button
                  type="button"
                  className="admin-custom-select__trigger"
                  data-open={isRoleOpen}
                  onClick={() => setIsRoleOpen(o => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={isRoleOpen}
                >
                  {ROLES.find(r => r.value === role)?.label}
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    className={`admin-custom-select__chevron${isRoleOpen ? 'admin-custom-select__chevron--open' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isRoleOpen && (
                  <div className="admin-custom-select__dropdown" role="listbox">
                    {ROLES.map(r => (
                      <button
                        key={r.value}
                        type="button"
                        role="option"
                        aria-selected={role === r.value}
                        className={`admin-custom-select__option${role === r.value ? 'admin-custom-select__option--active' : ''}`}
                        onClick={() => {
                          setRole(r.value);
                          setIsRoleOpen(false);
                        }}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="admin-modal__footer admin-modal__footer--full">
              <button
                type="button"
                className="btn btn--secondary admin-modal__btn-half"
                onClick={onCancel}
              >
                {msgs.cancel}
              </button>
              <button
                type="submit"
                className="btn btn--primary admin-modal__btn-half"
              >
                {msgs.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
