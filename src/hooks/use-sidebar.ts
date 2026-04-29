'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { sidebarStore } from '@/stores/sidebar.store';

export function useSidebar() {
  // Hydrate from localStorage on first client render
  useEffect(() => {
    sidebarStore.hydrate();
  }, []);

  const isCollapsed = useSyncExternalStore(
    sidebarStore.subscribe,
    sidebarStore.getIsCollapsed,
    sidebarStore.getIsCollapsed // server snapshot — default false
  );

  return {
    isCollapsed,
    toggle: sidebarStore.toggle
  };
}
