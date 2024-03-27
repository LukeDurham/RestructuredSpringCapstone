import React, { useState } from 'react';

const AddQuestionTypeToDatabase = () => {
    const [questionType, setQuestionType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the question_types object
        await fetch('/api/question_types', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: questionType })
        });

        console.log('Form submitted'); // Debugging
        // Reset form after successful submission
        setQuestionType('');
    };

    return (
        <div>
            <h2>Add Question Type</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question Type:</label>
                    <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} required>
                        <option value="">Select Question Type</option>
                        <option value="Likert Scale">Likert Scale</option>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="True or False">True or False</option>
                    </select>
                </div>
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default AddQuestionTypeToDatabase;
