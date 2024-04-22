import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../scenes/utils/AuthContext'; // Ensure correct path
import { StyledSideBar } from './styles';
import SurveyorIconMenu from '../SurveyorIconMenu';

const surveyorSideBar = () => {
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
            case 'UserManagement':
                navigate('/surveyor/user_management');
                break;
            case 'SurveyManagement':
                navigate('/surveyor/survey_management');
                break;
            case 'ProjectManagement':
                navigate('/surveyor/project_management');
                break;
            case 'Analytics':
                navigate('/surveyor/Analytics');
                break;
            case 'Notifications':
                navigate('/surveyor/Notifications');
                break;
            case 'OrganizationManagement':
                navigate('/surveyor/organization_management');
                break;
            case 'Settings':
                navigate('/surveyor/Settings');
                break;
            default:
                console.log('No action defined for:', menuId);
        }
    };

    return (
        <StyledSideBar>
            <SurveyorIconMenu onMenuClick={onMenuClick} />
        </StyledSideBar>
    );
};

export default surveyorSideBar;
