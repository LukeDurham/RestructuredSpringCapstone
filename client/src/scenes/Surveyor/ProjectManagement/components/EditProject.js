import React, { useState, useContext } from 'react';
import { useAuth } from '../../../../scenes/utils/AuthContext'; // Ensure path is correct
import AdminSideBar from '../../../../components/AdminSideBar'; // Correct the path as necessary

const EditProject = () => {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const { user } = useAuth();
    const userId = user ? user.userId : null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedData = {
            id: projectId,
            name: projectName,
            updated_by: userId,
            updated_at: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/editProject', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                console.log('Project updated successfully');
                setProjectId('');
                setProjectName('');
            } else {
                throw new Error('Failed to update project');
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AdminSideBar />
            <div style={{ width: '40%', height: '40%', margin: 'auto' }}>
                <h1>Edit Project</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <label htmlFor="projectId" style={{ marginBottom: '10px' }}>
                        Project ID:
                    </label>
                    <input
                        type="text"
                        id="projectId"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                    />
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
                        Update Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProject;
