import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateJob } from '../api/jobsApi';
import axios from 'axios';
import "../styles/jobs.css";

const EditJobPage = () => {
  const [JobName, setJobName] = useState('');
  const [Description, setDescription] = useState('');
  const [Picture, setPicture] = useState('');
  const [data, setData] = useState([]);
  const { id: jobId } = useParams();
  const navigate = useNavigate();


  const handleFetchById = async () => {
    try {
      const response = await axios.get(`https://quickhelp-2.onrender.com/api/v1/Jobs/getById/${jobId}`);
      const jobData = response.data.data;
      setData(jobData);
      setJobName(jobData.JobName);
      setDescription(jobData.Description);
      setPicture(jobData.Picture);
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
      JobName,
      Description,
      Picture,
    };
      try {
        await axios.put(`https://quickhelp-2.onrender.com/api/v1/jobs/updateJob/${jobId}`, form);
        navigate('/jobs'); // Redirect to employee list or details page after successful update
      } catch (error) {
        console.error('Error updating job:', error);
      }
    };

  return (
    <form onSubmit={handleUpdate} className="job-form">
      <div className="form-group">
        <label htmlFor="picture">Job Picture</label>
        <input
          type="file"
          id="picture"
          name="Picture"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Job Name</label>
        <input
          type="text"
          id="name"
          name="JobName"
          value={JobName}
          onChange={(e) => setJobName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="save-button">Update Job</button>
    </form>
  );
};

export default EditJobPage;
