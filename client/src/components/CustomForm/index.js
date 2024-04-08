import React, { useState } from 'react';
import { Form, QuestionWrapper, CustomButtonGroup } from './styles'; // Adjust the import path as necessary
import TextField from '@mui/material/TextField'; // Importing TextField from MUI
import Button from '@mui/material/Button'; // Importing Button from MUI
import DeleteButton from '../DeleteBtn'; // Importing DeleteButton into CustomForm

const questionTypes = {
  'True or False': '1',
  'Likert Scale': '2',
  'Multiple Choice': '3',
};

const CustomForm = ({ onSubmit }) => {
    // const [inputValues, setInputValues] = useState(['']); // Start with one empty input
    // const [selectedTypes, setSelectedTypes] = useState({}); // Tracks selected types by question index

    const [inputValues, setInputValues] = useState([{ text: '', type: null }]);

    const handleAddQuestion = () => {
        if (inputValues.length < 3) {
            setInputValues([...inputValues, { text: '', type: null }]);
        }
    };


    const handleChange = (index, newText) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = { ...newInputValues[index], text: newText };
        setInputValues(newInputValues);
    };

    const handleRemoveQuestion = (indexToRemove) => {
        setInputValues(inputValues.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValues); // Logs all input values
        onSubmit(inputValues);
    };

    const handleSelectType = (index, type) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = { ...newInputValues[index], type: questionTypes[type] };
        setInputValues(newInputValues);
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
                                    className={inputValues[index].type === questionTypes[type] ? 'selected' : 'unselected'}
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