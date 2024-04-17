import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './HomePage.css'; // Ensure this path is correct
import logo from '../../assets/insightpro_logo.png';


function HomePage() {
  const navigate = useNavigate(); // Hook for navigation

  const goToLogin = () => {
    navigate('/login'); // Programmatically navigate to /login route
  };


  return (
    <div className="home-page">
      <img src={logo} alt="Insight Pro Logo" className="logo" />
      <h1>Welcome to Insight Pro</h1>
      <p>Your go-to solution for insightful analytics and data visualization.</p>
      {/* Button that when clicked, navigates to the login page */}
      <button onClick={goToLogin} className="login-button">Login</button>
    </div>
  );
}

export default HomePage;
