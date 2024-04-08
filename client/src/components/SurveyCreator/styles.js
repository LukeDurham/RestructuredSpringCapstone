import styled from 'styled-components';

export const SurveyContainer = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto; // In case of many questions
`;

export const QuestionContainer = styled.div`
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;