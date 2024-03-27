// SurveyResults.js
import React, { useState } from 'react';

const SurveyResults = () => {
    const [surveyId, setSurveyId] = useState('');

    const handleSurveyIdChange = (e) => {
        setSurveyId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here (e.g., fetching and displaying survey results)
        console.log('Survey ID:', surveyId);
        // Reset form after submission
        setSurveyId('');
    };

    return (
        <div>
            <h2>Survey Results</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Survey ID:</label>
                    <input type="text" value={surveyId} onChange={handleSurveyIdChange} required />
                </div>
                <button type="submit">Get Results</button>
            </form>
            {/* Display survey results here */}
        </div>
    );
};

export default SurveyResults;
