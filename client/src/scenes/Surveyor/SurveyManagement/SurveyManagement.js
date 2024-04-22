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
            case 'Edit Survey':
                navigate('/admin/edit-survey'); // Change this to the correct path
                break;
            case 'Manage Active Surveys':
                navigate('/admin/ManageActiveSurveys'); // Change this to the correct path
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
            margin: '10px -225px',
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
            margin: '10px -285px',  // More space on the sides for the bottom row
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
                    </div>
                </div>
            </div>
        );
    };



export default SurveyManagement;
