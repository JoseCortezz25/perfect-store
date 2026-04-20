// ─── User Store ───────────────────────────────────────────────────────────────
// Module-level singleton store using useSyncExternalStore pattern.
// Persists selected profile to localStorage so it survives page navigation.

export type UserRole = 'agencia' | 'cliente' | 'admin';

export interface AppUser {
  id: string;
  name: string;
  initials: string;
  role: UserRole;
  roleLabel: string;
}

export const APP_USERS: AppUser[] = [
  {
    id: '1',
    name: 'Valentina Ríos',
    initials: 'VR',
    role: 'agencia',
    roleLabel: 'Agencia'
  },
  {
    id: '2',
    name: 'Carlos Méndez',
    initials: 'CM',
    role: 'cliente',
    roleLabel: 'Cliente'
  },
  {
    id: '3',
    name: 'Laura Torres',
    initials: 'LT',
    role: 'admin',
    roleLabel: 'Admin'
  }
];

const STORAGE_KEY = 'sphere_active_user_id';

function getInitialUser(): AppUser {
  if (typeof window === 'undefined') return APP_USERS[0];
  try {
    const savedId = window.localStorage.getItem(STORAGE_KEY);
    if (savedId) {
      const found = APP_USERS.find(u => u.id === savedId);
      if (found) return found;
    }
  } catch {
    // localStorage may be unavailable
  }
  return APP_USERS[0];
}

type Listener = () => void;

let _currentUser: AppUser = APP_USERS[0]; // server-safe default
const _listeners = new Set<Listener>();

export const userStore = {
  getUser: (): AppUser => _currentUser,

  setUser: (user: AppUser): void => {
    _currentUser = user;
    try {
      window.localStorage.setItem(STORAGE_KEY, user.id);
    } catch {
      // ignore
    }
    _listeners.forEach(l => l());
  },

  subscribe: (listener: Listener): (() => void) => {
    _listeners.add(listener);
    return () => {
      _listeners.delete(listener);
    };
  },

  logout: (): void => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    _currentUser = APP_USERS[0];
    _listeners.forEach(l => l());
  },

  /** Call once on the client to hydrate from localStorage */
  hydrate: (): void => {
    const user = getInitialUser();
    if (user.id !== _currentUser.id) {
      _currentUser = user;
      _listeners.forEach(l => l());
    }
  }
};
