import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { StyledSideBar } from './styles';
import AdminIconMenu from '../AdminIconMenu'; // Correct the path as necessary

const AdminSideBar = () => {
    const navigate = useNavigate();

    const onMenuClick = (menuId) => {
        switch (menuId) {
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
            case 'Logout':
                // Implement logout functionality here
                navigate('/logout');
                break;
            default:
                console.log('No action defined for: ', menuId);
        }
    };

    return (
        <StyledSideBar>
            <AdminIconMenu onMenuClick={onMenuClick} />
        </StyledSideBar>
    );
};

export default AdminSideBar;
