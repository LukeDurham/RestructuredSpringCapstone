import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/common/HomePage';
import Login from './scenes/Login';
import About from './scenes/common/About';

// import Survey from './scenes/survey/Survey';

import AddSurveyQuestions from './scenes/survey/alterSurveys/AddSurveyQuestions';
import CreateSurvey from './scenes/survey/alterSurveys/CreateSurvey';
import DeleteQuestionFromSurvey from './scenes/survey/alterSurveys/DeleteQuestionFromSurvey';
import DisplaySurveyResults from './scenes/survey/alterSurveys/DisplaySurveyResults';
import EmailTemplate from './scenes/survey/alterSurveys/EmailTemplate';
import SurveyTypes from './scenes/survey/alterSurveys/SurveyTypes';
import CreateUser from './scenes/admin/CreateUser'
import AddQuestionType from './scenes/survey/alterSurveys/AddQuestionType';
import CreateRole from './scenes/admin/CreateRole';
import AssignUserRole from './scenes/admin/AssignUserRole';
import Permissions from './scenes/admin/Permissions';
import AdminDashboard from './scenes/admin/AdminDashboard';
 import SurveyorDashboard from './scenes/survey/SurveyDashboard.js';
 import RespondentDashboard from './scenes/Respondent/RespondentDashboard.js';
import AccountPermissions from './scenes/admin/AccountPermissions.js';
import SurveyDashboard from './scenes/Surveyor/SurveyorDashboard.js';
import AdminSurveyDashboard from './scenes/admin/AdminSurveyDashboard.js';
import AddQuestion from './scenes/admin/AddQuestion';
import CreateSurveyTemplate from './scenes/admin/CreateSurveyTemplate';
import Logout from './scenes/Logout/index.js';

import Organizations from './scenes/admin/Organizations/Organizations.js';
import AddOrganization from './scenes/admin/Organizations/AddOrganization.js';
import RemoveOrganization from './scenes/admin/Organizations/RemoveOrganization.js';
import EditOrganization from './scenes/admin/Organizations/EditOrganization.js';


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
        



        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/assign-user-role" element={<AssignUserRole />} />
        <Route path="/admin/user-permissions" element={<Permissions />} />
        <Route path="/admin/create-account-permissions" element={<AccountPermissions />} />
        <Route path="/admin/createuser" element={<CreateUser />} />
        <Route path="/admin/surveydashboard" element={<goToAdminSurveyDashboard />} /> */}
        <Route path="/admin/addQuestion" element={<AddQuestion />} />
        <Route path="/admin/CreateSurveyTemplate" element={<CreateSurveyTemplate />} />

        <Route path="/admin/organizations" exact element={<Organizations />} />
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
