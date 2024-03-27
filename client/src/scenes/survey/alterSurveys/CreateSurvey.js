import React, { useState, useEffect } from 'react';
import '../../../global.css';
import AppAppBar from '../../../components/AppAppBar'; // Import the AppAppBar component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Add this line
import getLPTheme from '../../../getLPTheme';

const CreateSurvey = () => {
    const [questions, setQuestions] = useState([{ question: '', questionType: 'multiple_choice', options: [''] }]);
    const [likertScaleRange, setLikertScaleRange] = useState(5); // Default Likert scale range
    const [surveyTemplates, setSurveyTemplates] = useState([]);
    const [questionTypes, setQuestionTypes] = useState([{ id: 1, name: 'Multiple choice' }, { id: 2, name: 'Likert scale' }, { id: 3, name: 'Short answer' }]);
    const [users, setUsers] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [projects, setProjects] = useState([]);
    const [mode, setMode] = useState('dark'); // Add this line
    const LPtheme = createTheme(getLPTheme(mode)); // Add this line

    useEffect(() => {
        // Fetch survey templates
        fetch('/api/survey_templates')
            .then(response => response.json())
            .then(data => setSurveyTemplates(data))
            .catch(error => console.error('Error fetching survey templates:', error));

        // Fetch users
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));

        // Fetch organizations
        fetch('/api/organizations')
            .then(response => response.json())
            .then(data => setOrganizations(data))
            .catch(error => console.error('Error fetching organizations:', error));

        // Fetch projects
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', questionType: 'multiple_choice', options: [''] }]);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleQuestionChange = (questionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].question = value;
        setQuestions(updatedQuestions);
    };

    const handleQuestionTypeChange = (questionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].questionType = value;
        setQuestions(updatedQuestions);
    };

    const handleAddOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push('');
        setQuestions(updatedQuestions);
    };

    const handleRemoveQuestion = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(questionIndex, 1);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/surveys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Survey Name', // Replace with actual survey name
                    survey_template_id: surveyTemplates.length > 0 ? surveyTemplates[0].id : 1, // Replace with the ID of the selected survey template
                    surveyor_id: users.length > 0 ? users[0].id : 1, // Replace with the ID of the selected surveyor
                    organization_id: organizations.length > 0 ? organizations[0].id : 1, // Replace with the ID of the selected organization
                    project_id: projects.length > 0 ? projects[0].id : 1, // Replace with the ID of the selected project
                    surveyor_role_id: 1 // Replace with the ID of the surveyor role
                }),
            });

            if (response.ok) {
                const createdSurvey = await response.json();
                console.log('Survey created successfully:', createdSurvey);
                // Optionally, you can redirect the user to a success page or clear the form
            } else {
                console.error('Failed to create survey');
            }
        } catch (error) {
            console.error('Error creating survey:', error);
        }
    };

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <div>
                <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> {/* Include the AppAppBar component */}
                <div className='wrapper'>
                    <h2>Create Survey</h2>
                    <form onSubmit={handleSubmit}>
                        {questions.map((question, index) => (
                            <div key={index} className="question-container">
                                <div>
                                    <label>Question Type:</label>
                                    <select value={question.questionType} onChange={(e) => handleQuestionTypeChange(index, e.target.value)}>
                                        {questionTypes.map((type) => (
                                            <option key={type.id} value={type.name}>{type.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>Question:</label>
                                    <input type="text" value={question.question} onChange={(e) => handleQuestionChange(index, e.target.value)} required />
                                </div>
                                {question.questionType === 'multiple_choice' && (
                                    <div className='options'>
                                        <label>Options:</label>
                                        {question.options.map((option, optionIndex) => (
                                            <input
                                                key={optionIndex}
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                                required
                                            />
                                        ))}
                                        <button type="button" onClick={() => handleAddOption(index)}>Add Option</button>
                                    </div>
                                )}
                                {question.questionType === 'likert' && (
                                    <div>
                                        <label>Likert Scale Range:</label>
                                        <input type="number" value={likertScaleRange} onChange={(e) => setLikertScaleRange(parseInt(e.target.value))} min="2" />
                                    </div>
                                )}
                                <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
                                {index !== questions.length - 1 && <hr className="divider" />}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddQuestion}>Add Question</button>
                        <button type="submit">Create Survey</button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default CreateSurvey;
