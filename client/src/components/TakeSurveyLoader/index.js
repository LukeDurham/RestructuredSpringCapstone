import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    questionBox: {
        backgroundColor: 'purple',
        color: 'white',
        padding: theme.spacing(3), // Increased padding around the content
        margin: `${theme.spacing(2)}px auto`, // More space above and below each box, and auto margins for horizontal centering
        display: 'inline-block', // Allows the box to only take up as much space as needed
        width: 'auto', // Allows the box to size according to its content
        maxWidth: '80%', // Prevents the box from becoming too wide
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    formControl: {
        margin: theme.spacing(1), // Adds some space around each FormControl
        width: '100%', // Ensures FormControl takes full width of its container
    },
    formLabel: {
        color: 'white', // Ensures the label text is white
        textAlign: 'center', // Centers the label text
        display: 'block', // Ensures label takes its own line
    }
}));



const TakeSurveyLoader = ({ question, index }) => {
    const classes = useStyles(); // Use the styles

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
        <FormControl component="fieldset" fullWidth className={classes.formControl} classes={{ root: classes.questionBox }}>
            <FormLabel component="legend" className={classes.formLabel}>{`Question ${index + 1}: ${question.question}`}</FormLabel>
            {renderInputs()}
        </FormControl>
    );
};

export default TakeSurveyLoader;
