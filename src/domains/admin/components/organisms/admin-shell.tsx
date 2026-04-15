'use client';

import { ShieldOff } from 'lucide-react';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import { UsersPanel } from './users-panel';
import { BrandsPanel } from './brands-panel';
import { adminMessages } from '../../messages';

const msgs = adminMessages;

export function AdminShell() {
  const { user } = useCurrentUser();

  if (user.role !== 'admin') {
    return (
      <div className="admin-unauthorized">
        <ShieldOff size={32} strokeWidth={1} className="admin-unauthorized__icon" aria-hidden="true" />
        <h2 className="admin-unauthorized__title">{msgs.unauthorized.title}</h2>
        <p className="admin-unauthorized__description">{msgs.unauthorized.description}</p>
      </div>
    );
  }

  return (
    <div className="admin-content">
      {/* Page header */}
      <div className="admin-page-header">
        <div className="section-header__accent-line" />
        <div>
          <h1 className="admin-page-header__title">{msgs.pageTitle}</h1>
          <p className="admin-page-header__subtitle">{msgs.pageSubtitle}</p>
        </div>
      </div>

      <UsersPanel />
      <BrandsPanel />
    </div>
  );
}
