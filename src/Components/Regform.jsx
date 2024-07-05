import React, { useState, useEffect } from "react";
import axios from "axios";

const Regform = () => {

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [address,setAddress] = useState('');
  const [job,setJob] = useState('');
  const [email,setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [id,setId] = useState('');
  const [min_salary,setMin_salary] = useState('');
  const [profilePicture,setProfilePicture] = useState('');
  const [dateOfBirth,setDateOfBirth] = useState('');
  const [experience, setExperience] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://quickhelp-2.onrender.com/api/v1/employee/add",
        {
          firstName: firstName,
          lastName: lastName,
          email: email ,
          phone: phoneNumber,
          address: "",
          idCard: id,
          dateOfBirth: dateOfBirth,
          JobName: job,
          experience: experience,
          min_salary: min_salary,
          profilePicture: profilePicture,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
      setError("An error occurred during register. Please try again.");
    }
  };
  return (
    <div className="mt-10 p-5">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-lg"
      >
        <p className="text-center text-yellow-500 text-lg font-medium">
          Employee Registration Form
        </p>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            FirstName:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            LastName:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Job:
          </label>
          <input
            type="text"
            id="job"
            name="job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="idNumber"
            className="block text-sm font-medium text-gray-700"
          >
            ID Number:
          </label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="work experience"
            className="block text-sm font-medium text-gray-700"
          >
            Work experince:
          </label>
          <input
            type="text"
            id="workexperince"
            name="workexperince"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dateofbirth"
            className="block text-sm font-medium text-gray-700"
          >
            Date of birth:
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="min salary"
            className="block text-sm font-medium text-gray-700"
          >
           Min_salary:
          </label>
          <input
            type="text"
            value={min_salary}
            onChange={(e) => setMin_salary(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>


        <div className="mb-4">
          <label
            htmlFor="dateofbirth"
            className="block text-sm font-medium text-gray-700"
          >
            Profile:
          </label>
          <input
            type="file"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
        
          className="w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Regform;
