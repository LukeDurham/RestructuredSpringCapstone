import React,{ useState } from 'react';
import AdminSideBar from '../../components/AdminSideBar';
import StyledHome from '../../components/StyledHome'; // Make sure the path to StyledHome.js is correct
import { updateBackgroundColor } from '../../components/Background/UpdateBackground';
import { StyledButton } from '../../components/AdminSideBar/styles';
import '../../global.css'

const AdminDashboard = () => {
    // const navigate = useNavigate();
// const navigate = useNavigate();
const [themeIndex, setThemeIndex] = useState(0); // State to track the current theme index

const themes = ['#121212', '#088395', '#C6DCBA', '#944E63']; // Define your color themes

const changeTheme = () => {
    const colors = [
        'var(--background-color-default)',
        'var(--background-color-1)',
        'var(--background-color-2)',
        'var(--background-color-3)'
    ];
    const nextTheme = colors[(themeIndex + 1) % colors.length];
    updateBackgroundColor(nextTheme);
    setThemeIndex((prevIndex) => (prevIndex + 1) % colors.length);
};

    return (
        <div>
            <StyledButton onClick={changeTheme}>Change Theme</StyledButton>
            <AdminSideBar theme={themes[themeIndex]} />
            <h1>Welcome Admin</h1>
        </div>
    );
};

export default AdminDashboard;
