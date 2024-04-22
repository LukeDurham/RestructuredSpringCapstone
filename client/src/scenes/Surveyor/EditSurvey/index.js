import React, { useState } from 'react';
import SurveyEditorComponent from "../../../components/SurveyEditor"; // Adjust path as needed

const EditSurvey = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div style={{ padding: '10px 0' }}>
            <h1 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Edit Survey</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <SurveyEditorComponent
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
            />
        </div>
    );
}

export default EditSurvey;
