import React from 'react';
import '../../../global.css';
import AdminSideBar from '../../../components/AdminSideBar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate'

const SurveyManagement = () => {
    const navigate = useNavigate();
    const handleButtonClick = (action) => {
        console.log(`Button clicked for ${action}`);
        switch (action) {
            case 'Create Survey Templates':
                navigate('/admin/CreateSurveyTemplate'); // Change this to the correct path
                break;
            case 'Add Question':
                navigate('/admin/addQuestion'); // Change this to the correct path
                break;
            case 'Create Survey':
                navigate('/admin/CreateSurvey'); // Change this to the correct path
                break;
            default:
                console.log('No route defined for: ', action);
            }
        };

        // Styling for the buttons
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
                    <h1>Survey Management</h1>
                    <div style={rowContainerStyle}> {/* First row container */}
                        <button style={topRowButtonStyle} onClick={() => handleButtonClick('Create Survey')}>
                            Create Survey
                        </button>
                        <button style={topRowButtonStyle} onClick={() => handleButtonClick('Edit Survey')}>
                            Edit Survey
                        </button>
                        <button style={topRowButtonStyle} onClick={() => handleButtonClick('Add Question')}>
                            Add Question 
                        </button>
                        <button style={topRowButtonStyle} onClick={() => handleButtonClick('Manage Active Surveys')}>
                            Manage Active Surveys
                        </button>
                    </div>
                    <div style={rowContainerStyle}> {/* Second row container */}
                        <button style={bottomRowButtonStyle} onClick={() => handleButtonClick('Create Survey Templates')}>
                            Create Survey Templates
                        </button>
                        <button style={bottomRowButtonStyle} onClick={() => handleButtonClick('Edit Survey Templates')}>
                            Edit Survey Templates
                        </button>
                    </div>
                </div>
            </div>
        );
    };



export default SurveyManagement;
