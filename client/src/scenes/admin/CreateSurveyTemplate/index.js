import React from 'react';
import SurveyCreatorWidget from "../../../components/SurveyCreator";

const CreateSurveyTemplate = () => {
    return (
        <div style={{ paddingTop: '10px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ margin: '0', padding: '0', textAlign: 'center' }}>Survey Creator</h1>
            <div style={{ overflowY: 'scroll', flex: '1' }}>
                <SurveyCreatorWidget />
            </div>
        </div>
    );
}

export default CreateSurveyTemplate;
