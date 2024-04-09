import React, { useState } from 'react';
import AdminAppBar from '../../../../components/AdminAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getLPTheme from '../../../../getLPTheme';

const CreateAccountPermissions = () => {
     const [roles, setRoles] = useState([
         { id: '1', name: 'Admin' },
         { id: '2', name: 'Respondent' },
         { id: '3', name: 'Surveyor' },
     ]);
    const [action, setAction] = useState('');
    const [newRoleName, setNewRoleName] = useState('');
    const [selectedRoleId, setSelectedRoleId] = useState('');
    const [selectedRoleName, setSelectedRoleName] = useState('');
    const [mode, setMode] = useState('dark');
    const LPtheme = createTheme(getLPTheme(mode));

    const handleRoleChange = (e) => {
        const roleId = e.target.value;
        setSelectedRoleId(roleId);
        const selectedRole = roles.find(role => role.id === roleId);
        setSelectedRoleName(selectedRole ? selectedRole.name : '');
    };

    const handleRoleNameChange = (e) => {
        setSelectedRoleName(e.target.value);
    };

    const handleNewRoleNameChange = (e) => {
        setNewRoleName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!newRoleName.trim()) {
                alert('Permission name cannot be empty.');
                return;
            }
    
            // Adjust the URL and data structure as per your backend API for permissions
            const response = await fetch('/api/permissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Example: Assuming 'createdBy' is a fixed value or derived from session/user context
                body: JSON.stringify({ name: newRoleName, createdBy: 'user_id_here' }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create permission');
            }
    
            // Parse response data if needed
            const data = await response.json();
    
            // Handle response data, like updating UI or state accordingly
            console.log('Permission created:', data);
    
            // Reset form state or perform other UI updates as needed
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create permission. Please try again.');
        }
    };
    



    const toggleColorMode = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <div>
                <AdminAppBar mode={mode} toggleColorMode={toggleColorMode} />
                <div className='wrapper'>
                    <h2>{action === 'edit' ? 'Edit Role' : 'Create Account Permissions'}</h2>
                    <button onClick={() => setAction('edit')}>Edit Role</button>
                    <button onClick={() => setAction('create')}>Create Role</button>
                    <form onSubmit={handleSubmit} className="custom-form">
                        {action === 'edit' && (
                             <>
                                <div className='custom-dropdown custom-dropdown-role'>
                                    <label>Select Role to Edit:</label>
                                    <select value={selectedRoleId} onChange={handleRoleChange} required>
                                        <option value="">Select Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='custom-dropdown custom-dropdown-role'>
                                    <label>New Role Name:</label>
                                    <input type="text" value={selectedRoleName} onChange={handleRoleNameChange} />
                                </div>
                            </>
                        )}
                        {action === 'create' && (
                            <div className='custom-dropdown custom-dropdown-role'>
                                <label>Role Name:</label>
                                <input type="text" value={newRoleName} onChange={handleNewRoleNameChange} required />
                            </div>
                        )}
                        <button type="submit">{action === 'edit' ? 'Update Role' : 'Submit'}</button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateAccountPermissions;
