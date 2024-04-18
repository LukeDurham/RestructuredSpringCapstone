import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TakeSurveyLoader from '../../../../components/TakeSurveyLoader'; // Adjust the path as needed
import RespondentSideBar from '../../../../components/RespondentSideBar'; // Ensure this path is correct
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { SurveyContainer, QuestionContainer } from './styles';

const TakeSurvey = () => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [templateName, setTemplateName] = React.useState('');
    const [templateDescription, setTemplateDescription] = React.useState('');
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
        <div style={{ display: 'flex', width: '100%' }}> {/* Flex container for the sidebar and survey content */}
            <RespondentSideBar />
            <SurveyContainer style={{ flex: 1 }}> {/* Ensure SurveyContainer takes up the remaining space */}
                {questions.map((question, index) => (
                    <QuestionContainer key={index}>
                        <TakeSurveyLoader question={question} index={index} />
                    </QuestionContainer>
                ))}
                {/* Additional components like Buttons or Dialogs */}
                {questions.length > 0 && (
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit Survey
                    </Button>
                )}
                {error && <p>Error loading questions: {error}</p>}
            </SurveyContainer>
        </div>
    );
};

export default TakeSurvey;