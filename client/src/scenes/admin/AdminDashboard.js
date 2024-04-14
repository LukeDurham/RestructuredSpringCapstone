// import React, { useState } from "react";
// import '../../global.css'
// import { useNavigate } from 'react-router-dom';
// // import AdminAppBar from '../../components/AdminAppBar'; // Import the AdminAppBar component
// // import { ThemeProvider, createTheme } from '@mui/material/styles';
// // import CssBaseline from '@mui/material/CssBaseline'; // Add this line

// import AdminSideBar from '../../components/AdminSideBar';


// import Button from '@mui/material/Button';



// const AdminDashboard = () => {
//     const navigate = useNavigate(); // Initialize navigate function
//     const [mode, setMode] = useState('dark'); // Add this line
    

//     // Admin User Management

//     const goToUserManagement = () => {
//         navigate('/admin/UserManagement'); // Make sure the path is correctly defined in your routing setup
//     };





    

//     // const goToSurveyDashboard = () => {
//     //     navigate('/surveydashboard'); 
//     // };

//     // const goToCreateSurveyTemplate = () => {
//     //     navigate('/admin/CreateSurveyTemplate');
//     // };

//     // const goToAdminSurveyDashboard = () => {
//     //     navigate('/admin/surveydashboard');
//     // };

//     // const gotoAddQuestion = () => {
//     //     navigate('/admin/addQuestion')
//     // };

//     // const goToOrganizations = () => {
//     //     navigate('/admin/organizations')
//     // };

//     // const toggleColorMode = () => {
//     //     setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
//     // };

    

//     return (
//         // <div>
//         //     <Button variant="contained" onClick={goToUserManagement}>
//         //         User Management
//         //     </Button>
//         // </div>


//     );
// };

// export default AdminDashboard;


import React from 'react';
import '../../global.css';
// import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../components/AdminSideBar';

const AdminDashboard = () => {

    // const navigate = useNavigate();

    // Your logic here (if any)...

    return (
        <div>
            <AdminSideBar />
            {/* Additional content can go here */}
        </div>

  
    );
};

export default AdminDashboard;
