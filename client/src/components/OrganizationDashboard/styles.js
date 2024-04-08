// styles.js
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

export const StyledCard = styled(Card)(({ theme }) => ({
    minWidth: 275,
    margin: theme.spacing(2),
    textAlign: 'center',
    borderRadius: '20px', // Rounded corners
}));
