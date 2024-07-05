import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/employee.css";

const EditEmployeePage = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idCard, setIdCard] = useState('');
  const [JobName, setJobName] = useState('');
  const [experience, setExperience] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [status, setStatus] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [data, setData] = useState([]);
  const { id: employeeId } = useParams(); 
  const navigate = useNavigate();

  const handleFetchById = async () => {
    try {
      const response = await axios.get(`https://quickhelp-2.onrender.com/api/v1/employee/getById/${employeeId}`);
      const employeeData = response.data.data;
      setData(employeeData);
      setFirstName(employeeData.firstName);
      setLastName(employeeData.lastName);
      setEmail(employeeData.email);
      setPhone(employeeData.phone);
      setIdCard(employeeData.idCard);
      setJobName(employeeData.JobName);
      setExperience(employeeData.experience);
      setMinSalary(employeeData.min_salary);
      setStatus(employeeData.status);
      setDateOfBirth(employeeData.dateOfBirth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchById();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = {
      firstName,
      lastName,
      email,
      phone,
      idCard,
      JobName,
      experience,
      min_salary: minSalary,
      status,
      dateOfBirth,
    };
    try {
      await axios.put(`https://quickhelp-2.onrender.com/api/v1/employee/update/${employeeId}`, form);
      navigate('/employees'); // Redirect to employee list or details page after successful update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header--title">Edit Employee</h1>
      </div>
      <form className="edit-employee-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture:</label>
          {profilePicture && (
            <img src={URL.createObjectURL(profilePicture)} alt="Profile" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          )}
          <input type="file" id="profilePicture" name="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} accept="image/*" />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date Of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="idCard">ID Card:</label>
          <input type="text" id="idCard" name="idCard" value={idCard} onChange={(e) => setIdCard(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="JobName">Job Name:</label>
          <input type="text" id="JobName" name="JobName" value={JobName} onChange={(e) => setJobName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience:</label>
          <input type="text" id="experience" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="min_salary">Min Salary:</label>
          <input type="number" id="min_salary" name="min_salary" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="In Progress">In Progress</option>
            <option value="Retired">Retired</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
        <button type="submit" className='save-button'>Save Changes</button>
      </form>
    </div>
  );
};

export default EditEmployeePage;
