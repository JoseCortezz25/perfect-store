'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import { adminMessages } from '../../messages';
import type { AdminUser } from '../../admin.types';
import type { UserRole } from '@/domains/auth/stores/user.store';

const msgs = adminMessages.users.invite;
const roleLabels = adminMessages.users.roles;
const ROLES: { value: UserRole; label: string }[] = [
  { value: 'agencia', label: roleLabels['agencia'] },
  { value: 'cliente', label: roleLabels['cliente'] },
  { value: 'admin', label: roleLabels['admin'] }
];

interface InviteUserModalProps {
  onInvite: (user: Omit<AdminUser, 'id'>) => void;
  onCancel: () => void;
}

export function InviteUserModal({ onInvite, onCancel }: InviteUserModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('agencia');
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const name = email
        .split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      const initials = name
        .split(' ')
        .slice(0, 2)
        .map((w: string) => w[0])
        .join('')
        .toUpperCase();
      onInvite({
        name,
        initials,
        email: email.trim(),
        role,
        roleLabel: adminMessages.users.roles[role],
        status: 'active'
      });
      setIsSubmitting(false);
    }, 600);
  }

  const selectedLabel = ROLES.find(r => r.value === role)?.label ?? '';

  return createPortal(
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <div className="admin-modal__header">
          <h2 id="invite-modal-title" className="admin-modal__title">
            {msgs.modalTitle}
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

        <form className="admin-modal__body" onSubmit={handleSubmit}>
          <div className="admin-modal__field">
            <label htmlFor="invite-email" className="admin-modal__label">
              {msgs.emailLabel}
            </label>
            <input
              id="invite-email"
              type="email"
              className="admin-modal__input"
              placeholder={msgs.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

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
                {selectedLabel}
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
              disabled={isSubmitting || !email.trim()}
            >
              {isSubmitting ? msgs.submitting : msgs.submit}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
