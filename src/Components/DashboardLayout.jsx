import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <div className="dashboard--content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
