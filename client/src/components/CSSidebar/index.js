import React from 'react';
import { SidebarContainer, SidebarItem } from './styles'; // Adjust import path as needed
import RuleIcon from '@mui/icons-material/Rule';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon for the new item
import GroupIcon from '@mui/icons-material/Group'; // Import the Group icon
import AssignmentIcon from '@mui/icons-material/Assignment'; // Import the icon from MUI
import { useNavigate } from 'react-router-dom';

const CSSidebar = ({ onAddQuestion }) => {
    const navigate = useNavigate();

    // Define the navigateToDashboard function
    const navigateToDashboard = () => {
        navigate('/admin/dashboard');
    };

    return (
        <SidebarContainer>
            <SidebarItem onClick={() => onAddQuestion('True or False')}>
                <RuleIcon />
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
            <SidebarItem
                onClick={navigateToDashboard} // Correctly bind the navigate function call
                style={{ marginTop: '125px' }}  // Adjust the margin as needed
            >
                <AssignmentIcon />
                Go back to dashboard.
            </SidebarItem>
        </SidebarContainer>
    );
};

export default CSSidebar;
