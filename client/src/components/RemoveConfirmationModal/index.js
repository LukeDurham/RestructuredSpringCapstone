import React from 'react';
import { ModalOverlay, ModalContent } from './styles'; // Importing styled components

function RemoveConfirmationModal({ isOpen, onClose, onRemove }) {
    if (!isOpen) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <p>Are you sure you want to remove this question?</p>
                <button onClick={onRemove}>Yes</button>
                <button onClick={onClose}>No</button>
            </ModalContent>
        </ModalOverlay>
    );
}

export default RemoveConfirmationModal;
