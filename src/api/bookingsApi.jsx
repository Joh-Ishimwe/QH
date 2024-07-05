import axios from 'axios';

const API_URL = 'https://quickhelp-2.onrender.com/api/v1/Booking';

// Fetch all bookings
export async function fetchBookings() {
  try {
    const response = await axios.get(`${API_URL}/getAllBookings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings');
  }
}

// Fetch a single booking by ID
export async function fetchBooking(id) {
  try {
    const response = await axios.get(`${API_URL}/getBookingById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching booking with id ${id}:`, error.response ? error.response.data : error.message);
    throw new Error(`Failed to fetch booking with id ${id}`);
  }
}

// Add a new booking
export async function addBooking(booking) {
  try {
    const response = await axios.post(`${API_URL}/bookings`, booking, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Server responded with:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw new Error('Failed to add booking');
  }
}

// Delete a booking by ID
export async function deleteBooking(id) {
  try {
    const response = await axios.delete(`${API_URL}/deleteBooking/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Error deleting booking with id ${id}:`, error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    throw new Error(`Failed to delete booking with id ${id}`);
  }
}
