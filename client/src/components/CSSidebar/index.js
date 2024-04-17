import React from 'react';
import { SidebarContainer, SidebarItem } from './styles'; // Adjust import path as needed
import RuleIcon from '@mui/icons-material/Rule';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon for the new item
import GroupIcon from '@mui/icons-material/Group'; // Import the Group icon
import AssignmentIcon from '@mui/icons-material/Assignment'; // Import the icon from MUI

const CSSidebar = ({ onAddQuestion  }) => {
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
            <SidebarItem onClick={() => onAddQuestion('Import Survey Template')}>
                <SearchIcon />
                Import Survey Template
            </SidebarItem>
            <SidebarItem onClick={() => onAddQuestion('Assign Organization')}>
                <GroupIcon />
                Assign to Organization(s)
            </SidebarItem>
            <SidebarItem onClick={() => onAddQuestion('Assign Project')}>
                <AssignmentIcon />
                Assign to Project(s)
            </SidebarItem>
        </SidebarContainer>
    );
};

export default CSSidebar;
