import React from 'react';
import { StyledList, StyledListItem, StyledListItemIcon, StyledListItemText } from './styles'; // Adjust import paths as needed
import ButtonBase from '@mui/material/ButtonBase';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; // Example icon for View Active
import HistoryIcon from '@mui/icons-material/History'; // Icon for View Past
import SettingsIcon from '@mui/icons-material/Settings'; // Reused icon for Settings
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Reused icon for Logout

const RespondentIconMenu = ({ onMenuClick }) => {
    // Define menu items including View Active, View Past, Settings, and Logout
    const menuItems = [
        { id: 'ViewActive', text: 'View Active', icon: <EventAvailableIcon />, onClick: () => onMenuClick('ViewActive') },
        { id: 'ViewPast', text: 'View Past', icon: <HistoryIcon />, onClick: () => onMenuClick('ViewPast') },
        { id: 'Settings', text: 'Settings', icon: <SettingsIcon />, onClick: () => onMenuClick('Settings') },
        { id: 'Logout', text: 'Logout', icon: <ExitToAppIcon />, onClick: () => onMenuClick('Logout') }
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

export default RespondentIconMenu;
