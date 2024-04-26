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
            height="100vh" // Full viewport height
            padding={4} // Additional padding for breathing room
        >
            <Typography variant="h3" gutterBottom style={{ color: 'black' }}> {/* Larger heading */}
                Manage Active Surveys
            </Typography>
            {loading && <CircularProgress size={50} />} {/* Larger loading spinner */}
            {error && (
                <Typography variant="body1" color="error" style={{ fontSize: '18px' }}>
                    {error}
                </Typography>
            )}
            {!loading && !error && surveys.map((survey) => (
                <Box
                    key={survey.id}
                    m={2} // Increase margin between survey boxes
                    p={3} // Increase padding within survey boxes
                    bgcolor="#f0f0f0" // Light gray background
                    boxShadow={3} // Stronger shadow for depth
                    borderRadius={4} // More pronounced rounding
                    width="80%" // Make the boxes wider
                >
                    <Typography variant="h5" style={{ color: 'black', fontSize: '20px' }}>
                        {survey.title}
                    </Typography>
                    <Typography style={{ color: 'black', fontSize: '18px' }}>
                        {survey.description}
                    </Typography>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => handleDeactivate(survey.id)}
                        style={{ fontSize: '16px', padding: '10px 20px' }} // Larger button
                    >
                        Deactivate
                    </Button>
                </Box>
            ))}
        </Box>
    );
};


export default ManageActiveSurveys;
