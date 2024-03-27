import React, { useState } from 'react';

const CreateRole = () => {
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
        <div>
            <h2>Create Role</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Role Name:</label>
                    <input type="text" value={roleName} onChange={handleRoleNameChange} required />
                </div>
                <button type="submit">Create Role</button>
            </form>
        </div>
    );
};

export default CreateRole;
