import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from '../../components/ToggleColorMode';
import MenuItem from '@mui/material/MenuItem';
import appBarStyles from './styles.js'; // Importing styles
import { useTheme } from '@mui/material/styles'; // Import useTheme

function SurvAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme(); // Get the theme


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Box sx={appBarStyles.mainBox}>
        <Box sx={appBarStyles.growBox}>
          <Button
            variant="text"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(!open)}
            sx={{ ...appBarStyles.menuButton, color: theme.palette.text.primary }} // Use text color from theme
          >
            <MenuIcon />
          </Button>
        </Box>
        <Box>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Box>
      </Box>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ ...appBarStyles.drawerBox, backgroundColor: theme.palette.background.light }} // Use background color from theme
        >
          <Box
            sx={appBarStyles.drawerContentBox}
          >
            <MenuItem
              component={Link}
              to="/surveyordashboard"
              sx={appBarStyles.menuItem}
            >
              Home
            </MenuItem>
          
            <MenuItem
              component={Link}
              to="/logout"
              sx={appBarStyles.menuItem}
            >
              Logout
            </MenuItem>

          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

SurvAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default SurvAppBar;