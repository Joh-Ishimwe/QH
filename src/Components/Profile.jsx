// Components/Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idCard, setIdCard] = useState("");
  const [JobName, setJobName] = useState("");
  const [experience, setExperience] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [status, setStatus] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("userId");

  const handleFetchById = async () => {
    try {
      const response = await axios.get(
        `https://quickhelp-2.onrender.com/api/v1/employee/getById/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const employeeData = response.data.data;
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
      navigate('/signin'); // Redirect to signin if there is an error
    }
  };

  useEffect(() => {
    if (!employeeId) {
      navigate('/signin'); // Redirect to signin if user is not authenticated
    } else {
      handleFetchById();
    }
  }, [employeeId, navigate]);

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
      await axios.put(
        `https://quickhelp-2.onrender.com/api/v1/employee/update/${employeeId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      navigate("/profile");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="content p-4 mt-5">
      <div className="content--header">
        <h1 className="header--title text-2xl font-bold mb-4">Edit Employee</h1>
      </div>
      <div className="profile-container flex flex-col lg:flex-row justify-between">
        <form
          className="edit-employee-form w-2/3 lg:w-2/3 mb-4 lg:mb-0 lg:mr-4"
          onSubmit={handleUpdate}
        >
          <div className="form-group mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Profile Picture:
            </label>
            {profilePicture && (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile"
                className="block mb-2 max-w-full max-h-48"
              />
            )}
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              accept="image/*"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
          <div className="form-group mb-4 flex space-x-2">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="idCard"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              ID Card:
            </label>
            <input
              type="text"
              id="idCard"
              name="idCard"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="JobName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Job Name:
            </label>
            <input
              type="text"
              id="JobName"
              name="JobName"
              value={JobName}
              onChange={(e) => setJobName(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Experience:
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="minSalary"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Minimum Salary:
            </label>
            <input
              type="text"
              id="minSalary"
              name="minSalary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status:
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg p-2 mt-2"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
