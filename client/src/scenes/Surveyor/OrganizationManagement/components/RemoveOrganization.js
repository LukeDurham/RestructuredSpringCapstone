import React, { useState, useContext } from 'react';
import { useAuth } from '../../../../scenes/utils/AuthContext'; // Ensure path is correct
import AdminSideBar from '../../../../components/AdminSideBar'; // Correct the path as necessary

const RemoveOrganization = () => {
    const [organizationId, setOrganizationId] = useState('');
    const { user } = useAuth(); // Access user from AuthContext
    const userId = user ? user.userId : null; // Assuming 'user' has 'userId'

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const organizationData = {
            id: organizationId,
            deleted_by: userId,
            deleted_at: new Date().toISOString()
        };

        console.log('Removing Organization:', organizationData);

        try {
            const response = await fetch('/api/removeOrganization', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(organizationData)
            });
            if (response.ok) {
                console.log('Organization removed successfully');
                // Additional logic on success, e.g., clear form, display message, navigate
            } else {
                throw new Error('Failed to remove organization');
            }
        } catch (error) {
            console.error('Error removing organization:', error);
            // Handle errors, e.g., display error message
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AdminSideBar />
            <div style={{ width: '40%', height: '40%', margin: 'auto' }}>
                <h1>Remove Organization</h1>
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
                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Remove Organization
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RemoveOrganization;
