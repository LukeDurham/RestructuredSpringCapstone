import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel'; // Ensure this import is correct
import { DeleteBtn } from './styles'; // Adjust the import path as necessary

const DeleteButton = ({ onClick, className }) => {
    return (
        <DeleteBtn onClick={onClick} className={className}>
            <CancelIcon />
        </DeleteBtn>
    );
};

export default DeleteButton;
