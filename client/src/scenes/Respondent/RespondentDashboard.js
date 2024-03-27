import React from "react";
import Sidebar from '../../components/Sidebar';
import Surveys from '../../components/Surveys'; // Corrected import path
import '../../components/Sidebar.css';
import '../../components/Surveys.css';


function RespondentDashboard() {
  return (
    <div className="respondent-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Surveys />
        <h1>Respondent Dashboard</h1>
      </div>
    </div>
  );
}

export default RespondentDashboard;