import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { SurveyContainer, SurveyBox, Title, TakeSurveyButton } from './styles';

const PersonalActiveSurveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Create a navigate function instance

    useEffect(() => {
        const fetchSurveys = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/active_surveys');
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setSurveys(data);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchSurveys();
    }, []);

    // Function to handle the redirection
    const handleTakeSurvey = (surveyId) => {
        navigate(`/TakeSurvey/${surveyId}`); // Navigate to TakeSurvey page with the surveyId using navigate function
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <SurveyContainer>
                {surveys.map((survey) => (
                    <SurveyBox key={survey.id} onClick={() => handleTakeSurvey(survey.id)}>
                        <Title>{survey.title}</Title>
                        <TakeSurveyButton>Take Survey</TakeSurveyButton> {/* Button for taking the survey */}
                    </SurveyBox>
                ))}
            </SurveyContainer>
        </>
    );
};

export default PersonalActiveSurveys;
