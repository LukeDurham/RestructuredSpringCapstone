import React, { useState, useEffect } from 'react';
import AdminAppBar from '../../../../components/AdminAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getLPTheme from '../../../../getLPTheme';

function CreateUser() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '', // Added password to user state
    role: '',
  });
  const [roles, setRoles] = useState([]);
  const [mode, setMode] = useState('dark');
  const LPtheme = createTheme(getLPTheme(mode));

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
    e.preventDefault();

    try {
      // Fetch the list of roles from the backend
      const rolesResponse = await fetch('/api/roles');
      if (!rolesResponse.ok) {
        throw new Error('Failed to fetch roles.');
      }
      const rolesData = await rolesResponse.json();

      // Extract the 'id' property from each role object to get a list of valid role IDs
      const roleIds = rolesData.roles.map(role => role.id); // Adjusted to get role IDs

      // Check if the submitted role ID matches one of the roles from the list
      const isRoleValid = roleIds.includes(parseInt(user.role, 10)); // Ensure user.role is compared as the same type
      if (!isRoleValid) {
        alert('Submitted role is invalid.');
        return;
      }

      // If the role is valid, proceed to create the user
      const createUserResponse = await fetch('/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
          roleId: user.role, // Since user.role is an ID, it's directly used here
        }),
      });

      if (createUserResponse.ok) {
        const newUser = await createUserResponse.json();
        alert(`User created successfully: ${user.username}`);
        // Reset form fields after successful user creation
        setUser({ username: '', email: '', password: '', role: '' });
      } else {
        // If there was a problem creating the user, log the response
        const errorResponse = await createUserResponse.json();
        alert(`Failed to create user. ${errorResponse.message || ''}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing request. Please try again.');
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
          <h2>Create User</h2>
          <form onSubmit={handleSubmit}>
            <div className='input-sq-box'>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-sq-box'>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-sq-box'>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='input-sq-box'>
              <label>Role:</label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                required
              >
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CreateUser;
