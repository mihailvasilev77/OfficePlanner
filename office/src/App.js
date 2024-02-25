import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
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
import { Routes, Route } from 'react-router-dom';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} />}>
            <Route path="/request" element={<Request />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor]} />}>
            <Route path="/pendings" element={<Pendings/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} />}>
            <Route path="/calendar" element={<LeaveCalendar />} />
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