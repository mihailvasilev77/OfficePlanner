import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Layout from './components/Layout';
import Request from './components/Request';
import LeaveCalendar from './components/LeaveCalendar';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Pendings from './components/Pendings';
import Edit from './components/Edit';
import PersonalCalendar from './components/PersonalCalendar';
import FrontPage from './components/FrontPage';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* Public Routes */}
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          
          {/* Admin, Editor, and User Routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor, ROLES.User]} />}>
            <Route path="/calendar" element={<LeaveCalendar />} />
            <Route path="/request" element={<Request />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vacation/:userId" element={<PersonalCalendar />} />
          </Route>

          {/* Admin and Editor Routes Only */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
            <Route path="/pendings" element={<Pendings />} />
            <Route path="/edit" element={<Edit />} />
          </Route>

        </Route>

        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;