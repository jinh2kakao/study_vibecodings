import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Login() {
  return <h2>Login Page</h2>;
}

function Signup() {
  return <h2>Signup Page</h2>;
}

function Dashboard() {
  return <h2>Dashboard Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;