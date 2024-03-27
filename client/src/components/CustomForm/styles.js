import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; // Use the full height of the viewport to center vertically

  border: 2px solid #000; // Example border for the form
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); // Optional: adds a shadow for visibility
  margin: auto; // Helps in centering if flex-direction is column
  width: fit-content; // Ensures the form only takes up the necessary width

  input {
    margin: 10px 0; // Adds margin to space out form elements
    padding: 8px 12px; // Padding for input fields
    border: 1px solid #ccc; // Example border styling for inputs
    border-radius: 4px; // Rounded corners for inputs
    width: 100%; // Ensures inputs take up the full width of the form
  }

  button {
    background-color: #007bff; // Example background color for buttons
    color: white; // Text color for buttons
    padding: 10px 15px; // Padding for buttons
    border: none; // Removes border for buttons
    border-radius: 5px; // Rounded corners for buttons
    cursor: pointer; // Changes cursor to pointer on hover
    width: 100%; // Ensures buttons take up the full width of the form

    &:hover {
      background-color: #0056b3; // Darkens the button on hover
    }
  }
`;