import React from 'react';
import "./App.css";

const DashboardWrapper = ({ children }) => {
  return (
    <div className="dashboard">
      <div className="dashboard--content">
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
