'use client';

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { adminMessages } from '../../messages';
import type { AdminUser } from '../../admin.types';
import type { UserRole } from '@/domains/auth/stores/user.store';

const msgs = adminMessages.users.invite;
const ROLES: { value: UserRole; label: string }[] = [
  { value: 'diseñador', label: 'Diseñador' },
  { value: 'qc',        label: 'QC' },
  { value: 'cliente',   label: 'Cliente' },
  { value: 'admin',     label: 'Admin' },
];

interface InviteUserModalProps {
  onInvite: (user: Omit<AdminUser, 'id'>) => void;
  onCancel: () => void;
}

export function InviteUserModal({ onInvite, onCancel }: InviteUserModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('diseñador');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    // Simulate async invite
    setTimeout(() => {
      const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const initials = name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase();
      onInvite({
        name,
        initials,
        email: email.trim(),
        role,
        roleLabel: adminMessages.users.roles[role],
        status: 'active',
      });
      setIsSubmitting(false);
    }, 600);
  }

  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <div className="admin-modal__header">
          <h2 id="invite-modal-title" className="admin-modal__title">{msgs.modalTitle}</h2>
          <button type="button" className="admin-modal__close" onClick={onCancel} aria-label="Cerrar">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <form className="admin-modal__body" onSubmit={handleSubmit}>
          <div className="admin-modal__field">
            <label htmlFor="invite-email" className="admin-modal__label">{msgs.emailLabel}</label>
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
            <label htmlFor="invite-role" className="admin-modal__label">{msgs.roleLabel}</label>
            <div className="admin-select-wrapper">
              <select
                id="invite-role"
                className="admin-select"
                value={role}
                onChange={e => setRole(e.target.value as UserRole)}
              >
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <ChevronDown size={13} strokeWidth={1.5} className="admin-select__chevron" aria-hidden="true" />
            </div>
          </div>

          <div className="admin-modal__footer admin-modal__footer--full">
            <button type="button" className="btn btn--secondary admin-modal__btn-half" onClick={onCancel}>
              {msgs.cancel}
            </button>
            <button type="submit" className="btn btn--primary admin-modal__btn-half" disabled={isSubmitting || !email.trim()}>
              {isSubmitting ? msgs.submitting : msgs.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
