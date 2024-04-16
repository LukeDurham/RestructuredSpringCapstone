import React from 'react';
import { SidebarContainer, SidebarItem } from './styles'; // Adjust import path as needed
import RuleIcon from '@mui/icons-material/Rule';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon for the new item

const Sidebar = ({ onAddQuestion }) => {
  return (
    <SidebarContainer>
      <SidebarItem onClick={() => onAddQuestion('True or False')}>
        <RuleIcon /> {/* Icon next to the text */}
        True or False
      </SidebarItem>
      <SidebarItem onClick={() => onAddQuestion('Likert Scale')}>
        <LinearScaleIcon />
        Likert Scale
      </SidebarItem>
      <SidebarItem onClick={() => onAddQuestion('Multiple Choice')}>
        <DragIndicatorIcon />
        Multiple Choice
      </SidebarItem>
      {/* Add the new sidebar item for adding existing questions */}
      <SidebarItem onClick={() => onAddQuestion('Add Existing Question')}>
        <SearchIcon />
        Add Existing Question
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
