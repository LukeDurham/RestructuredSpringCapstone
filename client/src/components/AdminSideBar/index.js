import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../scenes/utils/AuthContext'; // Ensure correct path
import { StyledSideBar } from './styles';
import AdminIconMenu from '../AdminIconMenu';

const AdminSideBar = () => {
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
                navigate('/admin/UserManagement');
                break;
            case 'SurveyManagement':
                navigate('/admin/SurveyManagement');
                break;
            case 'Analytics':
                navigate('/admin/Analytics');
                break;
            case 'Notifications':
                navigate('/admin/Notifications');
                break;
            case 'AuditLogs':
                navigate('/admin/AuditLogs');
                break;
            case 'Settings':
                navigate('/admin/Settings');
                break;
            default:
                console.log('No action defined for:', menuId);
        }
    };

    return (
        <StyledSideBar>
            <AdminIconMenu onMenuClick={onMenuClick} />
        </StyledSideBar>
    );
};

export default AdminSideBar;
