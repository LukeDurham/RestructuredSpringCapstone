import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material'; // Using MUI components for consistency
import AdminSideBar from '../../../../components/AdminSideBar'; // Sidebar component

const AssignUserPermissions = () => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        fetchRoles();
        fetchUsers();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await fetch('/api/roles');
            if (response.ok) {
                const data = await response.json();
                setRoles(data.roles || []);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data || []);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value);
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUserId || !selectedRole) {
            alert('Please select both a user and a role.');
            return;
        }
        try {
            const response = await fetch('/api/assign_role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: selectedUserId, roleId: selectedRole }),
            });
            if (response.ok) {
                console.log('Role assigned successfully');
                setSelectedUserId('');
                setSelectedRole('');
            } else {
                console.error('Failed to assign role');
            }
        } catch (error) {
            console.error('Error assigning role:', error);
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
                padding={6} // Increased padding for more space around the content
            >
                <Box
                    bgcolor="#f0f0f0" // Light gray background
                    padding={6} // Increased padding inside the box
                    borderRadius="12px" // Larger border radius for a more rounded look
                    boxShadow={4} // Larger shadow for more depth
                    width="600px" // Wider box to accommodate larger elements
                >
                    <Typography variant="h4" gutterBottom style={{ color: 'black', fontSize: '36px' }}> {/* Larger font size */}
                        Assign User Permissions
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={3}> {/* Larger gap between elements */}
                            <Box>
                                <label style={{ color: 'black', fontSize: '16px' }}>User Email:</label> {/* Larger text */}
                                <select
                                    value={selectedUserId}
                                    onChange={handleUserChange}
                                    required
                                    style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }} // Larger padding and font size
                                >
                                    <option value="">Select User Email</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.email}
                                        </option>
                                    ))}
                                </select>
                            </Box>
                            <Box>
                                <label style={{ color: 'black', fontSize: '16px' }}>Role:</label> {/* Larger text */}
                                <select
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    required
                                    style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }} // Larger padding and font size
                                >
                                    <option value="">Select Role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ padding: '12px', fontSize: '16px' }} // Larger button
                            >
                                Assign Role
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default AssignUserPermissions;
