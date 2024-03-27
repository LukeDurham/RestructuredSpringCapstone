import React from "react";
import { useNavigate } from 'react-router-dom';

const SurveyorDashboard = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const goToSurveyDashboard = () => {
        navigate('/surveydashboard'); // Programmatically navigate to /surveydashboard route
    };

    return (
        <div> {/* Wrap the buttons in a div */}
            <h1>Surveyor Dashboard</h1>
            <button onClick={goToSurveyDashboard} className="login-button">Survey Dashboard</button>
        </div>
    );
};

export default SurveyorDashboard;
