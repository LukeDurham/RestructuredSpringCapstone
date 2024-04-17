import React, { useState, useEffect } from 'react';
import '../../../../global.css';
import AdminSideBar from '../../../../components/AdminSideBar'; // Import AdminSideBar

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
    <div style={{ display: 'flex' }}>
      <AdminSideBar />
      <div className="center-content">
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
  );
}

export default CreateUser;
