import React from "react";
import { Typography, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledHome = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: 20,
    textAlign: 'center',
    minHeight: '100vh',
    overflowX: 'hidden'
}));

const About = () => {
    return (
        <StyledHome>
            <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    About the Project
                </Typography>
                <Box sx={{ marginTop: 2, fontSize: "1.1rem" }}>
                    <Typography variant="body1" paragraph>
                        This project was created by <strong>Luke Durham</strong> as part of his Spring 2024 Capstone. It showcases a dynamic web application designed to explore modern web technologies and provide users with a responsive and interactive experience.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The primary goal of this project is to build a survey application as requested by the customer. It aims to offer intuitive survey creation, distribution, and analytics tools.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions or would like to speak about employment opportunities, feel free to reach out. Your feedback and inquiries are always welcome.
                    </Typography>
                    {/* Adding more detailed content */}
                    <Typography variant="body1" paragraph>
                        The application leverages the latest advancements in web development frameworks, ensuring that both usability and aesthetic qualities meet the highest standards of modern web design.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Accessibility and user experience are core components of this project, emphasizing a design that accommodates all users, including those with disabilities. This commitment to accessibility ensures that the application is compliant with ADA standards, providing an inclusive environment for all users.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The backend of the application utilizes cloud-based technologies to manage data efficiently, offering scalable solutions for user management and data processing. This backend architecture ensures that the application remains responsive and capable of handling large volumes of user data without compromise.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Looking forward, the project aims to incorporate more advanced features, such as machine learning algorithms to analyze survey data and provide predictive insights that can help users make informed decisions.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The development process has been a journey of learning and growth, offering numerous challenges and opportunities to enhance technical skills and knowledge in the field of web development.
                    </Typography>
                </Box>
            </Container>
        </StyledHome >
    );
}

export default About;
