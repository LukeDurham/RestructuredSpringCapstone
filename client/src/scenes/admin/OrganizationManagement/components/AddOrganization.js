import React, { useState, useContext } from 'react';
import { useAuth } from '../../../../scenes/utils/AuthContext'; // Ensure path is correct
import AdminSideBar from '../../../../components/AdminSideBar'; // Correct the path as necessary
import { Box, Button, Typography, TextField } from '@mui/material'; // Use MUI components for consistency


const AddOrganization = () => {
    const [organizationName, setOrganizationName] = useState('');
    const { user } = useAuth(); // Access user from AuthContext
    const userId = user ? user.userId : null; // Assuming 'user' has 'userId'

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const organizationData = {
            name: organizationName,
            created_at: new Date().toISOString(),
            created_by: userId,
            updated_at: new Date().toISOString(),
            updated_by: userId,
            deleted_at: null,
            deleted_by: null
        };

        console.log('Submitting Organization:', organizationData);

        try {
            const response = await fetch('/api/addOrganization', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(organizationData)
            });
            if (response.ok) {
                console.log('Organization added successfully');
                // Additional logic on success, e.g., clear form, display message, navigate
            } else {
                throw new Error('Failed to add organization');
            }
        } catch (error) {
            console.error('Error adding organization:', error);
            // Handle errors, e.g., display error message
        }
    };

    return (
        <Box display="flex" height="100vh"> {/* Flex layout for sidebar and content */}
            <AdminSideBar /> {/* Sidebar */}
            <Box
                flex="1" // Remaining space
                display="flex"
                justifyContent="center"
                alignItems="center" // Centering content vertically and horizontally
                padding={3}
            >
                <Box
                    bgcolor="#f0f0f0" // Light gray background for the form box
                    padding={5} // Padding to create space
                    borderRadius="10px" // Rounded corners
                    boxShadow={3} // Light shadow for depth
                    width="50%" // Form box width
                >
                    <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
                        Add Organization
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography variant="subtitle1" style={{ color: 'black' }}>Organization Name:</Typography>
                            <TextField
                                type="text"
                                id="organizationName"
                                value={organizationName}
                                onChange={(e) => setOrganizationName(e.target.value)}
                                fullWidth
                                variant="outlined"
                                required
                                InputProps={{
                                    style: {
                                        fontSize: '18px', // Increase font size
                                        height: '50px', // Increase height to make it more square-shaped
                                        borderRadius: '8px', // Rounded corners
                                    },
                                }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ padding: '12px', fontSize: '16px' }}
                        >
                            Add Organization
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default AddOrganization;
