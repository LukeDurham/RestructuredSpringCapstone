// ThemeContext.js
import { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { themeSettings } from './theme'; // Ensure this is the path to your theme settings

const ThemeContext = createContext({
    toggleTheme: () => { }, // Function to toggle theme
    mode: 'light' // Current mode
});

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    const toggleTheme = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
