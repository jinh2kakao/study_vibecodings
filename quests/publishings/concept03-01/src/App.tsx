import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProjectWorkspace from './components/ProjectWorkspace';
import Agents from './components/Agents';
import Orchestra from './components/Orchestra';
import Outputs from './components/Outputs';
import ManageSubscription from './components/ManageSubscription';
import Logout from './components/Logout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:projectId" element={<ProjectWorkspace />}>
          <Route path="agents" element={<Agents />} />
          <Route path="orchestra" element={<Orchestra />} />
          <Route path="outputs" element={<Outputs />} />
          <Route index element={<Agents />} /> {/* Default tab for project workspace */}
        </Route>
        <Route path="/settings/subscription" element={<ManageSubscription />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;