import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export const StyledList = styled(List)`
  width: 100%;
  color: #E0E0E0; // Maintaining existing color styling
`;

export const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: #494848; // Maintaining existing hover effect
  }
  color: #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 75px; // Maintaining existing spacing
`;

export const StyledListItemIcon = styled(ListItemIcon)`
  color: #E0E0E0;
  min-width: 50px; // Maintaining width for better alignment
  svg {
    font-size: 2.0rem; // Increased from 1.5rem to 2.0rem for larger icons
    transform: scale(1.5); // Scale up the icons for larger view
  }
`;

export const StyledListItemText = styled(ListItemText)`
  font-family: 'Raleway', sans-serif;
  font-size: 1.4rem; // Increased from 1.1rem to 1.4rem for larger text
  text-align: left;
  .MuiListItemText-primary {
    font-size: 1.5rem; // Increased from 1.15rem to 1.5rem for larger primary text
  }
`;
