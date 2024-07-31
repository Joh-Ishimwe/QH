import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    if (!data) {
      console.error('No data found in location state');
    } else {
      console.log('Data:', data);
    }
  }, [data]);

  const [formData, setFormData] = useState({
    Name: '',
    address: '',
    Email: '',
    phoneNumber: '',
    numberOfPeopleAtHome: '',
    idCard: '',
    additionalInfo: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const clearForm = () => {
    setFormData({
      Name: '',
      address: '',
      Email: '',
      phoneNumber: '',
      numberOfPeopleAtHome: '',
      idCard: '',
      additionalInfo: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.idCard.length !== 16) {
      setError('ID card number must be 16 characters long.');
      return;
    }
    console.log('Submitting form with data:', formData);
    try {
      const response = await axios.post(`https://qh-backend.onrender.com/api/v1/Booking/bookings/${data || 'defaultId'}`, formData);
      console.log('Server response:', response.data);
      clearForm();
      setSuccess(true);
      setError('');
    } catch (error) {
      console.error('There was an error submitting the form!', error.response || error);
      setError('There was an error submitting the form.');
    }
  };

  return (
    <div className='mt-10 p-5'>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-lg">
        <p className="text-center text-yellow-500 text-lg font-medium">Employer Book Form</p>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
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
          <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
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
          <label htmlFor="idCard" className="block text-sm font-medium text-gray-700">ID Number:</label>
          <input
            type="text"
            id="idCard"
            name="idCard"
            value={formData.idCard}
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
        {success && <div className="p-4 mt-4 rounded bg-green-200 text-green-700 font-bold">Booking successfully!!</div>}
        {error && <div className="p-4 mt-4 rounded bg-red-200 text-red-700 font-bold">{error}</div>}
      </form>
    </div>
  );
};

export default Booking;
