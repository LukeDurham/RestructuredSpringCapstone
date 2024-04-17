import React, { useState } from 'react';
import { ModalOverlay, ModalContent } from './styles'; // Importing styled components

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value.trim());  // Trim the input to handle spaces
    };

    const handleConfirm = () => {
        if (inputValue.toLowerCase() === 'yes') {
            onConfirm();
        } else {
            alert('You must type "yes" to confirm.');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <p>Type "yes" to confirm import:</p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{ marginBottom: '10px' }} // Inline styling for specifics not covered in styled-components
                />
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={onClose}>Close</button>
            </ModalContent>
        </ModalOverlay>
    );
}

export default ConfirmationModal;
