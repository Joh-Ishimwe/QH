import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponentEmployees from './TableComponentEmployees';
import { fetchEmployees, deleteEmployee } from '../api/employeeApi';
import '../styles/employee.css';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const employeesData = await fetchEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error loading employees:', error);
      }
    };
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      console.log('Deleted employee with ID:', id);
      
      if (Array.isArray(employees)) {
        setEmployees(employees.filter((employee) => employee._id !== id));
      } else {
        console.error('Employees state is not an array:', employees);
      }
      
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAddEmployee = () => {
    navigate('/employee/add');
  };

  const handleEdit = (id) => {
    navigate(`/employee/update/${id}`);
  };

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header--title">Employees</h1>
        <button className="add-employee" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>
      <TableComponentEmployees handleDelete={handleDelete} handleEdit={handleEdit} employees={employees} />
    </div>
  );
};

export default EmployeesPage;
