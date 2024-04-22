import React, { useState, useEffect } from 'react';
import '../../../../global.css';
import AdminSideBar from '../../../../components/AdminSideBar'; // Import AdminSideBar
import { Box, Button, Typography } from '@mui/material';

function CreateUser() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        if (response.ok) {
          const data = await response.json();
          setRoles(data.roles);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    try {
      const createUserResponse = await fetch('/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
          roleId: user.role  // Ensure this is "roleId" to match the backend expectation
        }),
      });

      if (createUserResponse.ok) {
        console.log('User created successfully');
        setUser({ username: '', email: '', password: '', role: '' });  // Reset user state
      } else {
        // Handle errors when createUserResponse is not ok
        const errorData = await createUserResponse.json();  // Assuming the server sends back a JSON response
        console.error('Failed to create user:', errorData.message);  // Log the server provided error
      }
    } catch (error) {
      console.error('Error creating user:', error);
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
                padding={6} // Ample padding for spacing
                borderRadius="12px" // Rounded corners
                boxShadow={4} // Light shadow for depth
                width="600px" // Wider box for the form
            >
                <Typography variant="h4" style={{ color: 'black', fontSize: '36px' }} gutterBottom>
                    Create User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={3}> {/* Spacing with gap */}
                        <Box>
                            <Typography style={{ color: 'black', fontSize: '16px' }}>Username:</Typography> {/* Larger text */}
                            <input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }}
                            />
                        </Box>
                        <Box>
                            <Typography style={{ color: 'black', fontSize: '16px' }}>Email:</Typography>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }}
                            />
                        </Box>
                        <Box>
                            <Typography style={{ color: 'black', fontSize: '16px' }}>Password:</Typography>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }}
                            />
                        </Box>
                        <Box>
                            <Typography style={{ color: 'black', fontSize: '16px' }}>Role:</Typography>
                            <select
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px', borderRadius: '6px', fontSize: '16px', width: '100%' }}
                            >
                                <option value="">Select a role</option>
                                {roles.map(role => (
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
                            style={{ padding: '12px', fontSize: '16px' }} // Consistent button styling
                        >
                            Create User
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    </Box>
);
};

export default CreateUser;
