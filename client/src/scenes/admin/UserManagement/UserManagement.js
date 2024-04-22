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

    // Updated styles for the buttons
const topRowButtonStyle = {
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

// Bottom row button style with customization
const bottomRowButtonStyle = {
    ...topRowButtonStyle, // Inherits properties from topRowButtonStyle
    backgroundColor: '#494848', // Different color for differentiation
};

// Updated style for the row container
const rowContainerStyle = {
    display: 'flex', // Flex layout
    
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    height: '30vh', // Full viewport height for centering vertically
    padding: '20px', // Padding around the container
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
