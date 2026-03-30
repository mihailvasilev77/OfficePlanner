import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import FrontPage from './components/FrontPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import Missing from './components/Missing.jsx';
import PersistLogin from './components/PersistLogin.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import LeaveCalendar from './components/LeaveCalendar.jsx';
import Request from './components/Request.jsx';
import Profile from './components/Profile.jsx';
import PersonalCalendar from './components/PersonalCalendar.jsx';
import Pendings from './components/Pendings.jsx';
import Edit from './components/Edit.jsx';

import { loginAction } from './components/Login.jsx';
import { registerAction } from './components/Register.jsx';
import { requestAction } from './components/Request.jsx';
import { editAction } from './components/Edit.jsx';

import { pendingsLoader } from './components/Pendings.jsx';
import { calendarLoader } from './components/LeaveCalendar.jsx';
import { personalCalendarLoader } from './components/PersonalCalendar.jsx';
import { editLoader } from './components/Edit.jsx';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

/**
 * Application router built with React Router v6.4+ Data APIs.
 *
 * Key architectural decisions:
 *  - createBrowserRouter replaces the old <Routes> tree.
 *  - Loaders fetch data *before* rendering (no useEffect + useState).
 *  - Actions handle form mutations via the <Form> component.
 *  - Protected routes are grouped under PersistLogin → RequireAuth
 *    layout wrappers instead of wrapping each route individually.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Missing />,
    children: [
      /* ── Public routes ─────────────────────────────────────── */
      { index: true, element: <FrontPage /> },
      { path: 'login', element: <Login />, action: loginAction },
      { path: 'register', element: <Register />, action: registerAction },
      { path: 'unauthorized', element: <Unauthorized /> },

      /* ── Protected routes (wrapped in PersistLogin) ────────── */
      {
        element: <PersistLogin />,
        children: [
          /* Routes for User + Editor + Admin */
          {
            element: (
              <RequireAuth
                allowedRoles={[ROLES.Admin, ROLES.Editor, ROLES.User]}
              />
            ),
            children: [
              {
                path: 'calendar',
                element: <LeaveCalendar />,
                loader: calendarLoader,
              },
              {
                path: 'request',
                element: <Request />,
                action: requestAction,
              },
              { path: 'profile', element: <Profile /> },
              {
                path: 'vacation/:username',
                element: <PersonalCalendar />,
                loader: personalCalendarLoader,
              },
            ],
          },

          /* Routes for Editor + Admin only */
          {
            element: (
              <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />
            ),
            children: [
              {
                path: 'pendings',
                element: <Pendings />,
                loader: pendingsLoader,
              },
              {
                path: 'edit/:id',
                element: <Edit />,
                loader: editLoader,
                action: editAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);
