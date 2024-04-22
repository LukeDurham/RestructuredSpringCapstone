import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
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

        // Log the Survey ID and Question ID being sent
        console.log("Sending search for Survey ID:", surveyId, "and Question ID:", questionId);

        try {
            // Assuming you need to pass these as query parameters
            const url = new URL('/api/surveyanalytics', window.location.origin);
            url.searchParams.append('surveyId', surveyId);
            url.searchParams.append('questionId', questionId);

            // Log the URL to which the request is being sent
            console.log("Request URL:", url.href);

            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json(); // Assumes the server sends a JSON response even on errors
                console.error("Failed to fetch data:", errorData);
                throw new Error(errorData.message || 'Failed to fetch data');
            }
            const result = await response.json();

            // Transform the result to the expected format for the pie chart
            const formattedData = result.map(item => ({
                id: item.response,  // 'id' should be a unique identifier for pie chart slices
                value: item.count   // 'value' should be numeric
            }));

            setData(formattedData);
        } catch (err) {
            console.error("Error during fetch:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <h1>Survey Results</h1>
            <TextField
                label="Survey ID"
                value={surveyId}
                onChange={(e) => setSurveyId(e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Question ID"
                value={questionId}
                onChange={(e) => setQuestionId(e.target.value)}
                type="number"
                margin="normal"
                variant="outlined"
            />
            <Button onClick={handleSearch} variant="contained" color="primary" disabled={loading}>
                Search
            </Button>
            {error && <p>Error: {error}</p>}
            {data && <PieChart data={data} />}
        </div>
    );
};

export default SurveyResults;
