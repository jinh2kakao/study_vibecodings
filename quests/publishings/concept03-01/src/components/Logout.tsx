import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate JWT token deletion (e.g., clear local storage)
    console.log('Simulating JWT token deletion...');
    localStorage.removeItem('jwt_token'); // Example: remove a token if it were stored

    // Redirect to login page
    console.log('Redirecting to login page...');
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800">Logging out...</h2>
    </div>
  );
}

export default Logout;
