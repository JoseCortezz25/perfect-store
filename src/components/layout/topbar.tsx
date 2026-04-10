'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Mis proyectos', icon: LayoutGrid }
];

const USER = { name: 'Michaela O', initials: 'MO' };

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      {/* Left: Sphere wordmark */}
      <div className="topbar__left">
        <span className="topbar__brand">Sphere</span>
      </div>

      {/* Center: floating pill nav */}
      <nav className="topbar__navbar" aria-label="Navegación principal">
        <div className="topbar__nav-items">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`topbar__nav-item${isActive ? ' topbar__nav-item--active' : ''}`}
              >
                <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
        {/* Active glow indicator */}
        <div className="topbar__glow" aria-hidden="true" />
      </nav>

      {/* Right: user profile */}
      <div className="topbar__right">
        <div className="topbar__user" role="button" tabIndex={0} aria-label="Menú de usuario">
          <div className="topbar__user-avatar" aria-hidden="true">{USER.initials}</div>
          <span className="topbar__user-name">{USER.name}</span>
          <ChevronDown size={13} strokeWidth={1.5} className="topbar__user-chevron" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
