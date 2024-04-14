import React from 'react';
import '../../../global.css';
import AdminSideBar from '../../../components/AdminSideBar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserManagement = () => {
    const navigate = useNavigate();
    const handleButtonClick = (action) => {
        console.log(`Button clicked for ${action}`);
        switch (action) {
            case 'Assign User Permissions':
                navigate('/admin/assign-user-permissions'); // Change this to the correct path
                break;
            case 'Assign User Role':
                navigate('/admin/assign-user-role'); // Change this to the correct path
                break;
            case 'Create Account Permissions':
                navigate('/admin/create-account-permissions'); // Change this to the correct path
                break;
            case 'Create User':
                navigate('/admin/createuser'); // Change this to the correct path
                break;
            case 'Create User Role':
                navigate('/admin/createuser-role'); // Change this to the correct path
                break;
            default:
                console.log('No route defined for: ', action);
        }
    };

    // Styling for the buttons
    const topRowButtonStyle = {
        color: 'white', // White text
        backgroundColor: 'purple', // Purple background
        padding: '5px 10px',
        margin: '10px -285px',
        border: 'none',
        borderRadius: '8px', // Rounded corners for the square
        fontSize: '16px', // Font size
        cursor: 'pointer',
        width: '120px',
        height: '120px', // Fixed width for consistency
        display: 'block' // Ensure buttons are on separate lines
    };

    const bottomRowButtonStyle = {
        ...topRowButtonStyle,  // Inherits properties from topRowButtonStyle
        margin: '10px -350px',  // More space on the sides for the bottom row
        backgroundColor: 'purple',  // Just an example to differentiate if needed
    };

    // Style object for row containers
    // Style object for the top row container
    const rowContainerStyle = {
        display: 'flex',
        justifyContent: 'space-evenly', // This spreads the buttons evenly
        marginBottom: '2px' // Adds space between the two rows
    };



    
    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{ marginLeft: '20px', flex: 1 }}>
                <h1>User Management</h1>
                <div style={rowContainerStyle}> {/* First row container */}
                    <button style={topRowButtonStyle} onClick={() => handleButtonClick('Assign User Permissions')}>
                        Assign Permissions
                    </button>
                    <button style={topRowButtonStyle} onClick={() => handleButtonClick('Assign User Role')}>
                        Assign Roles
                    </button>
                    <button style={topRowButtonStyle} onClick={() => handleButtonClick('Create Account Permissions')}>
                        Create Account Permissions
                    </button>
                </div>
                <div style={rowContainerStyle}> {/* Second row container */}
                    <button style={bottomRowButtonStyle} onClick={() => handleButtonClick('Create User')}>
                        Create User
                    </button>
                    <button style={bottomRowButtonStyle} onClick={() => handleButtonClick('Create User Role')}>
                        Create Role
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
