import React from "react";
import '../../global.css'
import "./SurveyDashboard.css"; // Ensure the correct path
import AppAppBar from '../../components/AppAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Add this line
import getLPTheme from '../../getLPTheme';

const AdminSurveyDashboard = () => {
    const [mode, setMode] = React.useState('dark'); // Add this line
    const LPtheme = createTheme(getLPTheme(mode)); // Add this line

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <div className="survey-dashboard">
                <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
                <div className="dashboard-header" style={{ fontSize: "40px", fontWeight: "bold" }}>
                    Survey Dashboard
                </div>
                <div className="navigation-buttons">
                    <button className="submit-button" onClick={() => window.location.href = '/'}>Home</button>
                    <button className="submit-button" onClick={() => window.location.href = '/create-survey'}>Create Survey</button>
                    <button className="submit-button" onClick={() => window.location.href = '/add-question-type'}>Add Question Type</button>
                    <button className="submit-button" onClick={() => window.location.href = '/add-survey-questions'}>Add Survey Questions</button>
                    <button className="submit-button" onClick={() => window.location.href = '/delete-question-from-survey'}>Delete Survey Questions</button>
                    <button className="submit-button" onClick={() => window.location.href = '/display-survey-results'}>Survey Results</button>
                    <button className="submit-button" onClick={() => window.location.href = '/add-survey-template'}>Create Survey Template</button>
                    <button className="submit-button" onClick={() => window.location.href = '/email-template'}>Email Template</button>
                    <button className="submit-button" onClick={() => window.location.href = '/survey-types'}>Survey Types</button>

                </div>
                <div className="dashboard-content">
                    {/* Dashboard content goes here */}
                </div>
            </div>
        </ThemeProvider>
    );
};

export default AdminSurveyDashboard;