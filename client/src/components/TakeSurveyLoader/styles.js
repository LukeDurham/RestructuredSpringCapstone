import styled from 'styled-components';
import { FormControl, FormLabel } from '@material-ui/core'; // Add this import

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
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const StyledFormControl = styled(FormControl)`
    width: 100%;
    background-color: white;
    color: white;
    display: inline-block;
    width: auto;
    max-width: 80%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledFormLabel = styled(FormLabel)`
    color: blue;
    text-align: center;
    display: block;
`;
