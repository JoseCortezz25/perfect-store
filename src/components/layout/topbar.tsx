'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  ChevronDown,
  Check,
  LogOut,
  Layers,
  ShieldCheck,
  UserCircle,
  Wand2,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import { APP_USERS } from '@/domains/auth/stores/user.store';
import { adminMessages } from '@/domains/admin/messages';

const navMsgs = adminMessages.nav;

export function Topbar() {
  const { user, setUser, logout } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAdmin = user.role === 'admin';

  return (
    <header className="topbar">
      {/* Left: brand + divider + home icon */}
      <div className="topbar__left">
        <Link href="/" className="topbar__brand-link">
          <img
            src="/Assets/Logo-perfect-store.svg"
            alt="Perfect Store"
            className="topbar__logo-img"
            width={130}
            height={19}
          />
        </Link>
        <div className="topbar__divider" aria-hidden="true" />
        <Link href="/" className="topbar__home-btn" aria-label="Ir al inicio">
          <Home size={15} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>

      {/* Center: nav */}
      <div className="topbar__center">
        <nav className="topbar__navbar" aria-label="Navegación principal">
          <div className="topbar__nav-items">
            <Link
              href="/"
              className={cn(
                'topbar__nav-item',
                pathname === '/' && 'topbar__nav-item--active'
              )}
            >
              <Layers
                size={14}
                strokeWidth={1.5}
                className="topbar__nav-icon"
                aria-hidden="true"
              />
              {navMsgs.myProjects}
            </Link>
            <Link
              href="/generator"
              className={cn(
                'topbar__nav-item',
                pathname?.startsWith('/generator') && 'topbar__nav-item--active'
              )}
            >
              <Wand2
                size={14}
                strokeWidth={1.5}
                className="topbar__nav-icon"
                aria-hidden="true"
              />
              {navMsgs.generator}
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  'topbar__nav-item',
                  pathname === '/admin' && 'topbar__nav-item--active'
                )}
              >
                <ShieldCheck
                  size={14}
                  strokeWidth={1.5}
                  className="topbar__nav-icon"
                  aria-hidden="true"
                />
                {navMsgs.admin}
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Right: user profile + dropdown */}
      <div className="topbar__right">
        <div className="topbar__user-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className="topbar__user"
            onClick={() => setIsDropdownOpen(o => !o)}
            aria-label="Menú de usuario"
            aria-expanded={isDropdownOpen}
          >
            <div className="topbar__user-avatar" aria-hidden="true">
              {user.initials}
            </div>
            <div className="topbar__user-info">
              <span className="topbar__user-name">{user.name}</span>
              <span className="topbar__user-role">({user.roleLabel})</span>
            </div>
            <ChevronDown
              size={13}
              strokeWidth={1.5}
              className={cn(
                'topbar__user-chevron',
                isDropdownOpen && 'topbar__user-chevron--open'
              )}
              aria-hidden="true"
            />
          </button>

          {isDropdownOpen && (
            <div className="topbar__dropdown" role="menu">
              <p className="topbar__dropdown-label">{navMsgs.changeProfile}</p>
              {APP_USERS.map(u => (
                <button
                  key={u.id}
                  type="button"
                  role="menuitem"
                  className={cn(
                    'topbar__dropdown-item',
                    u.id === user.id && 'topbar__dropdown-item--active'
                  )}
                  onClick={() => {
                    setUser(u);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className="topbar__dropdown-avatar">{u.initials}</div>
                  <div className="topbar__dropdown-user-info">
                    <span className="topbar__dropdown-name">{u.name}</span>
                    <span className="topbar__dropdown-role">{u.roleLabel}</span>
                  </div>
                  {u.id === user.id && (
                    <Check
                      size={13}
                      strokeWidth={2}
                      className="topbar__dropdown-check"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}

              <div className="topbar__dropdown-divider" role="separator" />

              <Link
                href="/profile"
                role="menuitem"
                className="topbar__dropdown-item topbar__dropdown-item--profile"
                onClick={() => setIsDropdownOpen(false)}
              >
                <UserCircle size={14} strokeWidth={1.5} aria-hidden="true" />
                <span className="topbar__dropdown-logout-label">
                  {navMsgs.myProfile}
                </span>
              </Link>

              <div className="topbar__dropdown-divider" role="separator" />

              <button
                type="button"
                role="menuitem"
                className="topbar__dropdown-item topbar__dropdown-item--logout"
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                  router.push('/login');
                }}
              >
                <LogOut size={14} strokeWidth={1.5} aria-hidden="true" />
                <span className="topbar__dropdown-logout-label">
                  {navMsgs.closeSession}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
