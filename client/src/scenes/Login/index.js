import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; // Ensure this is the correct import path

import { styled, Box, TextField, Button, Paper, Typography } from '@mui/material';
const StyledHome = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex', // Enable flex container
    flexDirection: 'column', // Stack children vertically
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    overflowX: 'hidden',
    padding: theme.spacing(2.5) // Use theme spacing
}));

// ... rest of


const LoginBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    width: '100%',
    maxWidth: '800px',
    minHeight: '470px',
    margin: 'auto',
}));

// Styling for all buttons to be rounded
const RoundedButton = styled(Button)(({ theme }) => ({
    borderRadius: '20px',  // Adjust as needed for more or less roundness
    padding: theme.spacing(1, 4),  // Vertical and horizontal padding
    margin: theme.spacing(1),  // Margin for spacing around the button
}));

// Special styling for the login button to make it larger
const LoginButton = styled(Button)(({ theme }) => ({
    borderRadius: '20px', // Rounded edges
    padding: theme.spacing(1.5, 5), // Larger padding for a bigger button
    fontSize: '1.1rem', // Larger font size for better visibility
    backgroundColor: theme.palette.primary.main, // Use theme's primary color
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark, // Darker on hover
    },
    marginTop: theme.spacing(2) // Add some margin top
}));




const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            switch (user.roleId) {
                case 1:
                    navigate('/admin/dashboard');
                    break;
                case 2:
                    navigate('/surveyor/dashboard');
                    break;
                case 3:
                    navigate('/respondent/dashboard');
                    break;
                default:
                    navigate('/');
                    break;
            }
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <StyledHome>
            <LoginBox>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        required
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        required
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <LoginButton type="submit">Login</LoginButton>
                </Box>
            </LoginBox>
        </StyledHome>
    );
};

export default Login;
