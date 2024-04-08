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

export const SurveyCreatorComponent = () => {
    const [questions, setQuestions] = useState([]);

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
        switch (q.type) {
            case 'True or False':
            case 'Likert Scale':
                return (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{`Question ${index + 1}`}</FormLabel>
                        <TextField
                            fullWidth
                            label="Question"
                            variant="outlined"
                            value={q.questionText}
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                        />
                        <RadioGroup row>
                            {q.options.map((option, optionIndex) => (
                                <FormControlLabel key={optionIndex} value={option} control={<Radio />} label={option} />
                            ))}
                        </RadioGroup>
                        <IconButton onClick={() => handleRemoveQuestion(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </FormControl>
                );
            case 'Multiple Choice':
                return (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{`Question ${index + 1}`}</FormLabel>
                        <TextField
                            fullWidth
                            label="Question"
                            variant="outlined"
                            value={q.questionText}
                            onChange={(e) => handleQuestionChange(index, e.target.value)}
                        />
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
                        <IconButton onClick={() => handleRemoveQuestion(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </FormControl>
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
            </SurveyContainer>
        </div>
    );
};

export default SurveyCreatorComponent;