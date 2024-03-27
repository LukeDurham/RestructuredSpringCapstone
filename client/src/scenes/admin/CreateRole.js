import React, { useState } from 'react';
import '../../global.css';
import AdminAppBar from '../../components/AdminAppBar'; // Import the AdminAppBar component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Add this line
import getLPTheme from '../../getLPTheme';

const CreateRole = () => {
    const [roleName, setRoleName] = useState('');
    const [mode, setMode] = useState('dark'); // Add this line
    const LPtheme = createTheme(getLPTheme(mode)); // Add this line

    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to create the role without specifying the ID
            const response = await fetch('/api/roles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: roleName })
            });

            if (response.ok) {
                console.log('Role created successfully');
                // Reset form after successful submission
                setRoleName('');
            } else {
                console.error('Failed to create role');
            }
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <div>
                <AdminAppBar mode={mode} toggleColorMode={toggleColorMode} />
                <div className='wrapper'>
                    <h2>Create Role</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='input-sq-box'>
                            <label>Role Name:</label>
                            <input type="text" value={roleName} onChange={handleRoleNameChange} required />
                        </div>
                        <button type="submit">Create Role</button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateRole;
