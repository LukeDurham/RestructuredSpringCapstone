import React from 'react';
import { SidebarContainer, SidebarItem } from './styles'; // Adjust import path as needed
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Icon for adding
import EditIcon from '@mui/icons-material/Edit'; // Icon for editing
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Icon for removing

const OrganizationSidebar = ({ onNavigate }) => {
    return (
        <SidebarContainer>
            <SidebarItem onClick={() => onNavigate('Add Organization')}><AddCircleOutlineIcon />Add Organization</SidebarItem>
            <SidebarItem onClick={() => onNavigate('Edit Organization')}><EditIcon />Edit Organization</SidebarItem>
            <SidebarItem onClick={() => onNavigate('Remove Organization')}><DeleteOutlineIcon />Remove Organization</SidebarItem>
        </SidebarContainer>
    );
};

export default OrganizationSidebar;
