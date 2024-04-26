import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const StyledHome = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 20,
        textAlign: 'center',
        minHeight: '100vh',
        overflowX: 'hidden'
    }));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted Form Data:', formData); // Replace with your submission logic
        alert('Support request submitted. Thank you!');
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
    };

    return (
        <StyledHome>

            <Container maxWidth="sm" sx={{ mt: 4, mb: 4, padding: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Support Form
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        fullWidth
                        required
                        id="name"
                        label="Your Name"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        required
                        id="message"
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Container>
        </StyledHome>
    );
};

export default Support;
