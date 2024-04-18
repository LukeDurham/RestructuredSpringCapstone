// // import React from "react";
 
//  import Surveys from '../../components/Surveys'; // Corrected import path
//  import React, { useState } from "react";
//  import SurvAppBar from '../../components/SurveyorAppBar'; // Import the RespondentAppBar component
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline'; // Add this line
// import getLPTheme from '../../getLPTheme';


//  function SurveyorDashboard() {

//   const [mode, setMode] = useState('dark'); // Add this line
//     const LPtheme = createTheme(getLPTheme(mode)); // Add this line

//     const toggleColorMode = () => {
//         setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
//     };

//    return (
//     <ThemeProvider theme={LPtheme}>
//       <CssBaseline/>
//      <div className="respondent-dashboard">
//      <SurvAppBar mode={mode} toggleColorMode={toggleColorMode} />
//        <div className="dashboard-content">
//          <Surveys />
//          <h1>Surveyor Dashboard</h1>
//        </div>
//      </div>
//      </ThemeProvider>

//    );
//  }

//  export default SurveyorDashboard;
