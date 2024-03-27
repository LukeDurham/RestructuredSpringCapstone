// DeleteQuestionFromSurvey.js
import React, { useState } from 'react';

const DeleteQuestionFromSurvey = () => {
    const [questionId, setQuestionId] = useState('');

    const handleQuestionIdChange = (e) => {
        setQuestionId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here (e.g., sending question ID to the server for deletion)
        console.log('Question ID:', questionId);
        // Reset form after submission
        setQuestionId('');
    };

    return (
        <div>
            <h2>Delete Question from Survey</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question ID:</label>
                    <input type="text" value={questionId} onChange={handleQuestionIdChange} required />
                </div>
                <button type="submit">Delete Question</button>
            </form>
        </div>
    );
};

export default DeleteQuestionFromSurvey;
