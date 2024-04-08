import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizationDashboard from '../../../components/OrganizationDashboard'; // Adjust the import path as necessary
import OrganizationSidebar from '../../../components/OrganizationSidebar'; // Adjust the import path as necessary
import { Grid } from '@mui/material'; // Using Grid for layout

const Organizations = () => {
    const navigate = useNavigate(); // Hook for navigation

    // Define the navigation function
    const handleNavigate = (destination) => {
        // Based on the destination, navigate to the appropriate route
        switch (destination) {
            case 'Add Organization':
                navigate('/admin/organizations/add');
                break;
            case 'Edit Organization':
                navigate('/admin/organizations/edit');
                break;
            case 'Remove Organization':
                navigate('/admin/organizations/remove');
                break;
            default:
                console.warn('Unknown destination');
        }
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    {/* Pass the navigation function as a prop */}
                    <OrganizationSidebar onNavigate={handleNavigate} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <OrganizationDashboard />
                </Grid>
            </Grid>
        </div>
    );
};

export default Organizations;

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';



// const Organizations = () => {
//     const navigate = useNavigate();

//     const gotoAddOrganization = () => {
//         navigate('/admin/organizations/add')
//     };


//     return (
//         <button onClick={gotoAddOrganization} className="login-button">add Organization</button>
//     );
// };

// export default Organizations;