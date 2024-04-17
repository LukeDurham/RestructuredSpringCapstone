import React, { useState, useContext } from 'react';
import { useAuth } from '../../../../scenes/utils/AuthContext'; // Ensure path is correct
import AdminSideBar from '../../../../components/AdminSideBar'; // Correct the path as necessary

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
        <div style={{ display: 'flex', height: '100vh' }}>
            <AdminSideBar />
            <div style={{ width: '40%', height: '40%', margin: 'auto' }}>
                <h1>Add Organization</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
                        Add Organization
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddOrganization;
