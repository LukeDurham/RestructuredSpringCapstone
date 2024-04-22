import React, { useState } from 'react';
import '../../../../global.css';
import AdminSideBar from '../../../../components/AdminSideBar'; // Import AdminSideBar instead of AdminAppBar
import './component.css';
import { Box, Button, Typography } from '@mui/material';

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
            const response = await fetch('/api/permissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newRoleName, createdBy: 'user_id_here' }),
            });

            if (!response.ok) {
                throw new Error('Failed to create permission');
            }
            const data = await response.json();
            console.log('Permission created:', data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create permission. Please try again.');
        }
    };

    return (
        <Box display="flex"> {/* Flex layout for sidebar and main content */}
            <AdminSideBar /> {/* Sidebar */}
            <Box
                flex="1" // Main content should take the remaining space
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh" // Full viewport height to center vertically
                padding={6} // Padding to separate from sidebar
            >
                <Box
                    bgcolor="#f0f0f0" // Light gray background
                    padding={6} // Increased padding inside the box
                    borderRadius="12px" // Rounded corners
                    boxShadow={4} // Stronger shadow for depth
                    width="600px" // Wider box
                >
                    <Typography variant="h4" gutterBottom style={{ color: 'black', fontSize: '36px' }}>
                        {action === 'edit' ? 'Edit Role' : 'Create Account Permissions'}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" marginBottom={4}> {/* Separate edit/create buttons */}
                        <Button variant="contained" color="primary" onClick={() => setAction('edit')}>
                            Edit Role
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => setAction('create')}>
                            Create Role
                        </Button>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={3}> {/* Using Box with gap for spacing */}
                            {action === 'edit' && (
                                <>
                                    <Box>
                                        <Typography style={{ color: 'black', fontSize: '16px' }}>Select Role to Edit:</Typography> {/* Larger text */}
                                        <select
                                            value={selectedRoleId}
                                            onChange={handleRoleChange}
                                            required
                                            style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }} // Consistent styling
                                        >
                                            <option value="">Select Role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Box>
                                    <Box>
                                        <Typography style={{ color: 'black', fontSize: '16px' }}>New Role Name:</Typography>
                                        <input
                                            type="text"
                                            value={selectedRoleName}
                                            onChange={handleRoleNameChange}
                                            style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }}
                                        />
                                    </Box>
                                </>
                            )}
                            {action === 'create' && (
                                <Box>
                                    <Typography style={{ color: 'black', fontSize: '16px' }}>Role Name:</Typography>
                                    <input
                                        type="text"
                                        value={newRoleName}
                                        onChange={handleNewRoleNameChange}
                                        required
                                        style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }}
                                    />
                                </Box>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ padding: '12px', fontSize: '16px' }} // Consistent button styling
                            >
                                {action === 'edit' ? 'Update Role' : 'Submit'}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateAccountPermissions;
