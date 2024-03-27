import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './common/HomePage';
import Login from './common/Login';
import About from './common/About';
import Survey from './survey/Survey';
import SurveyDashboard from './survey/SurveyDashboard';
import AddSurveyQuestions from './survey/alterSurveys/AddSurveyQuestions';
import CreateSurvey from './survey/alterSurveys/CreateSurvey';
import DeleteQuestionFromSurvey from './survey/alterSurveys/DeleteQuestionFromSurvey';
import DisplaySurveyResults from './survey/alterSurveys/DisplaySurveyResults';
import EmailTemplate from './survey/alterSurveys/EmailTemplate';
import SurveyTypes from './survey/alterSurveys/SurveyTypes';
import CreateUser from './features/user/CreateUser';
import AddQuestionType from './survey/alterSurveys/AddQuestionType';
import AddSurveyTemplate from './survey/alterSurveys/SurveyTemplate/AddSurveyTemplate';
import CreateRole from './features/user/CreateRole';
import AssignUserRole from './features/Admin/AssignUserRole';
import Permissions from './features/Admin/Permissions';
import Dashboard from './common/Dashboard';
import AdminDashboard from './features/Admin/AdminDashboard';
import SurveyorDashboard from './features/Surveyor/SurveyorDashboard';

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
        <Route path="/dashboard" element={<Dashboard />} />



        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/assign-user-role" element={<AssignUserRole />} />
        <Route path="/admin/user-permissions" element={<Permissions />} />



        {/* Surveyor routes */}
        <Route path="/surveyor/dashboard" element={<SurveyorDashboard />} />


        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/about" element={<About />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/surveydashboard" element={<SurveyDashboard />} />
        <Route path="/add-survey-questions" element={<AddSurveyQuestions />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/add-question-type" element={<AddQuestionType />} />
        <Route path="/delete-question-from-survey" element={<DeleteQuestionFromSurvey />} />
        <Route path="/display-survey-results" element={<DisplaySurveyResults />} />
        <Route path="/email-template" element={<EmailTemplate />} />
        <Route path="/survey-types" element={<SurveyTypes />} />
        <Route path="/createrole" element={<CreateRole />} />
        <Route path="/add-survey-template" element={<AddSurveyTemplate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
