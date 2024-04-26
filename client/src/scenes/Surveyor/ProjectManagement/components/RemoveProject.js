import React, { useState, useContext } from 'react';
import { useAuth } from '../../../../scenes/utils/AuthContext'; // Ensure path is correct
import AdminSideBar from '../../../../components/AdminSideBar'; // Correct the path as necessary

const RemoveProject = () => {
    const [projectId, setProjectId] = useState('');
    const { user } = useAuth();
    const userId = user ? user.userId : null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const projectData = {
            id: projectId,
            deleted_by: userId,
            deleted_at: new Date().toISOString()
        };

        try {
            const response = await fetch('/api/removeProject', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });
            if (response.ok) {
                console.log('Project removed successfully');
                setProjectId('');
            } else {
                throw new Error('Failed to remove project');
            }
        } catch (error) {
            console.error('Error removing project:', error);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AdminSideBar />
            <div style={{ width: '40%', height: '40%', margin: 'auto' }}>
                <h1>Remove Project</h1>
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
                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Remove Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RemoveProject;
