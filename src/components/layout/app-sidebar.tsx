'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import {
  Layers,
  Wand2,
  ShieldCheck,
  PanelLeft,
  LogOut,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/use-sidebar';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import { APP_USERS } from '@/domains/auth/stores/user.store';
import { adminMessages } from '@/domains/admin/messages';

const navMsgs = adminMessages.nav;

/* ── Nav items ──────────────────────────────────────────── */

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Layers,      label: navMsgs.myProjects, href: '/' },
  { icon: Wand2,       label: navMsgs.generator,  href: '/generator' },
  { icon: ShieldCheck, label: navMsgs.admin,       href: '/admin', adminOnly: true },
];

/* ── Component ──────────────────────────────────────────── */

export function AppSidebar() {
  const { isCollapsed, toggle } = useSidebar();
  const { user, setUser, logout } = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user.role === 'admin';

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const userSectionRef = useRef<HTMLDivElement>(null);

  function handleLogout() {
    logout();
    router.push('/login');
  }

  const visibleItems = NAV_ITEMS.filter(
    item => !item.adminOnly || isAdmin
  );

  return (
    <aside
      className={cn(
        'app-sidebar',
        'app-sidebar--floating',
        isCollapsed && 'app-sidebar--collapsed',
      )}
      aria-label="Navegación principal"
    >
      {/* ── Header: logo + collapse toggle ── */}
      <div className="app-sidebar__header">
        {isCollapsed ? (
          /* Collapsed: logo swaps to expand icon on hover */
          <button
            type="button"
            className="app-sidebar__logo-toggle"
            onClick={toggle}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            aria-label={navMsgs.expand}
          >
            {isLogoHovered ? (
              <PanelLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <img
                src="/Assets/Burbujas.svg"
                alt="Perfect Store"
                className="app-sidebar__logo-img"
                width={20}
                height={22}
              />
            )}
          </button>
        ) : (
          /* Expanded: logo + collapse button */
          <>
            <Link href="/" className="app-sidebar__logo">
              <img
                src="/Assets/Burbujas.svg"
                alt="Perfect Store"
                className="app-sidebar__logo-img"
                width={20}
                height={22}
              />
              <span className="app-sidebar__logo-text">Perfect Store</span>
            </Link>
            <button
              type="button"
              className="app-sidebar__toggle-btn"
              onClick={toggle}
              aria-label={navMsgs.collapse}
            >
              <PanelLeft size={15} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Separator below logo */}
      <div className="app-sidebar__separator" aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className="app-sidebar__nav">
        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'app-sidebar__item',
                isCollapsed && 'app-sidebar__item--col',
                isActive && 'app-sidebar__item--active'
              )}
            >
              <Icon
                size={isCollapsed ? 18 : 16}
                strokeWidth={1.5}
                className="app-sidebar__item-icon"
                aria-hidden="true"
              />
              <span className="app-sidebar__item-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Logout (above divider) ── */}
      <button
        type="button"
        className={cn(
          'app-sidebar__logout-btn',
          isCollapsed && 'app-sidebar__logout-btn--col'
        )}
        onClick={handleLogout}
        aria-label={navMsgs.closeSession}
      >
        <LogOut size={14} strokeWidth={1.5} aria-hidden="true" />
        {!isCollapsed && <span>{navMsgs.closeSession}</span>}
      </button>

      {/* ── Divider ── */}
      <div className="app-sidebar__divider" />

      {/* ── User section (below divider) ── */}
      <div ref={userSectionRef} className="app-sidebar__user-section">
        {/* Profile switcher dropdown */}
        {isUserMenuOpen && !isCollapsed && (
          <div className="app-sidebar__user-menu">
            <p className="app-sidebar__user-menu-label">{navMsgs.changeProfile}</p>
            {APP_USERS.map(u => (
              <button
                key={u.id}
                type="button"
                className={cn(
                  'app-sidebar__user-menu-item',
                  u.id === user.id && 'app-sidebar__user-menu-item--active'
                )}
                onClick={() => {
                  setUser(u);
                  setIsUserMenuOpen(false);
                }}
              >
                <div className="app-sidebar__user-menu-avatar">{u.initials}</div>
                <div className="app-sidebar__user-menu-info">
                  <span className="app-sidebar__user-menu-name">{u.name}</span>
                  <span className="app-sidebar__user-menu-role">{u.roleLabel}</span>
                </div>
                {u.id === user.id && (
                  <Check size={12} strokeWidth={2.5} className="app-sidebar__user-menu-check" aria-hidden="true" />
                )}
              </button>
            ))}
            <div className="app-sidebar__user-menu-divider" />
          </div>
        )}

        {/* User row */}
        <button
          type="button"
          className={cn(
            'app-sidebar__user',
            isCollapsed && 'app-sidebar__user--col',
            isUserMenuOpen && 'app-sidebar__user--open'
          )}
          onClick={() => !isCollapsed && setIsUserMenuOpen(o => !o)}
          aria-label={navMsgs.changeProfile}
        >
          <div className="app-sidebar__user-avatar" aria-hidden="true">
            {user.initials}
          </div>
          {!isCollapsed && (
            <div className="app-sidebar__user-info">
              <span className="app-sidebar__user-name">{user.name}</span>
              <span className="app-sidebar__user-role">{user.roleLabel}</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
