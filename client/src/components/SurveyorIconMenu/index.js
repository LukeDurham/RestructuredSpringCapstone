import React from 'react';
import { useAuth } from '../../scenes/utils/AuthContext';
import { StyledList, StyledListItem, StyledListItemIcon, StyledListItemText } from './styles';
import ButtonBase from '@mui/material/ButtonBase';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SurveyorIconMenu = ({ onMenuClick }) => {
    const { logout } = useAuth();

    const handleMenuItemClick = (id) => {
        if (id === 'Logout') {
            console.log('Logout Clicked');
            logout();
        } else {
            onMenuClick(id);
        }
    };

    const menuItems = [
        { id: 'MySurveys', text: 'My Surveys', icon: <DashboardIcon />, onClick: () => handleMenuItemClick('MySurveys') },
        { id: 'SurveyResults', text: 'Survey Results', icon: <AssessmentIcon />, onClick: () => handleMenuItemClick('SurveyResults') },
        { id: 'Tasks', text: 'Tasks & Assignments', icon: <AssignmentIcon />, onClick: () => handleMenuItemClick('Tasks') },
        { id: 'Notifications', text: 'Notifications', icon: <NotificationsIcon />, onClick: () => handleMenuItemClick('Notifications') },
        { id: 'Logout', text: 'Logout', icon: <ExitToAppIcon />, onClick: () => handleMenuItemClick('Logout') },
    ];

    return (
        <StyledList>
            {menuItems.map((item) => (
                <StyledListItem key={item.id} onClick={item.onClick}>
                    <ButtonBase style={{ width: '100%', display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                        <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                        <StyledListItemText primary={item.text} />
                    </ButtonBase>
                </StyledListItem>
            ))}
        </StyledList>
    );
};

export default SurveyorIconMenu;
