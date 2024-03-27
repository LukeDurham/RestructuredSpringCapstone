import React, { useState } from 'react';
import '../../../../global.css'
import AppAppBar from '../../../../components/AppAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Add this line
import getLPTheme from '../../../../getLPTheme';

const AddSurveyTemplate = () => {
    const [templateName, setTemplateName] = useState('');
    const [description, setDescription] = useState(''); // New state for the description
    const [mode, setMode] = useState('dark'); // Add this line
    const LPtheme = createTheme(getLPTheme(mode)); // Add this line

    const handleTemplateNameChange = (e) => {
        setTemplateName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value); // Handler for description change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Include the description in the template data
        const templateData = {
            name: templateName,
            description: description,
        };
        // Submit the template
        try {
            const response = await fetch('/api/survey_templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(templateData)
            });
            if (response.ok) {
                console.log('Survey template created successfully');
                // Reset form after successful submission
                setTemplateName('');
                setDescription(''); // Reset description as well
            } else {
                console.error('Failed to create survey template');
            }
        } catch (error) {
            console.error('Error creating survey template:', error);
        }
    };

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <div>
                <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
                <div className='wrapper'>
                    <h2>Add Survey Template</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='options'>
                            <label>Template Name:</label>
                            <input type="text" value={templateName} onChange={handleTemplateNameChange} required />
                        </div>
                        <div className='options'>
                            <label>Description:</label>
                            <textarea value={description} onChange={handleDescriptionChange} required />
                        </div>
                        <button type="submit">Create Template</button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default AddSurveyTemplate;
