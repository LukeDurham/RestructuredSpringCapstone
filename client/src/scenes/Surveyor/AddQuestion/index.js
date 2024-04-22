import React, { useState } from 'react';
import CustomForm from '../../../components/CustomForm';

const AddQuestion = () => {
    const handleSubmit = (inputValues) => {
        // Prepare your payload as before
        const payload = {
            questions: inputValues.map((question) => ({
                text: question.text,
                type: question.type || 'DefaultType',
            })),
        };

        console.log(JSON.stringify(payload));


        // Execute the fetch request to your backend
        fetch('/api/addQuestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Handle success, e.g., by clearing the form or showing a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error scenario
            });

        console.log(handleSubmit); // Should log a function definition
    };

    return (

        // Use PascalCase for the CustomForm component
        <CustomForm onSubmit={handleSubmit} />
    );
};

export default AddQuestion;
