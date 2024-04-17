import React, { useState, useEffect } from 'react';
import { Container, Title, SurveysList } from './styles'

const PersonalActiveSurveys = () => {
    // Placeholder for survey data, can be fetched from an API or passed via props
    // const surveys = [
    //     { id: 1, title: "Survey 1", description: "Description of Survey 1" },
    //     // Add more surveys as needed
    // ];
    const [surveys, setSurveys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSurveys = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/surveys');
                if (!response.ok) {
                    throw new Error('Something went wrong!'); // or use response.status to get more specific error
                }
                const data = await response.json();
                setSurveys(data); // Assuming the data is an array of surveys
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchSurveys();
    }, []); // The empty array ensures this effect runs only once after the component mounts



    return (
        <Container>
            <Title>Active Surveys</Title>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <SurveysList>
                {surveys.map((survey) => (
                    <div key={survey.id}>
                        <h3>{survey.title}</h3>
                        <p>{survey.description}</p> {/* Uncomment and use as needed */}
                        {/* You could add here the survey date if available */}
                    </div>
                ))}
            </SurveysList>
        </Container>
    );

};

export default PersonalActiveSurveys;
