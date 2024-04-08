import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add'; // For adding multiple choice options
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../Sidebar';
import { SurveyContainer, QuestionContainer } from './styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../../scenes/utils/AuthContext';

const questionTypeToId = {
    'True or False': 1,
    'Likert Scale': 2,
    'Multiple Choice': 3
};

export const SurveyCreatorComponent = ({ setSuccessMessage, setErrorMessage }) => {
    const [questions, setQuestions] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const [submitError, setSubmitError] = useState(''); // If you decide to use it, uncomment
    const [templateDescription, setTemplateDescription] = useState('');
    const { user } = useAuth();



    const openSubmitDialog = () => {
        setIsDialogOpen(true);
    };

    const handleSubmitSurvey = async () => {
        setIsDialogOpen(false);

        // Step 1: Create Survey Template
        try {
            const templateResponse = await fetch('/api/CreatingSurveyTemplate/survey_templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: templateName,
                    description: templateDescription,
                    created_by: user?.id || 0, // Default to 0 if user id is not available
                }),
            });

            if (templateResponse.status !== 201) {
                const errorMsg = await templateResponse.text();
                throw new Error(`Failed to create survey template: ${errorMsg}`);
            }

            const { id: surveyTemplateId } = await templateResponse.json();

            // Step 2: Create Questions
            const questionsResponse = await fetch('/api/CreatingSurveyTemplate/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questions: questions.map(question => ({
                        question_type_id: questionTypeToId[question.type],
                        question: question.questionText,
                    })),
                }),
            });

            if (questionsResponse.status !== 201) {
                const errorMsg = await questionsResponse.text();
                throw new Error(`Failed to create questions: ${errorMsg}`);
            }

            const { questionIds } = await questionsResponse.json();

            // Step 3: Link Survey Template with Questions
            const linkResponse = await fetch('/api/CreatingSurveyTemplate/survey_template_questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ surveyTemplateId, questionIds }),
            });

            if (linkResponse.status !== 201) {
                const errorMsg = await linkResponse.text();
                throw new Error(`Failed to link survey template and questions: ${errorMsg}`);
            }

            console.log('Survey template and questions successfully created and linked');
            setSuccessMessage('Survey template and questions successfully created and linked');

            // Reset form state after successful submission
            setTemplateName('');
            setTemplateDescription('');
            setQuestions([]);

        } catch (error) {
            console.error("Error:", error);
            setErrorMessage(error.message);
        }
    };




    const addQuestion = (type) => {
        const defaultOptions = {
            'True or False': ['True', 'False'],
            'Likert Scale': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            'Multiple Choice': ['', '', ''] // Start with 3 empty options
        };

        setQuestions([
            ...questions,
            { questionText: '', options: defaultOptions[type], type: type }
        ]);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleAddOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push('');
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (indexToRemove) => {
        setQuestions(questions.filter((_, index) => index !== indexToRemove));
    };

    const renderQuestionInput = (q, index) => {
        const baseStyle = {
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        };

        // Adjust styles based on question type
        let specificStyle = {};
        if (q.type === 'True or False') {
            specificStyle = { ...baseStyle, width: '300px' }; // Smallest box
        } else if (q.type === 'Likert Scale') {
            specificStyle = { ...baseStyle, width: '600px' }; // Wider box
        } else if (q.type === 'Multiple Choice') {
            specificStyle = { ...baseStyle, height: 'auto', minHeight: '200px' }; // Taller box
        }

        switch (q.type) {
            case 'True or False':
            case 'Likert Scale':
            case 'Multiple Choice':
                return (
                    <div style={specificStyle}> {/* This div applies the specific styles based on the question type */}
                        <FormControl component="fieldset" fullWidth>
                            <FormLabel component="legend">{`Question ${index + 1}`}</FormLabel>
                            <TextField
                                fullWidth
                                label="Question"
                                variant="outlined"
                                value={q.questionText}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                            />
                            {q.type !== 'Multiple Choice' && (
                                <RadioGroup row>
                                    {q.options.map((option, optionIndex) => (
                                        <FormControlLabel key={optionIndex} value={option} control={<Radio />} label={option} />
                                    ))}
                                </RadioGroup>
                            )}
                            {q.type === 'Multiple Choice' && (
                                <>
                                    {q.options.map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            <TextField
                                                fullWidth
                                                label={`Option ${optionIndex + 1}`}
                                                variant="outlined"
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                    <IconButton onClick={() => handleAddOption(index)} aria-label="add">
                                        <AddIcon />
                                    </IconButton>
                                </>
                            )}
                            <IconButton onClick={() => handleRemoveQuestion(index)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </FormControl>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Sidebar onAddQuestion={addQuestion} />
            <SurveyContainer>
                {questions.map((q, index) => (
                    <QuestionContainer key={index}>
                        {renderQuestionInput(q, index)}
                    </QuestionContainer>
                ))}
                {questions.length > 0 && (
                    <Button variant="contained" onClick={openSubmitDialog}>Submit Survey Template</Button>
                )}
                {/* Render the submission error message if present */}
                {submitError && <p className="error">{submitError}</p>}
            </SurveyContainer>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Submit Survey Template</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Template Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Template Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={templateDescription}
                        onChange={(e) => setTemplateDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitSurvey}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SurveyCreatorComponent;