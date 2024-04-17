// QuestionRenderer.js
import React from 'react';
import { FormControl, FormLabel, TextField, RadioGroup, FormControlLabel, Radio, IconButton, Button } from '@material-ui/core';

const renderQuestionInput = (q, index, handlers) => {
    const {
        handleQuestionChange,
        handleOptionChange,
        handleAddOption,
        handleRemoveQuestion,
        handleSearchQueryChange,
        handleSubmitSearch,
        handleSubmitTemplateImport,
        handleSearchOrganization,
        handleSearchProject
    } = handlers;

    switch (q.type) {
        case 'True or False':
        case 'Likert Scale':
        case 'Multiple Choice':
            return (
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
                        </>
                    )}
                </FormControl>
            );
        case 'Add Existing Question':
        case 'Import Survey Template':
        case 'Assign Organization':
        case 'Assign Project':
            const actionLabel = q.type === 'Add Existing Question' ? 'Submit Search' :
                q.type === 'Import Survey Template' ? 'Import Template' :
                    q.type === 'Assign Organization' ? 'Assign Organization' :
                        'Assign Project';
            return (
                <FormControl fullWidth>
                    <FormLabel>{`${q.type} ${index + 1}`}</FormLabel>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={q.searchQuery}
                        onChange={(e) => handleSearchQueryChange(index, e.target.value)}
                    />
                    <Button onClick={() => handleSubmitSearch(index)}>{actionLabel}</Button>
                </FormControl>
            );
        default:
            return null;
    }
};

export default renderQuestionInput;
