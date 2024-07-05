import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, fetchEmployee, updateEmployee } from '../api/employeeApi';
import '../styles/employee.css';

const FormComponentEmployees = () => {
  const { id } = useParams(); // Get the employee ID from the URL if it's an edit operation
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    profilePicture: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idCard: '',
    JobName: 'Housemaid',
    experience: '',
    min_salary: '',
    status: 'Retired',
    dateOfBirth: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          const employeeData = await fetchEmployee(id);
          setEmployee(employeeData); // Populate the state with fetched data for editing
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      };
      fetchEmployeeData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee({ ...employee, profilePicture: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in employee) {
        formData.append(key, employee[key]);
      }
      console.log('Submitting employee data:', formData); // Check the FormData being sent
      if (id) {
        await updateEmployee(id, formData); // Send the FormData for updating
      } else {
        await addEmployee(formData); // Send the FormData for adding
      }
      navigate('/employees', { state: { message: 'Employee saved successfully!' } });
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className='content'>
      <div className='content--header'>
        <h1 className="header--title">{id ? 'Edit Employee' : 'Add Employee'}</h1>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input 
            type="file" 
            id="profilePicture" 
            name="profilePicture" 
            onChange={handleFileChange} 
            accept="image/*"
            required={!id} // Make profile picture required only for adding
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={employee.firstName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={employee.lastName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={employee.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input 
            type="date" 
            id="dateOfBirth" 
            name="dateOfBirth" 
            value={employee.dateOfBirth} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={employee.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="idCard">ID Card</label>
          <input 
            type="text" 
            id="idCard" 
            name="idCard" 
            value={employee.idCard} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="JobName">Job Name</label>
          <input 
            type="text" 
            id="JobName" 
            name="JobName" 
            value={employee.JobName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input 
            type="text" 
            id="experience" 
            name="experience" 
            value={employee.experience} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="min_salary">Min Salary</label>
          <input 
            type="number" 
            id="min_salary" 
            name="min_salary" 
            value={employee.min_salary} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select 
            id="status" 
            name="status" 
            value={employee.status} 
            onChange={handleChange} 
            required 
          >
            <option value="In Progress">Pending</option>
            <option value="Retired">Retired</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default FormComponentEmployees;
