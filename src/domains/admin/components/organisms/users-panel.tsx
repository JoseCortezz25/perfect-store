'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Pencil, Trash2, UserPlus, Users, Search, ChevronDown } from 'lucide-react';
import { RoleBadge } from '../atoms/role-badge';
import { InviteUserModal } from '../molecules/invite-user-modal';
import { EditRoleModal } from '../molecules/edit-role-modal';
import { ConfirmDeleteModal } from '../molecules/confirm-delete-modal';
import { adminMessages } from '../../messages';
import { MOCK_ADMIN_USERS } from '../../admin.repository';
import type { AdminUser } from '../../admin.types';
import type { UserRole } from '@/domains/auth/stores/user.store';

const msgs = adminMessages.users;

const AVATAR_COLOR: Record<string, string> = {
  admin:     '#4361EF',
  diseñador: '#7C3AED',
  qc:        '#D97706',
  cliente:   '#0D9488',
};

type SortKey = 'name' | 'role' | 'status';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name',   label: 'Nombre' },
  { value: 'role',   label: 'Rol' },
  { value: 'status', label: 'Estado' },
];

export function UsersPanel() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen]   = useState(false);
  const [editingUser, setEditingUser]     = useState<AdminUser | null>(null);
  const [deletingUser, setDeletingUser]   = useState<AdminUser | null>(null);
  const [togglingUser, setTogglingUser]   = useState<AdminUser | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users
      .filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.roleLabel.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        if (sortBy === 'name')   return a.name.localeCompare(b.name);
        if (sortBy === 'role')   return a.role.localeCompare(b.role);
        if (sortBy === 'status') return a.status.localeCompare(b.status);
        return 0;
      });
  }, [users, search, sortBy]);

  const activeSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? 'Nombre';

  function handleInvite(data: Omit<AdminUser, 'id'>) {
    setUsers(prev => [...prev, { ...data, id: `u${Date.now()}` }]);
    setIsInviteOpen(false);
  }

  function handleEditRole(userId: string, newRole: UserRole) {
    setUsers(prev => prev.map(u =>
      u.id === userId
        ? { ...u, role: newRole, roleLabel: adminMessages.users.roles[newRole] }
        : u
    ));
    setEditingUser(null);
  }

  function handleConfirmToggle() {
    if (!togglingUser) return;
    setUsers(prev => prev.map(u =>
      u.id === togglingUser.id
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
    setTogglingUser(null);
  }

  function handleDelete(userId: string) {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setDeletingUser(null);
  }

  return (
    <>
      <section className="admin-section">
        <div className="admin-section__top">
          <div className="admin-section__heading">
            <div className="admin-section__heading-top">
              <Users size={13} strokeWidth={1.5} className="admin-section__icon" aria-hidden="true" />
              <h2 className="admin-section__title">{msgs.sectionTitle}</h2>
            </div>
            <span className="admin-section__subtitle">{msgs.sectionSubtitle(users.length)}</span>
          </div>

          {/* Toolbar — same pattern as home page */}
          <div className="home-toolbar" style={{ marginLeft: 'auto' }}>
            <div className="home-search">
              <Search size={13} strokeWidth={1.5} className="home-search__icon" />
              <input
                type="text"
                className="home-search__input"
                placeholder="Buscar usuario..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="home-sort" ref={sortRef}>
              <button
                type="button"
                className="home-sort__trigger"
                data-open={isSortOpen}
                onClick={() => setIsSortOpen(o => !o)}
              >
                {activeSortLabel}
                <ChevronDown size={13} strokeWidth={1.5} className="home-sort__chevron" data-open={isSortOpen} />
              </button>
              {isSortOpen && (
                <div className="home-sort__dropdown">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      className="home-sort__option"
                      data-active={sortBy === option.value}
                      onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="btn btn--primary projects-container__create-btn"
              onClick={() => setIsInviteOpen(true)}
            >
              <UserPlus size={13} strokeWidth={1.5} aria-hidden="true" />
              {msgs.inviteButton}
            </button>
          </div>
        </div>

        <div className="admin-section__card">
          {/* Table header */}
          <div className="admin-table-header admin-users-cols">
            <span className="admin-table-header__cell">Usuario</span>
            <span className="admin-table-header__cell">Rol</span>
            <span className="admin-table-header__cell">Estado</span>
            <span className="admin-table-header__cell admin-table-header__cell--center">Activar</span>
            <span className="admin-table-header__cell admin-table-header__cell--right">Acciones</span>
          </div>

          {/* Rows */}
          {filteredUsers.length === 0 ? (
            <div className="admin-table-empty">Sin resultados para &ldquo;{search}&rdquo;</div>
          ) : filteredUsers.map((user, idx) => (
            <div
              key={user.id}
              className={`admin-user-row admin-users-cols${user.status === 'inactive' ? ' admin-user-row--inactive' : ''}${idx < filteredUsers.length - 1 ? ' admin-user-row--bordered' : ''}`}
            >
              {/* Usuario */}
              <div className="admin-user-row__identity">
                <div
                  className="admin-user-avatar"
                  style={{ backgroundColor: user.status === 'inactive' ? '#2A2A2A' : AVATAR_COLOR[user.role] }}
                  aria-hidden="true"
                >
                  {user.initials}
                </div>
                <div className="admin-user-row__identity-text">
                  <span className="admin-user-row__name">{user.name}</span>
                  <span className="admin-user-row__email">{user.email}</span>
                </div>
              </div>

              {/* Rol */}
              <div className="admin-user-row__role">
                <RoleBadge role={user.role} />
              </div>

              {/* Estado */}
              <div className={`admin-status admin-status--${user.status}`}>
                <span className="admin-status__dot" aria-hidden="true" />
                <span className="admin-status__label">{msgs.status[user.status]}</span>
              </div>

              {/* Toggle */}
              <div className="admin-user-row__toggle-cell">
                <button
                  type="button"
                  role="switch"
                  aria-checked={user.status === 'active'}
                  className={`admin-toggle${user.status === 'active' ? ' admin-toggle--active' : ''}`}
                  onClick={() => setTogglingUser(user)}
                  aria-label={user.status === 'active' ? msgs.actions.deactivate : msgs.actions.reactivate}
                >
                  <span className="admin-toggle__track" aria-hidden="true" />
                  <span className="admin-toggle__thumb" aria-hidden="true" />
                </button>
              </div>

              {/* Acciones */}
              <div className="admin-user-row__actions">
                <button
                  type="button"
                  className="admin-action-btn admin-action-btn--edit"
                  title={msgs.actions.editRole}
                  onClick={() => setEditingUser(user)}
                  aria-label={`${msgs.actions.editRole}: ${user.name}`}
                >
                  <Pencil size={13} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  className="admin-action-btn admin-action-btn--delete"
                  title={msgs.actions.delete}
                  onClick={() => setDeletingUser(user)}
                  aria-label={`${msgs.actions.delete}: ${user.name}`}
                >
                  <Trash2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isInviteOpen && (
        <InviteUserModal onInvite={handleInvite} onCancel={() => setIsInviteOpen(false)} />
      )}

      {editingUser && (
        <EditRoleModal
          user={editingUser}
          onSave={handleEditRole}
          onCancel={() => setEditingUser(null)}
        />
      )}

      {togglingUser && (
        <ConfirmDeleteModal
          variant="confirm"
          title={togglingUser.status === 'active'
            ? msgs.toggleStatus.deactivateTitle
            : msgs.toggleStatus.reactivateTitle}
          description={togglingUser.status === 'active'
            ? msgs.toggleStatus.deactivateDescription(togglingUser.name)
            : msgs.toggleStatus.reactivateDescription(togglingUser.name)}
          confirmLabel={msgs.toggleStatus.confirm}
          cancelLabel={msgs.toggleStatus.cancel}
          onConfirm={handleConfirmToggle}
          onCancel={() => setTogglingUser(null)}
        />
      )}

      {deletingUser && (
        <ConfirmDeleteModal
          title={msgs.deleteUser.modalTitle}
          description={msgs.deleteUser.description(deletingUser.name)}
          confirmLabel={msgs.deleteUser.confirm}
          cancelLabel={msgs.deleteUser.cancel}
          onConfirm={() => handleDelete(deletingUser.id)}
          onCancel={() => setDeletingUser(null)}
        />
      )}
    </>
  );
}
