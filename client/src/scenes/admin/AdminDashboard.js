import React, { useState } from "react";
import '../../global.css'
import { useNavigate } from 'react-router-dom';
import AdminAppBar from '../../components/AdminAppBar'; // Import the AdminAppBar component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Add this line
import getLPTheme from '../../getLPTheme';

const AdminDashboard = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [mode, setMode] = useState('dark'); // Add this line
    const LPtheme = createTheme(getLPTheme(mode)); // Add this line

    const goToCreateUser = () => {
        navigate('/admin/createuser'); // Programmatically navigate to /createuser route
    };

    const goToCreateAccountPermissions = () => {
        navigate('/admin/create-account-permissions'); // Programmatically navigate to /createuser route
    };

    const goToCreateRole = () => {
        navigate('/createrole'); // Programmatically navigate to /createrole route
    };
    const goToAssignUserRole = () => {
        navigate('/admin/assign-user-role'); // Programmatically navigate to /admin/assign-user-role route
    };
    const goToUserPermissions = () => {
        navigate('/admin/user-permissions'); // Programmatically navigate to /admin/user-permissions route
    };

    const goToSurveyDashboard = () => {
        navigate('/surveydashboard'); 
    };

    const goToAdminSurveyDashboard = () => {
        navigate('/surveyor/dashboard');
    };

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <div>
                <AdminAppBar mode={mode} toggleColorMode={toggleColorMode} />
                <div className="wrapper"> {/* Wrap the buttons in a div */}
                    <h1>Admin Dashboard</h1>
                    <button onClick={goToCreateAccountPermissions} className="login-button">Create Account Permissions</button>
                    <button onClick={goToCreateUser} className="login-button">Create User</button>
                    <button onClick={goToCreateRole} className="login-button">Create Role</button>
                    <button onClick={goToCreateAccountPermissions} className="login-button">Assign User Role</button>
                    <button onClick={goToUserPermissions} className="login-button">Assign Permissions</button>
                    <button onClick={goToSurveyDashboard} className="login-button">Survey Dashboard</button>
                    <button onClick={goToAdminSurveyDashboard} className="login-button">Admin Survey Dashboard</button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default AdminDashboard;
