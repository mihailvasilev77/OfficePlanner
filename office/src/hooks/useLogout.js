import { useCallback } from 'react';
import axiosPublic from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth, broadcastLogout } = useAuth();

  const logout = useCallback(async () => {
    setAuth({});
    broadcastLogout();

    try {
      await axiosPublic.get('/logout', { withCredentials: true });
    } catch (err) {
      console.error('Logout request failed:', err);
    }
  }, [setAuth, broadcastLogout]);

  return logout;
};

export default useLogout;
