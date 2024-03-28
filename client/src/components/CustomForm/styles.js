import styled from 'styled-components';
import ButtonGroup from '@mui/material/ButtonGroup'; // If you choose to use ButtonGroup

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;

  background-color: #333;
  border: 2px solid #000;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin: auto;
  width: 40vh; // Adjust this as necessary for your design

  .question-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
  }

  input {
    flex-grow: 1; // Ensure input takes up the maximum width available
    margin-right: 8px; // Adds some spacing between the input and the delete button
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .delete-button {
    margin-left: 8px; // Space to the right for the delete button
    color: red; // Assuming you want the delete icon/button to be red
    cursor: pointer;
  }

   .add-button { 
    position: absolute;
    top: 0;
    left: 0;
    margin: 16px;
    z-index: 2; // Ensure it's above other elements if needed
  }

  .submit-button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    margin-top: 8px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column; // Stack elements vertically
  align-items: flex-start; // Align items to the start of the wrapper
  width: 100%;
  margin-bottom: 8px;

  .row-container {
    display: flex; // New container to hold TextField and DeleteButton in a row
    align-items: center;
    width: 100%;
  }

  .text-field-container {
    flex-grow: 1;
    display: flex;
  }

  .delete-button-container {
    min-width: 48px; // Adjust based on your DeleteButton's size
    display: flex;
    justify-content: center; // Center the delete button if it's visible
    margin-left: 8px; // Space to the right for the delete button
  }
`;



export const CustomButtonGroup = styled(ButtonGroup)`
  button {
    padding: 2px 6px; // Example to make buttons smaller
    color: white; // Default to white text for all buttons

    &.unselected {
      // Additional styles for unselected buttons if necessary
    }

    &.selected {
      background-color: #1976d2; // Darker color for selected button
      &:hover {
        background-color: #1565c0; // Even darker on hover
      }
    }
  }
`;