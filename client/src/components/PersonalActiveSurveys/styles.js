import styled from 'styled-components';

const SurveyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Adjust minmax as needed for size
  gap: 20px; // Spacing between boxes
  padding: 20px; // Padding around the grid
  margin-left: 10%; // Account for sidebar
  width: 90%; // Remaining space
`;

const SurveyBox = styled.div`
  background-color: purple; // Purple background as per the button example
  color: white; // White text
  padding: 10px 20px;
  border-radius: 8px; // Rounded corners
  display: flex;
  flex-direction: column;
  align-items: center; // Center content horizontally
  justify-content: center; // Center content vertically
  cursor: pointer; // Pointer on hover
  transition: transform 0.3s; // Smooth transform effect on hover

  &:hover {
    transform: scale(1.05); // Slightly enlarge on hover
  }
`;

export { SurveyContainer, SurveyBox };
