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

    const handleDeactivate = async (surveyId) => {
        // Example deactivation function logic
        try {
            const response = await fetch(`/api/deactivate_surveys`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ surveyId }),
            });
            if (!response.ok) {
                throw new Error('Failed to deactivate survey');
            }
            setSurveys(surveys.filter(survey => survey.id !== surveyId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
                Manage Active Surveys
            </Typography>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && surveys.map((survey) => (
                <Box key={survey.id} m={1} p={2} bgcolor="#f0f0f0" boxShadow={2} borderRadius={2}>
                    <Typography variant="h6" style={{ color: 'black' }}>{survey.title}</Typography>
                    <Typography style={{ color: 'black' }}>{survey.description}</Typography>
                    <Button color="secondary" variant="contained" onClick={() => handleDeactivate(survey.id)}>
                        Deactivate
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default ManageActiveSurveys;
