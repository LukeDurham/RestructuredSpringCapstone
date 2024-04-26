// import React, { useState } from 'react';
// import '../../../global.css'
// import AppAppBar from '../../../components/AppAppBar';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline'; // Add this line
// import getLPTheme from '../../../getLPTheme';

// const EmailTemplates = () => {
//     const [template, setTemplate] = useState('');
//     const [mode, setMode] = useState('dark'); // Add this line
//     const LPtheme = createTheme(getLPTheme(mode)); // Add this line

//     const handleTemplateChange = (e) => {
//         setTemplate(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle submission logic here (e.g., sending template to the server)
//         console.log('Email Template:', template);
//         // Reset form after submission
//         setTemplate('');
//     };

//     const toggleColorMode = () => {
//         setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
//     };

//     return (
//         <ThemeProvider theme={LPtheme}>
//             <CssBaseline />
//             <div>
//                 <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
//                 <div className='wrapper'>
//                     <h2>Email Templates</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className='options'>
//                             <label>Email Template:</label>
//                             <textarea value={template} onChange={handleTemplateChange} required />
//                         </div>
//                         <button type="submit">Save Template</button>
//                     </form>
//                 </div>
//             </div>
//         </ThemeProvider>
//     );
// };

// export default EmailTemplates;
