import React, { useState, useEffect } from 'react';

const AddQuestionToDatabase = () => {
    const [question, setQuestion] = useState('');
    const [questionTypes, setQuestionTypes] = useState([]);
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [options, setOptions] = useState(['']); // Start with one empty option

    useEffect(() => {
        fetchQuestionTypes();
    }, []);

    const fetchQuestionTypes = async () => {
        try {
            const response = await fetch('/api/get_question_types');
            const data = await response.json();
            const uniqueQuestionTypes = data.questionTypes;
            setQuestionTypes(uniqueQuestionTypes);
        } catch (error) {
            console.error('Error fetching question types:', error);
        }
    };



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
        // Create the question object
        const questionData = {
            question_type: selectedQuestionType,
            question: question,
            options: options
        };
        // Submit the question
        try {
            const response = await fetch('/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questionData)
            });
            if (response.ok) {
                console.log('Question submitted successfully');
                // Reset form after successful submission
                setQuestion('');
                setOptions(['']);
                setSelectedQuestionType('');
            } else {
                console.error('Failed to submit question');
            }
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    return (
        <div>
            <h2>Add Question to Database</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question Type:</label>
                    <select value={selectedQuestionType} onChange={(e) => setSelectedQuestionType(e.target.value)} required>
                        <option value="">Select Question Type</option>
                        {questionTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Question:</label>
                    <input type="text" value={question} onChange={handleQuestionChange} required />
                </div>
                {selectedQuestionType === "True or False" && (
                    <>
                        <div>
                            <label>Option 1:</label>
                            <input
                                type="text"
                                value="True"
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Option 2:</label>
                            <input
                                type="text"
                                value="False"
                                readOnly
                            />
                        </div>
                    </>
                )}
                {selectedQuestionType !== "True or False" && options.map((option, index) => (
                    <div key={index}>
                        <label>Option {index + 1}:</label>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
                {selectedQuestionType !== "True or False" && (
                    <button type="button" onClick={handleAddOption}>Add Option</button>
                )}
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default AddQuestionToDatabase;
