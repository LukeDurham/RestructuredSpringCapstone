import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../../global.css';  // Assuming this sets some global styles
import AdminSideBar from '../../../components/AdminSideBar'; // Correct the path as necessary

const ProjectManagement = () => {
    const navigate = useNavigate();

    const handleButtonClick = (action) => {
        console.log(`Button clicked for ${action}`);
        switch (action) {
            case 'Add Project':
                navigate('/admin/project/add');
                break;
            case 'Edit Project':
                navigate('/admin/project/edit');
                break;
            case 'Remove Project':
                navigate('/admin/project/remove');
                break;
            default:
                console.log('No route defined for: ', action);
        }
    };

    // Styling for the buttons
    const buttonStyle = {
        color: 'white', // White text
        backgroundColor: 'purple', // Purple background
        padding: '10px 20px',
        margin: '10px',
        border: 'none',
        borderRadius: '8px', // Rounded corners
        fontSize: '16px', // Font size
        cursor: 'pointer'
    };

    // Container styling for the project management section
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px'
    };

    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{ marginLeft: '20px', flex: 1 }}>
                <h1>Project Management</h1>
                <div style={containerStyle}>
                    <button style={buttonStyle} onClick={() => handleButtonClick('Add Project')}>
                        Add Project
                    </button>
                    <button style={buttonStyle} onClick={() => handleButtonClick('Edit Project')}>
                        Edit Project
                    </button>
                    <button style={buttonStyle} onClick={() => handleButtonClick('Remove Project')}>
                        Remove Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectManagement;
