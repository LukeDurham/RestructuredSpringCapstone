import React, { useState, useEffect } from 'react';
import { SurveyContainer, SurveyBox } from './styles';

const PersonalActiveSurveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <SurveyContainer>
                {surveys.map((survey) => (
                    <SurveyBox key={survey.id} onClick={() => console.log('Survey clicked', survey.id)}>
                        <h3>{survey.title}</h3>
                        <p>{survey.description}</p>
                    </SurveyBox>
                ))}
            </SurveyContainer>
        </>
    );
};

export default PersonalActiveSurveys;
