import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Employee = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState('');
  const [showFew, setShowFew] = useState(true);

  const handleFetch = async () => {
    try {
      const response = await axios.get("https://quickhelp-2.onrender.com/api/v1/employee/get", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSelectedJob = (event) => {
    setSelectedJob(event.target.value);
  };

  const uniqueJobs = [...new Set(data.map(employee => employee.JobName))];

  const filteredData = selectedJob
    ? data.filter((employee) => employee.JobName === selectedJob)
    : data;


  const initialDisplayCount = showFew ? 4 : filteredData.length;

  return (
    <div className="bg-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <h4 className="text-4xl font-bold mb-4 text-[#0b1957]">Our employees:</h4>
          <select className="border rounded-md w-auto m-1" onChange={handleSelectedJob}>
            <option value="">All</option>
            {uniqueJobs.map((job, index) => (
              <option key={index} value={job}>{job}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredData.slice(0, initialDisplayCount).map((employee, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
            >
              <div className="flex justify-center">
                <img
                  alt=""
                  src={employee.profilePicture.url}
                  className="h-56 w-56 object-cover rounded-full"
                />
              </div>
              <div className="p-3 text-sm flex-col gap-1">
                <p>FirstName: {employee.firstName}</p>
                <p>LastName: {employee.lastName}</p>
                <p>Job: {employee.JobName}</p>
                <p>Experience: {employee.experience}</p>
                <p>Date of birth: {employee.dateOfBirth}</p>
                <p>Min_salary: {employee.min_salary}</p>
                <p>Status: {employee.status}</p>
                <div onClick={() => navigate(`/book/${employee._id}`, { state: { employee } })}>
                  <button className="bg-blue-400 rounded flex text-white p-2 mt-5">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showFew && (
          <h4 className="text-[#114a6e] rounded flex justify-center  text-2xl p-2 mt-5 cursor-pointer" onClick={() => setShowFew(false)}>
            Show More
          </h4>
        )}
        {!showFew && (
          <h4 className="text-[#114a6e] rounded flex justify-center text-2xl p-2 mt-5 cursor-pointer" onClick={() => setShowFew(true)}>
            Show Fewer
          </h4>
        )}
        <button className="bg-[#114a6e] rounded flex justify-center text-white p-2 mt-5">
          <Link to="/register">Register as employee</Link>
        </button>
      </div>
    </div>
  );
};

export default Employee;
