import axios from 'axios';
import { getAuth, setAuth } from '../store/authStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3500';

/**
 * Public Axios instance — used for endpoints that don't require auth
 * (login, register, refresh, logout).
 */
const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

/**
 * Private Axios instance — automatically attaches the access token
 * and silently refreshes it on 403 responses.
 *
 * Interceptors live at the module level so Router loaders/actions
 * (which run outside the React tree) can use this instance directly.
 */
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// ── Request interceptor: inject access token ────────────────────────
axiosPrivate.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuth();
    if (accessToken && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor: silent refresh on 403 ─────────────────────
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 403 && !prevRequest?._retry) {
      prevRequest._retry = true;

      try {
        const { data } = await axiosPublic.get('/refresh', {
          withCredentials: true,
        });

        setAuth((prev) => ({
          ...prev,
          roles: data.roles,
          username: data.username,
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          vacationLeaves: data.vacationLeaves,
          accessToken: data.accessToken,
        }));

        prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosPrivate(prevRequest);
      } catch (refreshError) {
        // Refresh failed — clear auth and let the caller handle it
        setAuth({});
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosPublic;
export { axiosPrivate };
