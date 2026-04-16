'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, MoreHorizontal } from 'lucide-react';
import { adminMessages } from '@/domains/admin/messages';

const NAV_ITEMS = [
  { href: '/', label: adminMessages.nav.myProjects, icon: LayoutGrid }
];

const USER = { name: 'Michaela O', initials: 'MO' };

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__top">
          <div className="sidebar__header">
            <p className="sidebar__app-name">Sphere</p>
          </div>

          <nav className="sidebar__nav">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="sidebar__nav-item"
                  data-active={isActive}
                >
                  {isActive && <span className="sidebar__nav-indicator" />}
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="sidebar__bottom">
          <div className="sidebar__separator" />
          <div className="sidebar__user">
            <div className="sidebar__user-info">
              <div className="sidebar__user-avatar">{USER.initials}</div>
              <p className="sidebar__user-name">{USER.name}</p>
            </div>
            <button type="button" className="sidebar__user-more" aria-label="User options">
              <MoreHorizontal size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
