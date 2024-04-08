import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const drawerStyles = {
  drawerBox: {
    width: '250px',
    flexGrow: 1,
  },
  drawerContentBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    p: 2,
  },
  menuItem: {
    textDecoration: 'none',
    color: 'inherit',
    mb: 1,
  },
};

function AdminAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme(); // Get the theme

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            variant="text"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(!open)}
            sx={{ minWidth: '30px', p: '4px', color: theme.palette.text.primary }} // Use text color from theme
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
          sx={{ ...drawerStyles.drawerBox, backgroundColor: theme.palette.background.light }} // Use background color from theme
        >
          <Box
            sx={{ ...drawerStyles.drawerContentBox, color: theme.palette.text.primary }} // Use text color from theme
          >
            <MenuItem
              component={Link}
              to="/admin/dashboard"
              sx={{ ...drawerStyles.menuItem }}
            >
              Admin Dashboard
            </MenuItem>
            <MenuItem
              component={Link}
              to="/createuser"
              sx={{ ...drawerStyles.menuItem }}
            >
              Create User
            </MenuItem>
            <MenuItem
              component={Link}
              to="/createrole"
              sx={{ ...drawerStyles.menuItem }}
            >
              Create Role
            </MenuItem>
            <MenuItem
              component={Link}
              to="/admin/assign-user-role"
              sx={{ ...drawerStyles.menuItem }}
            >
              Assign Role
            </MenuItem>
            <MenuItem
              component={Link}
              to="/login"
              sx={{ ...drawerStyles.menuItem }}
            >
              Logout
            </MenuItem>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

AdminAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AdminAppBar;
