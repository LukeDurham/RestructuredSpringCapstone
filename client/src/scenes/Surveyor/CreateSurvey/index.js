import React, { useState } from 'react';
import SurveyCreatorWidget from "../../../components/SurveyCreator"; // Adjust path as needed

const CreateSurvey = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div style={{ padding: '10px 0' }}>
            <h1 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Survey Creator</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <SurveyCreatorWidget
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
            />
        </div>
    );
}

export default CreateSurvey;
