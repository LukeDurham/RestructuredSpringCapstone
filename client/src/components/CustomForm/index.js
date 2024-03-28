import React, { useState } from 'react';
import { Form, QuestionWrapper, CustomButtonGroup } from './styles'; // Adjust the import path as necessary
import TextField from '@mui/material/TextField'; // Importing TextField from MUI
import Button from '@mui/material/Button'; // Importing Button from MUI
import DeleteButton from '../DeleteBtn'; // Importing DeleteButton into CustomForm



const CustomForm = () => {
    const [inputValues, setInputValues] = useState(['']); // Start with one empty input
    const [selectedTypes, setSelectedTypes] = useState({}); // Tracks selected types by question index

    const handleAddQuestion = () => {
        // Only add a new input if there are less than 3
        if (inputValues.length < 3) {
            const newIndex = inputValues.length; // Determine the new question's index
            setInputValues([...inputValues, { text: '', type: null }]);
            setSelectedTypes({ ...selectedTypes, [newIndex]: null }); // Ensure new question starts without a selection
        }
    };

    const handleChange = (index, newValue) => {
        // Update the specific input's value based on its index
        const newInputValues = [...inputValues];
        newInputValues[index] = newValue;
        setInputValues(newInputValues);
    };

    const handleRemoveQuestion = (indexToRemove) => {
        setInputValues(inputValues.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValues); // Logs all input values
        // Add additional form submission logic here
    };

    const handleSelectType = (index, type) => {
        // Update the selected type for the given question index
        setSelectedTypes({ ...selectedTypes, [index]: type });
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Button
                variant="text"
                onClick={handleAddQuestion}
                className="add-button"
                style={{ alignSelf: 'flex-start', marginBottom: '8px' }}
            >
                Add Question
            </Button>

            {inputValues.map((value, index) => (
                <QuestionWrapper key={index}>
                    <div className="row-container">
                        <TextField
                            label={`Question ${index + 1}`}
                            variant="outlined"
                            value={value.text}
                            onChange={(e) => handleChange(index, e.target.value)}
                            fullWidth
                        />
                        {index > 0 && (
                            <DeleteButton onClick={() => handleRemoveQuestion(index)} />
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', width: '100%' }}>
                        <CustomButtonGroup size="small" aria-label="question type selection">
                            {['True or False', 'Likert Scale', 'Multiple Choice'].map((type) => (
                                <Button
                                    key={type}
                                    onClick={() => handleSelectType(index, type)}
                                    className={selectedTypes[index] === type ? 'selected' : 'unselected'}
                                >
                                    {type}
                                </Button>
                            ))}
                        </CustomButtonGroup>
                    </div>
                </QuestionWrapper>
            ))}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit-button"
            >
                Submit
            </Button>
        </Form>
    );

};

export default CustomForm;