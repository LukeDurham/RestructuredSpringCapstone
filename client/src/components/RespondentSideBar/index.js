import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensuring useNavigate is imported for navigation
import { StyledSideBar } from './styles'; // Assuming styles are properly set up for the sidebar
import RespondentIconMenu from '../RespondentIconMenu'; // Adjust path as necessary
import { useAuth } from '../../scenes/utils/AuthContext'; // Ensure correct path

const RespondentSideBar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // Get both logout function and user state

  useEffect(() => {
    if (user === null) {
      console.log('User logged out, navigating to home.');
      navigate('/'); // Navigate to the homepage if the user is null
    }
  }, [user, navigate]); // Depend on user and navigate to handle changes
  const onMenuClick = (menuId) => {
    switch (menuId) {
      case 'Logout':
        console.log('Logout initiated');
        logout(); // Call logout function which should set user to null
        break;
      case 'ViewActive':
        navigate('/respondent/activesurveys'); // Assuming this is the route for active surveys
        break;
      case 'ViewPast':
        navigate('/surveys/past'); // Assuming this is the route for past surveys
        break;
      default:
        console.log('No action defined for: ', menuId);
    }
  };

  return (
    <StyledSideBar>
      <RespondentIconMenu onMenuClick={onMenuClick} />
    </StyledSideBar>
  );
};

export default RespondentSideBar;