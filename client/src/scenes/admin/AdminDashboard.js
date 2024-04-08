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

    const goToCreateSurveyTemplate = () => {
        navigate('/admin/CreateSurveyTemplate');
    };

    const goToAdminSurveyDashboard = () => {
        navigate('/admin/surveydashboard');
    };

    const gotoAddQuestion = () => {
        navigate('/admin/addQuestion')
    };

    const goToOrganizations = () => {
        navigate('/admin/organizations')
    };

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <div>
                <AdminAppBar mode={mode} toggleColorMode={toggleColorMode} />
                <div className="wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}> {/* Wrap the buttons in a div */}
                    <h1>Admin Dashboard</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}> {/* Use flexbox to layout buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
                            <button onClick={goToCreateAccountPermissions} className="login-button" style={{ padding: '7px 20px', margin: '5px 0', width: '100%', textAlign: 'center', fontSize: '14px' }}>Create Account Permissions</button>
                            <button onClick={goToCreateUser} className="login-button" style={{ padding: '7px 20px', margin: '5px 0', width: '100%', textAlign: 'center', fontSize: '14px' }}>Create User</button>
                            <button onClick={goToCreateAccountPermissions} className="login-button" style={{ padding: '7px 20px', margin: '5px 0', width: '100%', textAlign: 'center', fontSize: '14px' }}>Assign User Role</button>
                            <button onClick={goToCreateSurveyTemplate} className="login-button" style={{ padding: '7px 20px', margin: '5px 0', width: '100%', textAlign: 'center', fontSize: '14px' }}>Create Survey Template</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
                            <button onClick={goToUserPermissions} className="login-button" style={{ padding: '7px 20px', margin: '5px 0', width: '100%', textAlign: 'center', fontSize: '14px' }}>Assign Permissions</button>
                            <button onClick={gotoAddQuestion} className="login-button" style={{ padding: '7px 20px', margin: '5px 0', width: '100%', textAlign: 'center', fontSize: '14px' }}>addQuestion</button>
                            <button onClick={goToOrganizations} className="login-button" style={{ padding: '7px 20px', margin: '5px 0', width: '100%', textAlign: 'center', fontSize: '14px' }}>Organizations</button>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default AdminDashboard;
