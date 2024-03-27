import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';

function AdminAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
           variant="regular"
           sx={(theme) => ({
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             flexShrink: 0,
             borderRadius: '999px',
             bgcolor:
               theme.palette.mode === 'light'
                 ? 'rgba(255, 255, 255, 0.4)'
                 : 'rgba(0, 0, 0, 0.4)',
             backdropFilter: 'blur(24px)',
             maxHeight: 40,
             border: '1px solid',
             borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 69, 0, 0.7)' : 'divider',
             boxShadow:
               theme.palette.mode === 'light'
                 ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                 : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
             color: theme.palette.mode === 'dark' ? '#FFFFFF' : 'inherit', // Set text color to white in dark mode
           })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  component={Link}
                  to="/admin/dashboard"
                  sx={{ py: '6px', px: '12px', textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Admin Dashboard
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/createuser"
                  sx={{ py: '6px', px: '12px', textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Create User
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/createrole"
                  sx={{ py: '6px', px: '12px', textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Create Role
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/admin/assign-user-role"
                  sx={{ py: '6px', px: '12px', textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Assign Role
                  </Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/admin/user-permissions"
                  sx={{ py: '6px', px: '12px', textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Assign Permissions
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(!open)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem
                    component={Link}
                    to="/features"
                    sx={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                  >
                    Features
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/testimonials"
                    sx={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                  >
                    Testimonials
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/highlights"
                    sx={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                  >
                    Highlights
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/pricing"
                    sx={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                  >
                    Test
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="../SurveyTypes"
                    sx={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                  >
                    Filtering
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AdminAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AdminAppBar;
