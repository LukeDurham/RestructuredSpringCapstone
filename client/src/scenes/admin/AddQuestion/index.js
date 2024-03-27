import React, { useState } from 'react';
// Correct the import statement; remove curly braces for default export
import CustomForm from '../../../components/CustomForm';

const AddQuestion = () => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
        // Handle your form submission logic here
    };

    return (
        // Use PascalCase for the CustomForm component
        <CustomForm onSubmit={handleSubmit}>
            {/* Your form elements go here */}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter question..."
            />
            <button type="submit">Submit</button>
        </CustomForm>
    );
};

export default AddQuestion;
