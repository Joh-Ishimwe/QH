import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/sidebar.css'
import '../styles/layout.css' 

const AuthPages = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthPages
