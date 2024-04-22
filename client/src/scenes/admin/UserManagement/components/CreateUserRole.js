import React, { useState } from 'react';
import '../../../../global.css';  // Ensure path correctness
import AdminSideBar from '../../../../components/AdminSideBar'; // Import AdminSideBar
import { Box, Button, Typography } from '@mui/material'; // Use MUI components for styling consistency


const CreateUserRole = () => {
    const [roleName, setRoleName] = useState('');

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

    return (
        <Box display="flex"> {/* Flex layout for sidebar and main content */}
            <AdminSideBar /> {/* Sidebar */}
            <Box
                flex="1" // Main content should take the remaining space
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh" // Full viewport height for vertical centering
                padding={6} // Padding to separate from sidebar
            >
                <Box
                    bgcolor="#f0f0f0" // Light gray background
                    padding={6} // Sufficient padding for spacing
                    borderRadius="12px" // Rounded corners
                    boxShadow={4} // Subtle box shadow for depth
                    width="600px" // Wider box for content
                >
                    <Typography variant="h4" style={{ color: 'black', fontSize: '36px' }} gutterBottom>
                        Create Role
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={3}> {/* Using gap for spacing */}
                            <Box>
                                <Typography style={{ color: 'black', fontSize: '16px' }}>Role Name:</Typography> {/* Label with larger font */}
                                <input
                                    type="text"
                                    value={roleName}
                                    onChange={handleRoleNameChange}
                                    required
                                    style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }} // Styling for input
                                />
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ padding: '12px', fontSize: '16px' }} // Consistent button styling
                            >
                                Create Role
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};


export default CreateUserRole;
