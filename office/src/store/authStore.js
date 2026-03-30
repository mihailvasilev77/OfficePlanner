/**
 * External auth store — holds auth state outside of React so that
 * Axios interceptors, Router loaders/actions, and React components
 * can all read and write to a single source of truth.
 *
 * React components consume this through AuthProvider + useSyncExternalStore.
 */

let authState = {};
const listeners = new Set();

export const getAuth = () => authState;

export const setAuth = (updaterOrValue) => {
  authState =
    typeof updaterOrValue === 'function'
      ? updaterOrValue(authState)
      : updaterOrValue;
  listeners.forEach((fn) => fn(authState));
};

/** Subscribe to auth state changes (used by useSyncExternalStore). */
export const subscribe = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

/** Snapshot getter (used by useSyncExternalStore). */
export const getSnapshot = () => authState;

/** Persist preference for "remember me" across reloads. */
export const getPersist = () =>
  JSON.parse(localStorage.getItem('persist')) || false;

export const setPersistFlag = (value) =>
  localStorage.setItem('persist', JSON.stringify(value));
