'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
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
          className={cn('role-chip__chevron', {
            'role-chip__chevron--open': isOpen
          })}
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
              className={cn('role-chip__option', {
                'role-chip__option--active': r === role
              })}
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
