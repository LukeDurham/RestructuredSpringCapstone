// OrganizationDashboard.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CardContent, Typography } from '@mui/material';
import getLPTheme from '../../getLPTheme'; // Adjust import path as needed
import AdminAppBar from '../AdminAppBar'; // Adjust import path as needed


import { StyledCard } from './styles'; // Import the StyledCard from styles.js

const OrganizationDashboard = () => {
    const [mode, setMode] = React.useState('dark');
    const LPtheme = createTheme(getLPTheme(mode));

    // Fake data for the organizations
    const organizationsData = {
        totalOrganizations: 100,
        underperformingOrganizations: 20,
        organizationsReachingSurveyTargets: 80,
    };

    // Function to toggle between light and dark mode
    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <AdminAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Total Organizations
                        </Typography>
                        <Typography variant="h6">
                            {organizationsData.totalOrganizations}
                        </Typography>
                    </CardContent>
                </StyledCard>

                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Underperforming Organizations
                        </Typography>
                        <Typography variant="h6">
                            {organizationsData.underperformingOrganizations}
                        </Typography>
                    </CardContent>
                </StyledCard>

                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Organizations Meeting Targets
                        </Typography>
                        <Typography variant="h6">
                            {organizationsData.organizationsReachingSurveyTargets}
                        </Typography>
                    </CardContent>
                </StyledCard>
            </div>
        </ThemeProvider>
    );
};

export default OrganizationDashboard;
