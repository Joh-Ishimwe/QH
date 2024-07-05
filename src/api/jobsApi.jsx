import axios from 'axios';

const API_URL = 'https://quickhelp-2.onrender.com/api/v1/jobs'; // Adjust URL if necessary

// Fetch jobs
export const fetchJobs = async () => {
  try {
    const res = await axios.get(`${API_URL}/getAll`);
    return res.data; // Adjust based on the structure of your API response
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }
};
// Fetch a single job by ID
export const fetchJob = async (id) => {
  try {
    const res = await axios.get(`${"https://quickhelp-2.onrender.com/api/v1/Jobs"}/getByid/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(`Failed to fetch job with id ${id}`);
  }
};
// Add job
export const addJob = async (job) => {
  try {
    const res = await axios.post(`${API_URL}/createJob`, job, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw new Error('Failed to add job');
  }
};

// Update job
export const updateJob = async (id, job) => {
  try {
    const res = await axios.put(`${API_URL}/updateJob/${id}`, job, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error updating job with id ${id}:`, error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw new Error(`Failed to update job with id ${id}`);
  }
};

// Delete job
export const deleteJob = async (id) => {
  // if{window.control('Are you sure you want to delete this ?')}
  try {
    const res = await axios.delete(`${API_URL}/delete/${id}`);
    return res.data; // Adjust based on the structure of your API response
  } catch (error) {
    if (error.response) {
      console.error(`Error deleting job with id ${id}:`, error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw new Error(`Failed to delete job with id ${id}`);
  }
};
