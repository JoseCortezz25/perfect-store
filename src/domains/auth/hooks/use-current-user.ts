'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { userStore, type AppUser, type UserRole } from '../stores/user.store';

export function useCurrentUser() {
  // Hydrate from localStorage on first client render
  useEffect(() => {
    userStore.hydrate();
  }, []);

  const user = useSyncExternalStore(
    userStore.subscribe,
    userStore.getUser,
    userStore.getUser // server snapshot — returns default user
  );

  return {
    user,
    role: user.role as UserRole,
    setUser: userStore.setUser,
    logout: userStore.logout,
    isRole: (r: UserRole) => user.role === r,
    canUpload: user.role === 'agencia' || user.role === 'admin',
    canQcReview: user.role === 'agencia' || user.role === 'admin',
    canClientApprove: user.role === 'cliente' || user.role === 'admin',
    canCreateProject: user.role === 'agencia' || user.role === 'admin',
    canSeeValidador: user.role !== 'cliente'
  };
}

export type { AppUser, UserRole };
