import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import '../styles/jobs.css';

const TableComponent = ({ handleDelete, handleEdit }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://quickhelp-2.onrender.com/api/v1/jobs/getAll");
        console.log(response.data);
        if (response.data && response.data.jober) {
          setJobs(response.data.jober);
        } else {
          setJobs([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setJobs([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(jobs.length / itemsPerPage); i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-4 py-2 mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="table-container">
      {isLoading ? (
        <div className="loading-container">
          <p className="loading-text">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Picture</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modify</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((job, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={job.Picture.url} alt="Job" className="profile-picture"/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.JobName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                        <div className="text-sm text-gray-900">{job.Description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium gap-4">
                        <div className='flex gap-5'>
                          <button className="p-2" onClick={() => handleEdit(job._id)}>
                            <FaEdit />
                          </button>
                          <button className="p-2" onClick={() => handleDelete(job._id)}>
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination py-2">
                {renderPageNumbers()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
