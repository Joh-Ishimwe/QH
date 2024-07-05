import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    numberOfPeopleAtHome: '',
    idNumber: '',   
    additionalInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://quickhelp-2.onrender.com/api/v1/Booking/', {
        ...formData,
        id: data.id
      });
      console.log(response.data);
      setFormData({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        numberOfPeopleAtHome: '',
        idNumber: '',
        additionalInfo: '',
      });
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className='mt-10 p-5'>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-lg">
        <p className="text-center text-yellow-500 text-lg font-medium">Employer Book Form</p>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="numberOfPeopleAtHome" className="block text-sm font-medium text-gray-700">Number of People at Home:</label>
          <input
            type="number"
            id="numberOfPeopleAtHome"
            name="numberOfPeopleAtHome"
            value={formData.numberOfPeopleAtHome}
            onChange={handleChange}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional Information:</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="bg-gray-100 w-full rounded-lg border-gray-200 p-4 text-black-400 pe-12 text-sm shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Booking;
