import React, { useState, useEffect } from 'react';

const AssignUserRole = () => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        fetchRoles();
        fetchUsers();
    }, []);

    // Fetches roles from the backend
    const fetchRoles = async () => {
        try {
            const response = await fetch('/api/roles');
            const data = await response.json();
            setRoles(data.roles || []);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    // Fetches users from the backend and expects an array of objects with id and email
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data || []); // Update based on the actual response structure
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

    // Handles submitting the form to assign a role to a user
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUserId || !selectedRole) {
            alert('Please select both a user and a role.');
            return;
        }
        try {
            // No need to find the user just to get the email, since we now use IDs
            const response = await fetch('/api/assign_role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Directly use selectedUserId and selectedRole which are IDs
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
        <div>
            <h2>Assign User Role</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Email:</label>
                    <select value={selectedUserId} onChange={handleUserChange} required>
                        <option value="">Select User Email</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.email}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Role:</label>
                    <select value={selectedRole} onChange={handleRoleChange} required>
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option> // Display name, but value is the ID
                        ))}
                    </select>
                </div>
                <button type="submit">Assign Role</button>
            </form>
        </div>
    );
};

export default AssignUserRole;
