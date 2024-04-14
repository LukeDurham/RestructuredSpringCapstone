import React from 'react';
import { StyledList, StyledListItem, StyledListItemIcon, StyledListItemText } from './styles'; // Adjust import paths as needed
import ButtonBase from '@mui/material/ButtonBase';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Used for "Logout"

const AdminIconMenu = ({ onMenuClick }) => {
    // Define menu items including Logout
    const menuItems = [
        { id: 'UserManagement', text: 'User Management', icon: <PeopleIcon />, onClick: () => onMenuClick('UserManagement') },
        { id: 'SurveyManagement', text: 'Survey Management', icon: <DashboardIcon />, onClick: () => onMenuClick('SurveyManagement') },
        { id: 'Analytics', text: 'Analytics & Reporting', icon: <AssessmentIcon />, onClick: () => onMenuClick('Analytics') },
        { id: 'Notifications', text: 'Notifications', icon: <NotificationsIcon />, onClick: () => onMenuClick('Notifications') },
        { id: 'AuditLogs', text: 'Audit Logs', icon: <HistoryIcon />, onClick: () => onMenuClick('AuditLogs') },
        { id: 'Settings', text: 'Settings', icon: <SettingsIcon />, onClick: () => onMenuClick('Settings') },
        { id: 'Logout', text: 'Logout', icon: <ExitToAppIcon />, onClick: () => onMenuClick('Logout') }, // Add logout action in onMenuClick
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
