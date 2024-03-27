import React, { useState } from 'react';
import { Form } from './styles'; // Adjust the import path as necessary

const CustomForm = () => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
        // Add additional form submission logic here
    };

    return (
        <Form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Your Text Here"
            />
            <button type="submit">Submit</button>
        </Form>
    );
};

export default CustomForm;
