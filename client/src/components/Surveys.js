import React from 'react';
import './Surveys.css'; // Ensure this file is linked correctly for styles

function Surveys() {
  const surveys = [
    { id: 1, name: 'Customer Satisfaction', responses: 150, totalRespondents: 200 },
    { id: 2, name: 'Product Feedback', responses: 89, totalRespondents: 120 },
    { id: 3, name: 'Website Usability', responses: 102, totalRespondents: 150 },
    { id: 4, name: 'Service Quality', responses: 134, totalRespondents: 180 },
  ];

  return (
    <div className="surveys">
      <h2>Active Surveys</h2>
      <div className="surveys-grid">
        {surveys.map((survey) => (
          <div key={survey.id} className="survey-box">
            <h3>{survey.name}</h3>
            <p>ID: {survey.id}</p>
            <p>Responses: {survey.responses}</p>
            <p>Total Respondents: {survey.totalRespondents}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Surveys;
