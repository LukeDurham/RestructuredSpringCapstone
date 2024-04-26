import styled from 'styled-components';

export const SurveyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 20px;
    margin-left: 250px;
    overflow-y: auto;
`;

export const QuestionContainer = styled.div`
    width: 50%;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: gray;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
