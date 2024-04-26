import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Moon icon for light mode
import LightModeIcon from '@mui/icons-material/LightMode'; // Sun icon for dark mode
import { styled } from '@mui/material/styles';
import { useThemeContext } from '../../ThemeContext'; // Import the theme context hook
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'space-between', // Ensures items are spaced on the far ends and center
    alignItems: 'center', // Aligns items vertically
}));

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { toggleTheme, mode } = useThemeContext(); // Use the toggleTheme function and current mode from context

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <StyledToolbar>
                {/* Conditional Icon Button for Theme Toggle */}
                <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <Typography variant="h1" component="div" style={{ flexGrow: 1, textAlign: 'center' }}>
                    
                </Typography>
                {/* Navigation Buttons */}
                <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
                <Button color="inherit" onClick={() => navigate('/support')}>Support</Button>

                <Menu
                    id="theme-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={toggleTheme}>Toggle Light/Dark</MenuItem>
                </Menu>
            </StyledToolbar>
        </AppBar>
    );
};

export default Header;
