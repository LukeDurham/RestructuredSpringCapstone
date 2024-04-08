import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ensure this path is correct
import App from './App'; // Ensure this path is correct
import { AuthProvider } from './scenes/utils/AuthContext';


ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);