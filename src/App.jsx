import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import EmployeesPage from './Components/EmployeesPage';
import JobsPage from './Components/JobsPage';
import DashBoardPage from './Components/DashBoardPage';
import BookingsPage from './Components/BookingsPage';
import AuthPages from './Components/AuthPages';
import AddEditJobPage from './Components/AddEditJobPage';
import FormComponentEmployees from './Components/FormComponentEmployees';
import EditEmployeePage from './Components/EditEmployeePage';
import EditJobPage from './Components/EditJobPage';
import Home from './Components/Home';
import About from './Components/About';
import Layout from './Components/Layout';
import Contact from './Components/Contact';
import Signin from './Components/auth/Signin';
import Signup from './Components/auth/Signup';
import Reset from './Components/auth/Reset';
import Confirmation from './Components/auth/Confirmation';
import Booking from './Components/Booking';
import Employee from './Components/Employee';
import DashboardLayout from './Components/DashboardLayout';
import './App.css';
import Profile from './Components/Profile';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/setnew" element={<Reset />} />
            <Route path="/confirm" element={<Confirmation />} />
            <Route path="/book" element={<Booking />} />
            <Route path='/profile' element={<Profile/>} />
          </Route>

          <Route path="/" element={<AuthPages />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<DashBoardPage />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="employee/add" element={<FormComponentEmployees />} />
              <Route path="employee/update/:id" element={<EditEmployeePage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="jobs/add" element={<AddEditJobPage />} />
              <Route path="jobs/updateJob/:id" element={<EditJobPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="*" element={<Navigate to="/signin" />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
