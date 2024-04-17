import styled from 'styled-components';

export const SurveyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // Centers children horizontally in the available space
    flex: 1;
    padding: 20px;
    margin-left: 250px; // Ensures it doesn't overlap with the sidebar
    overflow-y: auto; // Allows scrolling when content exceeds the container height
`;


export const QuestionContainer = styled.div`
    width: 50%;  // Set the width to 50% of the parent's width
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;  // Add this if you want to center the contents
    justify-content: center;  // Center vertically if needed
`;