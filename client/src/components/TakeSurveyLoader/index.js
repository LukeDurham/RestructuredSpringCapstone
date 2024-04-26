import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { StyledFormControl, StyledFormLabel } from './styles'; // Adjust the import path as needed

const TakeSurveyLoader = ({ question, index }) => {
    const renderInputs = () => {
        switch (question.question_type_id) {
            case 1: // True or False
                return (
                    <RadioGroup row>
                        <FormControlLabel value="true" control={<Radio />} label="True" />
                        <FormControlLabel value="false" control={<Radio />} label="False" />
                    </RadioGroup>
                );
            case 2: // Likert Scale
                return (
                    <RadioGroup row>
                        {[1, 2, 3, 4, 5].map(score => (
                            <FormControlLabel key={score} value={score.toString()} control={<Radio />} label={score.toString()} />
                        ))}
                    </RadioGroup>
                );
            case 3: // Multiple Choice
                return (
                    <>
                        {question.options.map((option, optionIndex) => (
                            <FormControlLabel key={optionIndex} value={option} control={<Radio />} label={option} />
                        ))}
                    </>
                );
            default:
                return <p>Unsupported Question Type</p>;
        }
    };

    return (
        <StyledFormControl component="fieldset">
            <StyledFormLabel component="legend">{`Question ${index + 1}: ${question.question}`}</StyledFormLabel>
            {renderInputs()}
        </StyledFormControl>
    );
};

export default TakeSurveyLoader;
