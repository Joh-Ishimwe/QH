import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormComponent from '../tables/FormComponent';
import { addJob, updateJob } from '../api/jobsApi'; // Assuming there's an API function to fetch a single job

const AddEditJobPage = () => {
  const { _id } = useParams(); // Using _id instead of id
  const navigate = useNavigate();
  const [job, setJob] = useState({ picture: '', name: '', description: '' });

  useEffect(() => {
    const loadJob = async () => {
      if (_id) {
        try {
          const jobData = await fetchJob(_id); 
          setJob(jobData);
        } catch (error) {
          console.error('Error loading job:', error);
        }
      }
    };
    loadJob();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJob({ ...job, picture: file });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (_id) {
        await updateJob(_id, job); // Using _id for existing job
      } else {
        await addJob(job);
      }
      navigate('/jobs', { state: { message: 'Job saved successfully!' } });
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div className='content'>
      <div className='content--header'>
        <h1 className='header--title'>{_id ? 'Edit Job' : 'Add Job'}</h1> {/* Using _id */}
      </div>
      <FormComponent 
        job={job} 
        handleChange={handleChange} 
        handleFileChange={handleFileChange} 
        handleSave={handleSave} 
      />
    </div>
  );
};

export default AddEditJobPage;
