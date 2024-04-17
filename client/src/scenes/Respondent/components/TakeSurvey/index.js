import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TakeSurveyLoader from '../../../../components/TakeSurveyLoader'; // Adjust the path as needed
import RespondentSideBar from '../../../../components/RespondentSideBar'; // Ensure this path is correct
import Button from '@material-ui/core/Button'; // Import Button from Material-UI

const TakeSurvey = () => {
    const { surveyId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/surveys/${surveyId}/questions`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Could not fetch survey questions');
                }
                return response.json();
            })
            .then(data => {
                setQuestions(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [surveyId]);

    const handleSubmit = () => {
        console.log('Submitting Survey'); // Placeholder for submit logic
        // Implement submit logic here
    };

    return (
        <div style={{ display: 'flex' }}>
            <RespondentSideBar />
            <div style={{ flex: 1, padding: '20px' }}>
                {isLoading && <p>Loading questions...</p>}
                {error && <p>Error loading questions: {error}</p>}
                {!isLoading && questions.length === 0 && <p>No questions found.</p>}
                {questions.map((question, index) => (
                    <TakeSurveyLoader key={index} question={question} index={index} />
                ))}
                {!isLoading && questions.length > 0 && (
                    <button style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: 'purple', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => console.log('Submit Survey')}>
                        Submit Survey
                    </button>
                )}
            </div>
        </div>
    );
};

export default TakeSurvey;