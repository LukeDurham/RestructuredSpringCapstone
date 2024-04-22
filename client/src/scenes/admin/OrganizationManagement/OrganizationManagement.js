import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../../global.css';  // Assuming this sets some global styles
import AdminSideBar from '../../../components/AdminSideBar'; // Correct the path as necessary

const OrganizationManagement = () => {
    const navigate = useNavigate();

    const handleButtonClick = (action) => {
        console.log(`Button clicked for ${action}`);
        switch (action) {
            case 'Add Organization':
                navigate('/admin/organization/add');
                break;
            case 'Edit Organization':
                navigate('/admin/organization/edit');
                break;
            case 'Remove Organization':
                navigate('/admin/organization/remove');
                break;
            default:
                console.log('No route defined for: ', action);
        }
    };

    // Styling for the buttons
    const buttonStyle = {
        color: 'white', // White text
    backgroundColor: '#494848', // Dark background
    padding: '10px', // Increased padding for larger buttons
    margin: '10px', // Adjusted margin for spacing
    border: '2px solid white',
    borderRadius: '10px', // Rounded corners
    fontSize: '20px', // Larger font size
    cursor: 'pointer',
    width: '350px', // Wider button
    height: '350px', // Taller button
    display: 'flex', // Flexbox to center text
    alignItems: 'center', // Center text vertically
    justifyContent: 'center', // Center text horizontally
    };

    // Container styling for the organization management section
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
                <h1>Organization Management</h1>
                <div style={containerStyle}>
                    <button style={buttonStyle} onClick={() => handleButtonClick('Add Organization')}>
                        Add Organization
                    </button>
                    <button style={buttonStyle} onClick={() => handleButtonClick('Edit Organization')}>
                        Edit Organization
                    </button>
                    <button style={buttonStyle} onClick={() => handleButtonClick('Remove Organization')}>
                        Remove Organization
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrganizationManagement;
