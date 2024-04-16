import React, { useState } from 'react';
import '../../../../global.css';
import AdminSideBar from '../../../../components/AdminSideBar'; // Import AdminSideBar instead of AdminAppBar
import './component.css';

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
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div className="center-content">
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
    );
};

export default CreateAccountPermissions;
