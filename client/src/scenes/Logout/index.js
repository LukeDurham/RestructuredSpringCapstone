// Logout.js
import React from 'react';
import { useAuth } from '../utils/AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    
    // Optionally redirect the user to the homepage or login page after logging out
    // e.g., using history.push('/') if you're using react-router
  };

  return (
    <div>
      <h1>You are about to log out</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;