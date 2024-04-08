import React from 'react';
import SurveyCreatorWidget from "../../../components/SurveyCreator";

const CreateSurveyTemplate = () => {
    return (
        <div style={{ padding: '10px 0' }}> {/* Adjusted padding for top and bottom only */}
            <h1 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Survey Creator</h1>
            <SurveyCreatorWidget />
        </div>
    );
}

export default CreateSurveyTemplate;
