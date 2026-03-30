import { useCallback } from 'react';
import axiosPublic from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
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

    return data.accessToken;
  }, [setAuth]);

  return refresh;
};

export default useRefreshToken;
