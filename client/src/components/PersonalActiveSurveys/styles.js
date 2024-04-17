// PersonalActiveSurveys.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1F1B24; // Set to dark color as specified
  color: white; // Set text color to white
  padding: 20px;
  border-radius: 8px;
  width: 33.3%; // Set width to 1/3 of its current size
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto; // Center the container
`;

export const Title = styled.h1`
  color: white; // Ensure text is white
  font-size: 24px;
  margin-bottom: 20px; // Add some space below the title
`;

export const SurveysList = styled.div`
  width: 100%; // Ensure it takes full container width
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
