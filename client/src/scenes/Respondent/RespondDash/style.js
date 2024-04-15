import React from 'react';
import './squarebutton.css'; // Import CSS file for styling

const SquareButtons = () => {
  return (
    <div className="square-container">
      <button className="square-button">View Active Surveys</button>
      <button className="square-button">View Past Surveys</button>
    </div>
  );
}

export default SquareButtons;