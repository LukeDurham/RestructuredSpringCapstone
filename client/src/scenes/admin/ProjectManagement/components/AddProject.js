import React, { useState, useContext } from 'react';
import { useAuth } from '../../../utils/AuthContext'; // Ensure path is correct
import AdminSideBar from '../../../../components/AdminSideBar'; // Correct the path as necessary

const AddProject = () => {
    const [projectName, setProjectName] = useState('');
    const { user } = useAuth(); // Access user from AuthContext
    const userId = user ? user.userId : null; // Assuming 'user' has 'userId'

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const projectData = {
            name: projectName,
            created_at: new Date().toISOString(),
            created_by: userId,
            updated_at: new Date().toISOString(),
            updated_by: userId,
            deleted_at: null,
            deleted_by: null
        };

        console.log('Submitting Project:', projectData);

        try {
            const response = await fetch('/api/addProject', { // Changed API endpoint to match projects
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });
            if (response.ok) {
                console.log('Project added successfully');
                // Additional logic on success, e.g., clear form, display message, navigate
            } else {
                throw new Error('Failed to add project');
            }
        } catch (error) {
            console.error('Error adding project:', error);
            // Handle errors, e.g., display error message
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AdminSideBar />
            <div style={{ width: '40%', height: '40%', margin: 'auto' }}>
                <h1>Add Project</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <label htmlFor="projectName" style={{ marginBottom: '10px' }}>
                        Project Name:
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
