import { createContext, useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import {
  getSnapshot,
  subscribe,
  setAuth as setStoreAuth,
  getPersist,
  setPersistFlag,
} from '../store/authStore';

const AuthContext = createContext({});

/**
 * BroadcastChannel name used to synchronize auth state across browser tabs.
 * Solves the "split-brain" bug where Tab A and Tab B can hold different
 * sessions because the HTTP-only cookie is shared but React state is not.
 */
const AUTH_CHANNEL = 'vacation_auth_sync';

export const AuthProvider = ({ children }) => {
  // ── Auth state backed by the external store ───────────────────────
  const auth = useSyncExternalStore(subscribe, getSnapshot);

  const setAuth = useCallback((updater) => {
    setStoreAuth(updater);
  }, []);

  // ── Persist "remember me" preference ──────────────────────────────
  const persist = getPersist();

  const setPersist = useCallback((updaterOrValue) => {
    const next =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(getPersist())
        : updaterOrValue;
    setPersistFlag(next);
  }, []);

  // ── Cross-tab synchronization via BroadcastChannel ────────────────
  useEffect(() => {
    let channel;
    try {
      channel = new BroadcastChannel(AUTH_CHANNEL);
    } catch {
      // BroadcastChannel not supported (e.g. older Safari) — degrade silently
      return;
    }

    channel.onmessage = (event) => {
      const { type } = event.data;

      if (type === 'LOGOUT') {
        // Another tab logged out — clear local auth immediately
        setStoreAuth({});
      } else if (type === 'LOGIN') {
        // Another tab logged in (possibly as a different user).
        // Reload so PersistLogin re-runs the refresh flow and picks
        // up the new cookie-based session.
        window.location.reload();
      }
    };

    return () => channel.close();
  }, []);

  // ── Broadcast helper attached to context so Login/Logout can call it ──
  const broadcastLogin = useCallback(() => {
    try {
      const ch = new BroadcastChannel(AUTH_CHANNEL);
      ch.postMessage({ type: 'LOGIN' });
      ch.close();
    } catch {
      /* unsupported — no-op */
    }
  }, []);

  const broadcastLogout = useCallback(() => {
    try {
      const ch = new BroadcastChannel(AUTH_CHANNEL);
      ch.postMessage({ type: 'LOGOUT' });
      ch.close();
    } catch {
      /* unsupported — no-op */
    }
  }, []);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      persist,
      setPersist,
      broadcastLogin,
      broadcastLogout,
    }),
    [auth, setAuth, persist, setPersist, broadcastLogin, broadcastLogout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
