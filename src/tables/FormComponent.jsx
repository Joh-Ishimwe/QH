import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/jobs.css'; // Import CSS file for styling

const FormComponent = ({ handleSave }) => {
  const [JobName, setJobName] = useState("");
  const [Description, setDescription] = useState("");
  const [Picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State variable for loading indicator
  const [successMessage, setSuccessMessage] = useState(""); // State variable for success message
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("JobName", JobName);
    formData.append("Description", Description);
    formData.append("Picture", Picture);

    try {
      setIsLoading(true); // Set loading to true when submitting form
      const response = await axios({
        method: "POST",
        url: "https://quickhelp-2.onrender.com/api/v1/jobs/createJob",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setIsLoading(false); // Set loading to false after successful submission
      setSuccessMessage("Job added successfully!"); // Set success message
      navigate('/jobs'); // Redirect to JobsPage after successful job creation
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="sucess-container">
          <p className="sucess-text">Success !!...</p>
        </div>
      ) : successMessage ? (
        <div className="success-container">
          <p className="success-text">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-group">
            <label htmlFor="picture">Job Picture</label>
            <input
              type="file"
              id="picture"
              name="picture"
              onChange={(e) => setPicture(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Job Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={JobName}
              onChange={(e) => setJobName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default FormComponent;
