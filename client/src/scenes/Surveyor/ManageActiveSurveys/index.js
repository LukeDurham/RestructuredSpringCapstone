import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography, Button } from '@mui/material';

const ManageActiveSurveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSurveys = async () => {
            setLoading(true);
            setError('');
            try {
                // Update the URL to match the provided API endpoint
                const url = new URL('/api/active_surveys', window.location.origin);
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch surveys');
                }
                const data = await response.json();
                setSurveys(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveys();
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Typography variant="h4" gutterBottom>
                Manage Active Surveys
            </Typography>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && surveys.map((survey) => (
                <Box key={survey.id} m={1} p={2} bgcolor="#f0f0f0" boxShadow={2} borderRadius={2}>
                    <Typography variant="h6">{survey.title}</Typography>
                    <Typography>{survey.description}</Typography>
                    <Button color="secondary" variant="contained" onClick={() => {/* handle deactivate here */ }}>
                        Deactivate
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default ManageActiveSurveys;
