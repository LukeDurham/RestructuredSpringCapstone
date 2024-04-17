import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensuring useNavigate is imported for navigation
import { StyledSideBar } from './styles'; // Assuming styles are properly set up for the sidebar
import RespondentIconMenu from '../RespondentIconMenu'; // Adjust path as necessary

const RespondentSideBar = () => {
  const navigate = useNavigate();

  const onMenuClick = (menuId) => {
    switch (menuId) {
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