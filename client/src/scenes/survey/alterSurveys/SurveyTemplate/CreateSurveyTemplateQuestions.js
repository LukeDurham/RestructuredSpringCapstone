import React, { useState } from 'react';
import '../../global.css'

const AddSurveyTemplate = () => {
    const [templateName, setTemplateName] = useState('');
    const [description, setDescription] = useState(''); // New state for the description

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

    return (
        <div className='wrapper'>
            <h2>Add Survey Template</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Template Name:</label>
                    <input type="text" value={templateName} onChange={handleTemplateNameChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={handleDescriptionChange} required />
                </div>
                <button type="submit">Create Template</button>
            </form>
        </div>
    );
};

export default AddSurveyTemplate;
