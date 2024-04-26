import { styled } from '@mui/material/styles';

const StyledHome = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(2.5), // uses theme spacing for padding
    textAlign: 'center',
    minHeight: '100vh',
    overflowX: 'hidden',
    display: 'flex', // use flex to center content vertically
    flexDirection: 'column', // stack children vertically
    justifyContent: 'center', // center content vertically
    alignItems: 'center', // center content horizontally
}));

export default StyledHome;