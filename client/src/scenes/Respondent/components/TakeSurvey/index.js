import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TakeSurveyLoader from '../../../../components/TakeSurveyLoader'; // Adjust the path as needed
import RespondentSideBar from '../../../../components/RespondentSideBar'; // Ensure this path is correct
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { SurveyContainer, QuestionContainer } from './styles';

const TakeSurvey = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [templateName, setTemplateName] = React.useState('');
    const [templateDescription, setTemplateDescription] = React.useState('');
    const { surveyId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({});

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
        console.log('Preparing to submit responses:', responses);

        const responseEntries = Object.entries(responses).map(([questionId, response]) => ({
            question_id: parseInt(questionId),
            survey_id: parseInt(surveyId),
            response,
            created_at: new Date().toISOString(),
            created_by: 1, // Adjust based on user context
            updated_at: new Date().toISOString(),
            updated_by: 1  // Adjust based on user context
        }));

        console.log('Formatted responses for submission:', responseEntries);

        fetch(`/api/surveys/${surveyId}/responses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseEntries)
        })
            .then(response => {
                console.log('HTTP Status:', response.status);
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setDialogMessage('Survey response submitted successfully');
                setIsDialogOpen(true);
            })
            .catch(error => {
                console.error('Error:', error);
                setDialogMessage(`Failed to submit survey response: ${error}`);
                setIsDialogOpen(true);
            });
    };


    const handleResponseChange = (questionId, value) => {
        setResponses(prev => ({ ...prev, [questionId]: value }));
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}> {/* Flex container for the sidebar and survey content */}
            <RespondentSideBar />
            <SurveyContainer style={{ flex: 1 }}> {/* Ensure SurveyContainer takes up the remaining space */}
                {questions.map((question, index) => (
                    <QuestionContainer key={index}>
                        <TakeSurveyLoader question={question} index={index} />
                        <TextField
                            label={`Response for Question ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            value={responses[question.id] || ''}
                            onChange={e => handleResponseChange(question.id, e.target.value)}
                        />
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