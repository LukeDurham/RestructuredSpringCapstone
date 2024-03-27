import React, { useState } from 'react';

const CreateSurvey = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']); // Initial options

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/surveys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question, options }),
            });
            if (response.ok) {
                const newSurvey = await response.json();
                console.log('Survey created successfully:', newSurvey);
                // Reset form fields if needed
                setQuestion('');
                setOptions(['', '']);
            } else {
                console.error('Failed to create survey');
            }
        } catch (error) {
            console.error('Error creating survey:', error);
        }
    };

    return (
        <div>
            <h2>Create Survey</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question:</label>
                    <input type="text" value={question} onChange={handleQuestionChange} required />
                </div>
                <div>
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                    ))}
                    <button type="button" onClick={handleAddOption}>Add Option</button>
                </div>
                <button type="submit">Create Survey</button>
            </form>
        </div>
    );
};

export default CreateSurvey;
