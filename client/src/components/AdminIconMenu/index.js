import React from 'react';
import { useAuth } from '../../scenes/utils/AuthContext';
import { StyledList, StyledListItem, StyledListItemIcon, StyledListItemText } from './styles'; // Adjust import paths as needed
import ButtonBase from '@mui/material/ButtonBase';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group'; // Import the Group icon
import AssignmentIcon from '@mui/icons-material/Assignment'; // Import the icon from MUI

import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Used for "Logout"

const AdminIconMenu = ({ onMenuClick }) => {
    const { logout } = useAuth(); // Get logout function from AuthContext

    const handleMenuItemClick = (id) => {
        if (id === 'Logout') {
            console.log('Logout Clicked');
            logout(); // Directly call logout when Logout is clicked
        } else {
            onMenuClick(id);
        }
    };

    // Define menu items including Logout
    const menuItems = [
        { id: 'UserManagement', text: 'User Management', icon: <PeopleIcon />, onClick: () => handleMenuItemClick('UserManagement') },
        { id: 'SurveyManagement', text: 'Survey Management', icon: <DashboardIcon />, onClick: () => handleMenuItemClick('SurveyManagement') },
        { id: 'OrganizationManagement', text: 'Organization Management', icon: <GroupIcon />, onClick: () => handleMenuItemClick('OrganizationManagement') },
        { id: 'ProjectManagement', text: 'Project Management', icon: <AssignmentIcon />, onClick: () => handleMenuItemClick('ProjectManagement') },
        { id: 'Analytics', text: 'Analytics & Reporting', icon: <AssessmentIcon />, onClick: () => handleMenuItemClick('Analytics') },
        { id: 'Notifications', text: 'Notifications', icon: <NotificationsIcon />, onClick: () => handleMenuItemClick('Notifications') },
        { id: 'Settings', text: 'Settings', icon: <SettingsIcon />, onClick: () => handleMenuItemClick('Settings') },
        { id: 'Logout', text: 'Logout', icon: <ExitToAppIcon />, onClick: () => handleMenuItemClick('Logout') },
    ];

    return (
        <StyledList>
            {menuItems.map((item) => (
                <StyledListItem key={item.id} onClick={item.onClick}>
                    <ButtonBase style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                        <StyledListItemText primary={item.text} />
                    </ButtonBase>
                </StyledListItem>
            ))}
        </StyledList>
    );
};

export default AdminIconMenu;
