import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import logo from '../../assets/insightpro_logo.png'; // Make sure path is correct

const StyledHome = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: 20,
  textAlign: 'center',
  minHeight: '100vh',
  overflowX: 'hidden'
}));

const LogoImage = styled('img')({
  maxWidth: '300px', // Ensures the logo is not too large
  width: '50%', // Responsive width
  height: 'auto', // Maintain aspect ratio
  display: 'block', // Centers the logo with margin auto if needed
  margin: '0 auto 20px auto' // Adds space below the logo
});



function HomePage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <StyledHome>
      <LogoImage src={logo} alt="Insight Pro Logo" />
      <Typography variant="h4">Welcome to Insight Pro</Typography>
      <Typography variant="subtitle1">Your go-to solution for insightful analytics and data visualization.</Typography>
      <Button variant="contained" color="primary" onClick={goToLogin}>Login</Button>
    </StyledHome>
  );
}

export default HomePage;



// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// import './HomePage.css'; // Ensure this path is correct
// import logo from '../../assets/insightpro_logo.png';

// function HomePage({ setThemeType }) {
//   const navigate = useNavigate(); // Hook for navigation

//   const goToLogin = () => {
//     navigate('/login'); // Programmatically navigate to /login route
//   };

//   return (
//     <div className="home-page">
//       <img src={logo} alt="Insight Pro Logo" className="logo" />
//       <h1>Welcome to Insight Pro</h1>
//       <p>Your go-to solution for insightful analytics and data visualization.</p>
//       {/* Button that when clicked, navigates to the login page */}
//       <button onClick={goToLogin} className="login-button">Login</button>
//     </div>

//   );
// }

// export default HomePage;

