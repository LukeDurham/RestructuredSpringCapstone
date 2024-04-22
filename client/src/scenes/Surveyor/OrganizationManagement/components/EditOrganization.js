import React, { useState, useContext } from 'react';
import { useAuth } from '../../../../scenes/utils/AuthContext'; // Ensure path is correct
import AdminSideBar from '../../../../components/AdminSideBar'; // Correct the path as necessary

const EditOrganization = () => {
    const [organizationId, setOrganizationId] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const { user } = useAuth(); // Access user from AuthContext
    const userId = user ? user.userId : null; // Assuming 'user' has 'userId'

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedData = {
            id: organizationId,
            name: organizationName,
            updated_by: userId,
            updated_at: new Date().toISOString()
        };

        console.log('Updating Organization:', updatedData);

        try {
            const response = await fetch('/api/editOrganization', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                console.log('Organization updated successfully');
                // Additional logic on success, e.g., clear form, display message, navigate
                setOrganizationId('');
                setOrganizationName('');
            } else {
                throw new Error('Failed to update organization');
            }
        } catch (error) {
            console.error('Error updating organization:', error);
            // Handle errors, e.g., display error message
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AdminSideBar />
            <div style={{ width: '40%', height: '40%', margin: 'auto' }}>
                <h1>Edit Organization</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <label htmlFor="organizationId" style={{ marginBottom: '10px' }}>
                        Organization ID:
                    </label>
                    <input
                        type="text"
                        id="organizationId"
                        value={organizationId}
                        onChange={(e) => setOrganizationId(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                    />
                    <label htmlFor="organizationName" style={{ marginBottom: '10px' }}>
                        Organization Name:
                    </label>
                    <input
                        type="text"
                        id="organizationName"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Update Organization
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditOrganization;
