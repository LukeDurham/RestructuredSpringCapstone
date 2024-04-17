// ActiveSurveys.js
import React from 'react';
import '../../../global.css';
import RespondentSideBar from '../../../components/RespondentSideBar';
import PersonalActiveSurveys from '../../../components/PersonalActiveSurveys'; // Ensure this path is correct

const ActiveSurveys = () => {
    return (
        <div style={{ display: 'flex' }}>
            <RespondentSideBar />
            <div style={{ marginLeft: '20px', flex: 1 }}>
                <h1 style={{ color: 'white' }}>Active Surveys</h1>
                <PersonalActiveSurveys />  {/* Incorporate the PersonalActiveSurveys component */}
            </div>
        </div>
    );
};

export default ActiveSurveys;
