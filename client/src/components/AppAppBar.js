import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import MenuItem from '@mui/material/MenuItem';

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);

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
            sx={{ minWidth: '30px', p: '4px' }}
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
          sx={{
            width: '250px',
            backgroundColor: 'background.paper',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
              p: 2,
            }}
          >
            <MenuItem
              component={Link}
              to="/surveydashboard"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Home
            </MenuItem>
            <MenuItem
              component={Link}
              to="/create-survey"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Create Survey
            </MenuItem>
            <MenuItem
              component={Link}
              to="/add-survey-template"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Survey Templates
            </MenuItem>
            <MenuItem
              component={Link}
              to="/email-template"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Email Template
            </MenuItem>
            <MenuItem
              component={Link}
              to="/survey-types"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Filtering
            </MenuItem>
            <MenuItem
              component={Link}
              to="/login"
              sx={{ textDecoration: 'none', color: 'inherit', mb: 1 }}
            >
              Logout
            </MenuItem>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
