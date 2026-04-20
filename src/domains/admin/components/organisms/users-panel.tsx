'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Trash2, UserPlus, Users, Search, ChevronDown } from 'lucide-react';
import { RoleChip } from '../atoms/role-chip';
import { InviteUserModal } from '../molecules/invite-user-modal';
import { ConfirmDeleteModal } from '../molecules/confirm-delete-modal';
import { adminMessages } from '../../messages';
import { MOCK_ADMIN_USERS } from '../../admin.repository';
import type { AdminUser } from '../../admin.types';
import type { UserRole } from '@/domains/auth/stores/user.store';

const msgs = adminMessages.users;

const AVATAR_COLOR = '#4361EF';

type SortKey = 'name' | 'created' | 'updated';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name', label: 'Nombre A-Z' },
  { value: 'created', label: 'Fecha creación' },
  { value: 'updated', label: 'Última actualización' }
];

export function UsersPanel() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);
  const [togglingUser, setTogglingUser] = useState<AdminUser | null>(null);
  const [pendingRoleChange, setPendingRoleChange] = useState<{
    user: AdminUser;
    newRole: UserRole;
  } | null>(null);
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
      .filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.roleLabel.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        // created / updated: fall back to name order (mock data has no dates)
        return a.name.localeCompare(b.name);
      });
  }, [users, search, sortBy]);

  const activeSortLabel =
    SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? 'Nombre A-Z';

  function handleInvite(data: Omit<AdminUser, 'id'>) {
    setUsers(prev => [...prev, { ...data, id: `u${Date.now()}` }]);
    setIsInviteOpen(false);
  }

  function handleEditRole(userId: string, newRole: UserRole) {
    const user = users.find(u => u.id === userId);
    if (!user || user.role === newRole) return;
    setPendingRoleChange({ user, newRole });
  }

  function handleConfirmRoleChange() {
    if (!pendingRoleChange) return;
    const { user, newRole } = pendingRoleChange;
    setUsers(prev =>
      prev.map(u =>
        u.id === user.id
          ? {
              ...u,
              role: newRole,
              roleLabel: adminMessages.users.roles[newRole]
            }
          : u
      )
    );
    setPendingRoleChange(null);
  }

  function handleConfirmToggle() {
    if (!togglingUser) return;
    setUsers(prev =>
      prev.map(u =>
        u.id === togglingUser.id
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      )
    );
    setTogglingUser(null);
  }

  function handleDelete(userId: string) {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setDeletingUser(null);
  }

  return (
    <>
      <section className="admin-section">
        {/* ── Single card: title + toolbar + column headers + rows ── */}
        <div className="admin-section__card admin-users-card">
          <div className="admin-users-top">
            <div className="admin-section__heading">
              <div className="admin-section__heading-top">
                <div className="admin-section__icon-container">
                  <Users
                    size={24}
                    strokeWidth={1.5}
                    className="admin-section__icon"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="admin-section__title">{msgs.sectionTitle}</h2>
              </div>
            </div>

            <div className="home-toolbar">
              <div className="home-search">
                <Search
                  size={13}
                  strokeWidth={1.5}
                  className="home-search__icon"
                />
                <input
                  type="text"
                  className="home-search__input"
                  placeholder={msgs.searchPlaceholder}
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
                  <ChevronDown
                    size={13}
                    strokeWidth={1.5}
                    className="home-sort__chevron"
                    data-open={isSortOpen}
                  />
                </button>
                {isSortOpen && (
                  <div className="home-sort__dropdown">
                    {SORT_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        type="button"
                        className="home-sort__option"
                        data-active={sortBy === option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
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
          {/* Column headers */}
          <div className="admin-table-header admin-users-cols">
            <span className="admin-table-header__cell">
              {msgs.tableHeaders.user}
            </span>
            <span className="admin-table-header__cell">
              {msgs.tableHeaders.email}
            </span>
            <span className="admin-table-header__cell">
              {msgs.tableHeaders.role}
            </span>
            <span className="admin-table-header__cell admin-table-header__cell--center">
              {msgs.tableHeaders.activate}
            </span>
            <span className="admin-table-header__cell">
              {msgs.tableHeaders.delete}
            </span>
          </div>

          {/* Rows */}
          {users.length === 0 ? (
            <div className="admin-users-empty">
              <div className="admin-users-empty__icon-wrap" aria-hidden="true">
                <Users size={44} strokeWidth={1.5} />
              </div>
              <div className="admin-users-empty__body">
                <p className="admin-users-empty__title">{msgs.empty.title}</p>
                <button
                  type="button"
                  className="btn btn--primary projects-container__create-btn"
                  onClick={() => setIsInviteOpen(true)}
                >
                  <UserPlus size={13} strokeWidth={1.5} aria-hidden="true" />
                  {msgs.empty.cta}
                </button>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="admin-table-empty">{msgs.emptySearch(search)}</div>
          ) : (
            filteredUsers.map((user, idx) => (
              <div
                key={user.id}
                className={`admin-user-row admin-users-cols${user.status === 'inactive' ? 'admin-user-row--inactive' : ''}${idx < filteredUsers.length - 1 ? 'admin-user-row--bordered' : ''}`}
              >
                {/* Usuario */}
                <div className="admin-user-row__identity">
                  <div
                    className="admin-user-avatar"
                    style={{
                      backgroundColor:
                        user.status === 'inactive' ? '#2A2A2A' : AVATAR_COLOR
                    }}
                    aria-hidden="true"
                  >
                    {user.initials}
                  </div>
                  <span className="admin-user-row__name">{user.name}</span>
                </div>

                {/* Email */}
                <span className="admin-user-row__email-col">{user.email}</span>

                {/* Rol */}
                <div className="admin-user-row__role">
                  <RoleChip
                    role={user.role}
                    userId={user.id}
                    onChangeRole={handleEditRole}
                  />
                </div>

                {/* Toggle */}
                <div className="admin-user-row__toggle-cell">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={user.status === 'active'}
                    className={`admin-toggle${user.status === 'active' ? 'admin-toggle--active' : ''}`}
                    onClick={() => setTogglingUser(user)}
                    aria-label={
                      user.status === 'active'
                        ? msgs.actions.deactivate
                        : msgs.actions.reactivate
                    }
                  >
                    <span className="admin-toggle__track" aria-hidden="true" />
                    <span className="admin-toggle__thumb" aria-hidden="true" />
                  </button>
                </div>

                {/* Acciones */}
                <div className="admin-user-row__actions">
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
            ))
          )}
        </div>
      </section>

      {isInviteOpen && (
        <InviteUserModal
          onInvite={handleInvite}
          onCancel={() => setIsInviteOpen(false)}
        />
      )}

      {togglingUser && (
        <ConfirmDeleteModal
          variant="confirm"
          title={
            togglingUser.status === 'active'
              ? msgs.toggleStatus.deactivateTitle
              : msgs.toggleStatus.reactivateTitle
          }
          description={
            togglingUser.status === 'active'
              ? msgs.toggleStatus.deactivateDescription(togglingUser.name)
              : msgs.toggleStatus.reactivateDescription(togglingUser.name)
          }
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

      {pendingRoleChange && (
        <ConfirmDeleteModal
          variant="confirm"
          title={msgs.editRole.confirmTitle}
          description={msgs.editRole.confirmDescription(
            pendingRoleChange.user.name,
            msgs.roles[pendingRoleChange.user.role],
            msgs.roles[pendingRoleChange.newRole]
          )}
          confirmLabel={msgs.editRole.confirm}
          cancelLabel={msgs.editRole.cancel}
          onConfirm={handleConfirmRoleChange}
          onCancel={() => setPendingRoleChange(null)}
        />
      )}
    </>
  );
}
