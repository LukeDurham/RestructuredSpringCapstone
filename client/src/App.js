import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/common/HomePage';
import Login from './scenes/Login';
import About from './scenes/common/About';

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






import AddSurveyQuestions from './scenes/survey/alterSurveys/AddSurveyQuestions';
import CreateSurvey from './scenes/survey/alterSurveys/CreateSurvey';
import DeleteQuestionFromSurvey from './scenes/survey/alterSurveys/DeleteQuestionFromSurvey';
import DisplaySurveyResults from './scenes/survey/alterSurveys/DisplaySurveyResults';
import EmailTemplate from './scenes/survey/alterSurveys/EmailTemplate';
import SurveyTypes from './scenes/survey/alterSurveys/SurveyTypes';

import AddQuestionType from './scenes/survey/alterSurveys/AddQuestionType';



import AdminDashboard from './scenes/admin/AdminDashboard';
 import SurveyorDashboard from './scenes/survey/SurveyDashboard.js';
 import RespondentDashboard from './scenes/Respondent/RespondentDashboard.js';

import SurveyDashboard from './scenes/Surveyor/SurveyorDashboard.js';
import AdminSurveyDashboard from './scenes/admin/AdminSurveyDashboard.js';
import AddQuestion from './scenes/admin/AddQuestion';
import CreateSurveyTemplate from './scenes/admin/CreateSurveyTemplate';
import Logout from './scenes/Logout/index.js';

import Organizations from './scenes/admin/Organizations/Organizations.js';
import AddOrganization from './scenes/admin/Organizations/AddOrganization.js';
import RemoveOrganization from './scenes/admin/Organizations/RemoveOrganization.js';
import EditOrganization from './scenes/admin/Organizations/EditOrganization.js';
import RespondDash from './scenes/Respondent/RespondDash/index.js';


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
    <BrowserRouter>
      <Routes>
        {/* regular login dashboard for respondents */}
         <Route path="/respondentDash" element={<RespondentDashboard />} />
        {<Route path="/surveyordashboard" element={<SurveyDashboard />} /> }
        
        {/*this is a test route*/ }
        {<Route path="/test" element={<RespondDash />} /> }


        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/surveydashboard" element={<AdminSurveyDashboard />} /> 
        
        {/* usermanagement */}
        <Route path="/admin/usermanagement" element={<AdminDashboard />} />

        {/* usermanagement components */}
        <Route path="/admin/assign-user-permissions" element={<AssignUserPermissions />} />
        <Route path="/admin/assign-user-role" element={<AssignUserRole />} />
        <Route path="/admin/create-account-permissions" element={<CreateAccountPermissions />} />
        <Route path="/admin/createuser" element={<CreateUser />} />
        <Route path="/admin/createuser" element={<CreateUserRole />} />

        


        {/* surveymanagment */}
        <Route path="/admin/CreateSurveyTemplate" element={<CreateSurveyTemplate />} />
        <Route path="/admin/addQuestion" element={<AddQuestion />} />
        
        
        
        
        {/* organizations */}
        <Route path="/admin/organizations" exact element={<Organizations />} />
        
        
        {/* organization management */}
        <Route path="/admin/organizations/add" element={<AddOrganization />} />
        <Route path="/admin/organizations/remove" element={<RemoveOrganization />} />
        <Route path="/admin/organizations/edit" element={<EditOrganization />} />


        


        {/* Surveyor routes */}
        {/* <Route path="/surveyor/dashboard" element={<SurveyDashboard />} />*/ }


        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/about" element={<About />} />
        {/* <Route path="/survey" element={<Survey />} /> */}
        {/* <Route path="/surveydashboard" element={<SurveyDashboard />} /> */}
        <Route path="/add-survey-questions" element={<AddSurveyQuestions />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/add-question-type" element={<AddQuestionType />} />
        <Route path="/delete-question-from-survey" element={<DeleteQuestionFromSurvey />} />
        <Route path="/display-survey-results" element={<DisplaySurveyResults />} />
        <Route path="/email-template" element={<EmailTemplate />} />
        <Route path="/survey-types" element={<SurveyTypes />} />
        {/* <Route path="/createrole" element={<CreateRole />} />
        <Route path="/add-survey-template" element={<AddSurveyTemplate />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
