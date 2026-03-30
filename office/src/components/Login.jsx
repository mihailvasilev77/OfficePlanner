import { useRef, useEffect } from 'react';
import { Link, Form, useActionData, useNavigate, useLocation } from 'react-router-dom';
import axiosPublic from '../api/axios';
import { setAuth as setStoreAuth } from '../store/authStore';
import useAuth from '../hooks/useAuth';

/**
 * Router action — runs on <Form> submission (no manual e.preventDefault).
 *
 * Fixes:
 *  - Only sends `user` and `pwd` to /auth (Login sent fname/lname/email before).
 *  - Returns structured error for the component to display.
 */
export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const user = formData.get('user');
  const pwd = formData.get('pwd');

  if (!user || !pwd) {
    return { error: 'Username and password are required.' };
  }

  try {
    const { data } = await axiosPublic.post(
      '/auth',
      { user, pwd },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
    );

    // Write to the external store so interceptors have the token immediately
    setStoreAuth({
      roles: data.roles,
      user,
      username: data.username,
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      vacationLeaves: data.vacationLeaves,
      accessToken: data.accessToken,
    });

    // Signal success + broadcast login for cross-tab sync
    return { success: true, user };
  } catch (err) {
    if (!err?.response) return { error: 'No Server Response' };
    if (err.response?.status === 400) return { error: 'Missing Username or Password' };
    if (err.response?.status === 401) return { error: 'Unauthorized' };
    return { error: 'Login Failed' };
  }
};

const Login = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  const location = useLocation();
  const { persist, setPersist, broadcastLogin } = useAuth();

  const userRef = useRef();
  const from = location.state?.from?.pathname || '/calendar';

  useEffect(() => {
    document.title = 'Login page';
    userRef.current?.focus();
  }, []);

  // Navigate after successful login
  useEffect(() => {
    if (actionData?.success) {
      broadcastLogin();
      navigate(from, { replace: true });
    }
  }, [actionData, navigate, from, broadcastLogin]);

  // Sync persist checkbox to localStorage
  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <section>
      {actionData?.error && (
        <p className="errmsg" aria-live="assertive">
          {actionData.error}
        </p>
      )}
      <h1>Sign In</h1>
      <Form method="post">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="user"
          placeholder="Enter your username"
          ref={userRef}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="pwd"
          placeholder="Enter your password"
          required
        />

        <button type="submit">Sign In</button>

        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={() => setPersist((prev) => !prev)}
            checked={persist}
          />
          <label htmlFor="persist">Remember this device</label>
        </div>
      </Form>
      <p>
        Don't have an account?&nbsp;
        <span className="line">
          <Link to="/register">Sign up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
