import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './App';
import { AuthProvider } from './scenes/utils/AuthContext';
import { ThemeProvider } from '@material-ui/core/styles'; // Import ThemeProvider


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider> {/* Wrap everything within ThemeProvider */}
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);