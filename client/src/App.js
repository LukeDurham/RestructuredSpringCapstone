import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/common/HomePage';
import Login from './scenes/Login';
import About from './scenes/common/About';
import Support from './scenes/common/Support';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './ThemeContext';
import Header from './components/Header'


// import Survey from './scenes/survey/Survey';


//admin

//usermanagement import
import UserManagement from './scenes/admin/UserManagement/UserManagement.js';
//User Management component imports
import AssignUserPermissions from './scenes/admin/UserManagement/components/AssignUserPermissions.js';
import AssignUserRole from './scenes/admin/UserManagement/components/AssignUserRole.js';
import CreateAccountPermissions from './scenes/admin/UserManagement/components/CreateAccountPermissions.js';
import CreateUser from './scenes/admin/UserManagement/components/CreateUser.js'
import CreateUserRole from './scenes/admin/UserManagement/components/CreateUserRole.js';






import SurveyManagement from './scenes/admin/SurveyManagement/SurveyManagement.js';

import AddSurveyQuestions from './scenes/survey/alterSurveys/AddSurveyQuestions';
import DeleteQuestionFromSurvey from './scenes/survey/alterSurveys/DeleteQuestionFromSurvey';
import DisplaySurveyResults from './scenes/survey/alterSurveys/DisplaySurveyResults';
import EmailTemplate from './scenes/survey/alterSurveys/EmailTemplate';
import SurveyTypes from './scenes/survey/alterSurveys/SurveyTypes';

import AddQuestionType from './scenes/survey/alterSurveys/AddQuestionType';




import AdminDashboard from './scenes/admin/AdminDashboard';
import SurveyorDashboard from './scenes/survey/SurveyDashboard.js';


import SurveyDashboard from './scenes/Surveyor/SurveyorDashboard.js';
import AddQuestion from './scenes/admin/AddQuestion';
import CreateSurveyTemplate from './scenes/admin/CreateSurveyTemplate';
import CreateSurvey from './scenes/admin/CreateSurvey';
import Logout from './scenes/Logout/index.js';

import OrganizationManagement from './scenes/admin/OrganizationManagement/OrganizationManagement.js';
import AddOrganization from './scenes/admin/OrganizationManagement/components/AddOrganization.js';
import RemoveOrganization from './scenes/admin/OrganizationManagement/components/RemoveOrganization.js';
import EditOrganization from './scenes/admin/OrganizationManagement/components/EditOrganization.js';

import ProjectManagement from './scenes/admin/ProjectManagement/ProjectManagement.js';
import AddProject from './scenes/admin/ProjectManagement/components/AddProject.js';
import RemoveProject from './scenes/admin/ProjectManagement/components/RemoveProject.js';
import EditProject from './scenes/admin/ProjectManagement/components/EditProject.js';



import RespondentDashboard from './scenes/Respondent/RespondentDashboard.js';
import ActiveSurveys from './scenes/Respondent/components/ActiveSurveys';
import TakeSurvey from './scenes/Respondent/components/TakeSurvey';
import MainLayout from './components/NoLoginLayout/index.js';


function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* <Header /> */}
          <Routes>

          {/* MainLayout routes that include the Header */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<About />} />
            <Route path="support" element={<Support />} />
          </Route>
            {/* regular login dashboard for respondents */}
            {<Route path="/surveyordashboard" element={<SurveyDashboard />} /> }
            



            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
            

            {/* usermanagement binding page */}
            <Route path="/admin/user_management" element={<UserManagement />} />

            {/* usermanagement components */}
            
            <Route path="/admin/assign-user-permissions" element={<AssignUserPermissions />} />
            <Route path="/admin/assign-user-role" element={<AssignUserRole />} />
            <Route path="/admin/create-account-permissions" element={<CreateAccountPermissions />} />
            <Route path="/admin/createuser" element={<CreateUser />} />
            <Route path="/admin/createuser-role" element={<CreateUserRole />} />

            


            <Route path="/admin/survey_management" element={<SurveyManagement />} />

            {/* surveymanagment */}
            <Route path="/admin/CreateSurveyTemplate" element={<CreateSurveyTemplate />} />
            <Route path="/admin/addQuestion" element={<AddQuestion />} />
            <Route path="/admin/CreateSurvey" element={<CreateSurvey />} />
            
            
            
            
            {/* organizations */}
            <Route path="/admin/organization_management" element={<OrganizationManagement />} />
            
            
            {/* organization management */}
            <Route path="/admin/organization/add" element={<AddOrganization />} />
            <Route path="/admin/organization/remove" element={<RemoveOrganization />} />
            <Route path="/admin/organization/edit" element={<EditOrganization />} />


            {/* Projects */}
            <Route path="/admin/project_management" element={<ProjectManagement />} />


            {/* project management */}
            <Route path="/admin/project/add" element={<AddProject />} />
            <Route path="/admin/project/remove" element={<RemoveProject />} />
            <Route path="/admin/project/edit" element={<EditProject />} />




          

            {/* Respondent routes */}
            <Route path="/respondent/dashboard" element={<RespondentDashboard />} />
            <Route path="/respondent/activesurveys" element={<ActiveSurveys/>} />
            <Route path="/TakeSurvey/:surveyId" element={<TakeSurvey />} />


            {/* Surveyor routes */}
            {/* <Route path="/surveyor/dashboard" element={<SurveyDashboard />} />*/ }


          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


{/* <Route path="/survey" element={<Survey />} />
        <Route path="/surveydashboard" element={<SurveyDashboard />} />
        <Route path="/add-survey-questions" element={<AddSurveyQuestions />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/add-question-type" element={<AddQuestionType />} />
        <Route path="/delete-question-from-survey" element={<DeleteQuestionFromSurvey />} />
        <Route path="/display-survey-results" element={<DisplaySurveyResults />} />
        <Route path="/email-template" element={<EmailTemplate />} />
        <Route path="/survey-types" element={<SurveyTypes />} /> */}
{/* <Route path="/createrole" element={<CreateRole />} />
        <Route path="/add-survey-template" element={<AddSurveyTemplate />} /> */}