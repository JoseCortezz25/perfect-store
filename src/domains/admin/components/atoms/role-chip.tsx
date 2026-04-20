'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { adminMessages } from '../../messages';
import type { UserRole } from '@/domains/auth/stores/user.store';

const ROLE_CLS: Record<UserRole, string> = {
  admin: 'role-chip--admin',
  agencia: 'role-chip--agencia',
  cliente: 'role-chip--cliente'
};

const DOT_CLS: Record<UserRole, string> = {
  admin: 'role-chip__option-dot--admin',
  agencia: 'role-chip__option-dot--agencia',
  cliente: 'role-chip__option-dot--cliente'
};

const ALL_ROLES: UserRole[] = ['admin', 'agencia', 'cliente'];

interface RoleChipProps {
  role: UserRole;
  userId: string;
  onChangeRole: (userId: string, newRole: UserRole) => void;
}

export function RoleChip({ role, userId, onChangeRole }: RoleChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function handleSelect(newRole: UserRole) {
    onChangeRole(userId, newRole);
    setIsOpen(false);
  }

  return (
    <div className="role-chip-wrap" ref={ref}>
      <button
        type="button"
        className={`role-chip ${ROLE_CLS[role]}`}
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {adminMessages.users.roles[role]}
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className={`role-chip__chevron${isOpen ? 'role-chip__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="role-chip__dropdown" role="listbox">
          {ALL_ROLES.map(r => (
            <button
              key={r}
              type="button"
              role="option"
              aria-selected={r === role}
              className={`role-chip__option${r === role ? 'role-chip__option--active' : ''}`}
              onClick={() => handleSelect(r)}
            >
              <span
                className={`role-chip__option-dot ${DOT_CLS[r]}`}
                aria-hidden="true"
              />
              {adminMessages.users.roles[r]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
