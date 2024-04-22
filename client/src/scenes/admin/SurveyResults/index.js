import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Box, Typography } from '@mui/material';
import PieChart from '../../../components/PieChart';

const SurveyResults = () => {
    const [surveyId, setSurveyId] = useState('');
    const [questionId, setQuestionId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        setData(null); // Clear previous data

        try {
            const url = new URL('/api/surveyanalytics', window.location.origin);
            url.searchParams.append('surveyId', surveyId);
            url.searchParams.append('questionId', questionId);

            const response = await fetch(url.href);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch data');
            }

            const result = await response.json();
            const formattedData = result.map((item) => ({
                id: item.response, // Pie chart ID
                value: item.count, // Pie chart value
            }));

            setData(formattedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh" // Full viewport height to center vertically
            padding={3}
        >
            <Typography variant="h4" gutterBottom>
                Survey Results
            </Typography>
            <Box
                bgcolor="#f0f0f0" // Light gray background
                padding={3}
                borderRadius="8px" // Rounded corners
                boxShadow={2} // Light shadow for depth
            >
                <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                    <TextField
                        label="Survey ID"
                        value={surveyId}
                        onChange={(e) => setSurveyId(e.target.value)}
                        type="number"
                        variant="outlined"
                        fullWidth // Make it fill available space
                        size="medium" // Larger size
                    />
                    <TextField
                        label="Question ID"
                        value={questionId}
                        onChange={(e) => setQuestionId(e.target.value)}
                        type="number"
                        variant="outlined"
                        fullWidth
                        size="medium" // Larger size
                    />
                    <Button
                        onClick={handleSearch}
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
                    </Button>
                </Box>
            </Box>
            {error && (
                <Typography variant="body1" color="error" marginTop={2}>
                    Error: {error}
                </Typography>
            )}
            {data && (
                <Box marginTop={3}>
                    <PieChart data={data} />
                </Box>
            )}
        </Box>
    );
};

export default SurveyResults;
