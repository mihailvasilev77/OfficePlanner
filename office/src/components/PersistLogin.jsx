import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

/**
 * Layout route that silently refreshes the access token on hard reloads
 * when "persist" (remember me) is enabled.
 *
 * Architectural change: NavbarHook has been moved up to <Layout /> where
 * it belongs — PersistLogin is now purely an auth-refresh gate.
 */
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch {
        // Refresh failed — user will be redirected by RequireAuth
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!persist) return <Outlet />;
  if (isLoading) return <p>Loading...</p>;
  return <Outlet />;
};

export default PersistLogin;
