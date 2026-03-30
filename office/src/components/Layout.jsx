import { Outlet } from 'react-router-dom';
import NavbarHook from './NavbarHook.jsx';
import useAuth from '../hooks/useAuth';

/**
 * Root layout component.
 *
 * Architectural fix: NavbarHook was previously nested inside PersistLogin,
 * meaning it only rendered for authenticated routes. It now lives in
 * Layout where it belongs and conditionally renders based on auth state.
 */
const Layout = () => {
  const { auth } = useAuth();
  const isLoggedIn = Boolean(auth?.accessToken);

  return (
    <>
      {isLoggedIn && <NavbarHook />}
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
