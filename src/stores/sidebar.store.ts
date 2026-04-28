// ─── Sidebar Store ─────────────────────────────────────────────────────────
// Module-level singleton using useSyncExternalStore pattern.
// Persists collapsed state to localStorage across page navigations.

const STORAGE_KEY = 'sphere_sidebar_collapsed';

type Listener = () => void;

let _isCollapsed = false;
const _listeners = new Set<Listener>();

function notify(): void {
  _listeners.forEach(l => l());
}

export const sidebarStore = {
  getIsCollapsed: (): boolean => _isCollapsed,

  toggle: (): void => {
    _isCollapsed = !_isCollapsed;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(_isCollapsed));
    } catch {
      // localStorage may be unavailable
    }
    notify();
  },

  subscribe: (listener: Listener): (() => void) => {
    _listeners.add(listener);
    return () => {
      _listeners.delete(listener);
    };
  },

  /** Call once on the client to hydrate from localStorage */
  hydrate: (): void => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const val = saved === 'true';
      if (val !== _isCollapsed) {
        _isCollapsed = val;
        notify();
      }
    } catch {
      // ignore
    }
  }
};
