import React from 'react';
import { HiChartPie, HiArrowSmRight, HiCog } from 'react-icons/hi'; // Import HiCog for the settings icon

function Sidebar() {
  return (
    <div className="sidebar">
      <a href="#" className="sidebar-item">
        <HiChartPie /> <span>Dashboard</span>
      </a>
      <a href="#" className="sidebar-item">
        <HiCog /> <span>Settings</span> {/* Settings link */}
      </a>
      <a href="#" className="sidebar-item">
        <HiArrowSmRight /> <span>Logout</span>
      </a>
    </div>
  );
}

export default Sidebar;