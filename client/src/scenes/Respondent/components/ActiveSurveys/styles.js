import styled from 'styled-components';

export const SurveyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Create a grid with columns that each have a minimum width of 300px and fill the available space
  gap: 20px; // Space between each survey box
  padding: 20px; // Padding around the entire grid container
  margin-left: 10%; // Adjust this as needed to account for the sidebar
  width: 90%; // Remaining space after the sidebar
`;

export const SurveyBox = styled.div`
  background-color: purple; // Purple background, as used in your example
  color: white; // Text color
  padding: 20px; // Padding inside each survey box
  border-radius: 8px; // Rounded corners for the boxes
  display: flex;
  flex-direction: column;
  align-items: center; // Center the content horizontally
  justify-content: center; // Center the content vertically
  cursor: pointer; // Change the cursor on hover to indicate it's clickable
  transition: transform 0.3s ease-in-out; // Smooth transformation on hover

  &:hover {
    transform: scale(1.05); // Slightly enlarge the box on hover
  }
`;

export const Title = styled.h2`
  color: #fff; // White color for titles to stand out against the purple background
  margin-bottom: 15px; // Space between the title and the button
`;

export const TakeSurveyButton = styled.button`
  padding: 10px 20px;
  background-color: #f4f4f4; // Light background for the button
  color: #333; // Dark text color for contrast
  border: none;
  border-radius: 8px; // Rounded corners for the button
  font-size: 16px; // Font size for readability
  cursor: pointer; // Cursor to pointer to indicate it's clickable

  &:hover {
    background-color: #ddd; // Slightly darker on hover to provide feedback
  }
`;
