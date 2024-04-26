import { styled } from '@mui/system';
import { ProSidebar } from 'react-pro-sidebar';

export const StyledSideBar = styled(ProSidebar)({
    backgroundColor: '#494848', // Your chosen background color
    width: '13%', // Adjust according to your preference
    minWidth: '125px', // Ensuring it doesn’t get too narrow on smaller screens
    height: '100vh',
    

    // Additional styling..
    // Add any additional styling here
});
export const StyledButton = styled('button')({
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px',
    borderRadius: '5px',
    background: '#000',
    color: '#FFF',
    border: 'none',
    cursor: 'pointer',
});