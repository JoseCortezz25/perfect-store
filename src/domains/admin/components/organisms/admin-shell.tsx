'use client';

import { useState } from 'react';
import { ShieldOff, Users, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import { UsersPanel } from './users-panel';
import { BrandsPanel } from './brands-panel';
import { adminMessages } from '../../messages';

type AdminTab = 'usuarios' | 'marcas';

const TAB_ICONS: Record<AdminTab, React.ReactNode> = {
  usuarios: <Users size={14} strokeWidth={1.5} aria-hidden="true" />,
  marcas: <Layers size={14} strokeWidth={1.5} aria-hidden="true" />
};

const msgs = adminMessages;

export function AdminShell() {
  const { user } = useCurrentUser();
  const [activeTab, setActiveTab] = useState<AdminTab>('usuarios');

  if (user.role !== 'admin') {
    return (
      <div className="admin-unauthorized">
        <ShieldOff
          size={32}
          strokeWidth={1}
          className="admin-unauthorized__icon"
          aria-hidden="true"
        />
        <h2 className="admin-unauthorized__title">{msgs.unauthorized.title}</h2>
        <p className="admin-unauthorized__description">
          {msgs.unauthorized.description}
        </p>
      </div>
    );
  }

  return (
    <div className="admin-content">
      {/* Page header */}
      <div className="section-header">
        <div className="section-header__accent-line" />
        <div className="section-header__body">
          <h1 className="section-header__title">{msgs.pageTitle}</h1>
          <p className="section-header__subtitle">{msgs.pageSubtitle}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="admin-tabs" role="tablist">
        {(['usuarios', 'marcas'] as AdminTab[]).map(tab => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={cn(
              'admin-tabs__tab',
              activeTab === tab && 'admin-tabs__tab--active'
            )}
            onClick={() => setActiveTab(tab)}
          >
            {TAB_ICONS[tab]}
            {msgs.tabs[tab]}
          </button>
        ))}
      </div>

      {/* Panel */}
      {activeTab === 'usuarios' && <UsersPanel />}
      {activeTab === 'marcas' && <BrandsPanel />}
    </div>
  );
}
