import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addEmployee, updateEmployee, fetchEmployees, deleteEmployee } from '../api/employeeApi'; // Assuming you have a deleteEmployee function in your API
import FormComponentEmployees from './FormComponentEmployees';
import '../styles/employee.css';

const AddEditWorkerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    profilePicture: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idCard: '',
    JobName: '',
    experience: '',
    min_salary: '',
    status: '',
    dateOfBirth: '',
  });
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const fetchedEmployees = await fetchEmployees();
        setEmployees(fetchedEmployees);
      } catch (error) {
        console.error('Error loading employees:', error);
      }
    };
    loadEmployees();
  }, []);

  useEffect(() => {
    if (id) {
      const employeeToEdit = employees.find((e) => e._id === id);
      if (employeeToEdit) setEmployee(employeeToEdit);
    }
  }, [id, employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, profilePicture: e.target.files[0] });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateEmployee(id, employee);
      } else {
        await addEmployee(employee);
      }
      navigate('/employee');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteEmployee(id);
      navigate('/employee');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Employee' : 'Add Employee'}</h1>
      <FormComponentEmployees
        employee={employee}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSave={handleSave}
        isLoading={isLoading}
      />
      {id && (
        <button className="delete-button" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete Employee'}
        </button>
      )}
    </div>
  );
};

export default AddEditWorkerPage;
