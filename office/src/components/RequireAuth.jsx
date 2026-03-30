import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Route guard that checks the user's roles against allowedRoles.
 *
 * Used as a layout wrapper in the router config so multiple child routes
 * can share a single guard instead of wrapping each one individually.
 */
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const hasRequiredRole = auth?.roles?.some((role) =>
    allowedRoles?.includes(role),
  );

  if (hasRequiredRole) return <Outlet />;

  // Authenticated but wrong role → Unauthorized page
  if (auth?.accessToken) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Not authenticated → redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
