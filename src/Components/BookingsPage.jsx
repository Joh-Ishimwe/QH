import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponentBookings from './TableComponentBookings';
import { fetchBookings, deleteBooking } from '../api/bookingsApi';
import '../styles/bookings.css'; 

const BookingsPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const bookings = await fetchBookings();
        setData(bookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
        setData([]); // Ensure data is always an array
      }
    };
    loadBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      setData((prevData) => (Array.isArray(prevData) ? prevData.filter((booking) => booking._id !== id) : []));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="content">
      <div className="content--header">
        <h1 className="header--title">Bookings</h1>
      </div>
      <TableComponentBookings data={data} handleDelete={handleDelete} />
    </div>
  );
};

export default BookingsPage;
