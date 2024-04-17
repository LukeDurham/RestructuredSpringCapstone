import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export const StyledList = styled(List)`
  width: 100%;
  color: #E0E0E0;
`;

export const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: #BB86FC;
  }
  color: #E0E0E0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px; /* Increased space between each item */
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  color: #E0E0E0;
  min-width: 300px;
  /* Apply a scale transform to increase the icon size */
  svg {
    font-size: 2rem; /* Adjust this value as needed */
    transform: scale(1.5);
  }
`;


// Other styled components...

export const StyledListItemText = styled(ListItemText)`
  font-family: 'Raleway', sans-serif;
  font-size: 1.1rem; // Increase text size
  text-align: center;

  .MuiListItemText-primary {
    font-size: 1.15rem; // Adjust font size to make text bigger as needed
  }
`;

