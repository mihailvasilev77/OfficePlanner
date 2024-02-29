import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Layout from './components/Layout';
import Request from './components/Request';
import LeaveCalendar from './components/LeaveCalendar';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Pendings from './components/Pendings';
import Edit from './components/Edit';
import PersonalCalendar from './components/PersonalCalendar';
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<PersistLogin />}>
          
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} />}>
            <Route path="/" element={<LeaveCalendar />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} />}>
            <Route path="/request" element={<Request />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor]} />}>
            <Route path="/pendings" element={<Pendings />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} />}>
            <Route path="/vacation/:userId" element={<PersonalCalendar />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor]} />}>
            <Route path="/edit" element={<Edit />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;