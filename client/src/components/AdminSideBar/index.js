import React from 'react';
import { StyledSideBar } from './styles'; // Note the capital "B"
import AdminIconMenu from '../AdminIconMenu'; // Update the path to where AdminIconMenu is located

const AdminSideBar = ({ onMenuClick,theme }) => {
    console.log("Theme:", theme);
    return (
        <StyledSideBar style={{ backgroundColor: theme }}>
            <AdminIconMenu onMenuClick={onMenuClick} />
        </StyledSideBar>
    );
};

export default AdminSideBar;
