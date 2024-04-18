import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './App';
import { AuthProvider } from './scenes/utils/AuthContext';
import { ThemeProvider } from '@material-ui/core/styles'; // Import ThemeProvider
import theme from './theme'; // Ensure the path to theme.js is correct

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}> {/* Wrap everything within ThemeProvider */}
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);