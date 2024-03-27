// SurveyTypes.js
import React, { useState, useEffect } from 'react';

const SurveyTypes = () => {
    const [surveyTypes, setSurveyTypes] = useState([]);
    const [selectedSurveyType, setSelectedSurveyType] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
        // Fetch survey types from the server
        const fetchSurveyTypes = async () => {
            // Replace this with actual API call to fetch survey types
            const response = await fetch('/api/survey-types');
            const data = await response.json();
            setSurveyTypes(data);
        };

        fetchSurveyTypes();
    }, []);

    const handleSurveyTypeChange = (e) => {
        setSelectedSurveyType(e.target.value);
    };

    const handleFilterQuestions = async () => {
        // Fetch questions based on selected survey type from the server
        // Replace this with actual API call to fetch questions by survey type
        const response = await fetch(`/api/questions?surveyType=${selectedSurveyType}`);
        const data = await response.json();
        setFilteredQuestions(data);
    };

    return (
        <div>
            <h2>Survey Types</h2>
            <select value={selectedSurveyType} onChange={handleSurveyTypeChange}>
                <option value="">Select Survey Type</option>
                {surveyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <button onClick={handleFilterQuestions}>Filter Questions</button>
            <div>
                <h3>Filtered Questions</h3>
                <ul>
                    {filteredQuestions.map((question) => (
                        <li key={question.id}>
                            {question.text}
                            {/* Render additional question details */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SurveyTypes;
