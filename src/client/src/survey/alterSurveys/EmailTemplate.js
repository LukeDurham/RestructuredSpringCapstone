// EmailTemplates.js
import React, { useState } from 'react';

const EmailTemplates = () => {
    const [template, setTemplate] = useState('');

    const handleTemplateChange = (e) => {
        setTemplate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here (e.g., sending template to the server)
        console.log('Email Template:', template);
        // Reset form after submission
        setTemplate('');
    };

    return (
        <div>
            <h2>Email Templates</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email Template:</label>
                    <textarea value={template} onChange={handleTemplateChange} required />
                </div>
                <button type="submit">Save Template</button>
            </form>
        </div>
    );
};

export default EmailTemplates;
