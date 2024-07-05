import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  MdOutlineWork } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import { TbBrandBooking } from "react-icons/tb";
import axios from 'axios';
import '../styles/content.css';

export const apiUrls = {
  jobs: 'https://quickhelp-2.onrender.com/api/v1/jobs/getAll',
  workers: 'https://quickhelp-2.onrender.com/api/v1/employee/get',
  bookings: 'https://quickhelp-2.onrender.com/api/v1/Booking/getAllBookings', // Example URL for contact
};


const Card = () => {
  const [totalJobCount, setTotalJobCount] = useState(null);
  const [totalEmployeesCount, setEmployeeCount] = useState(null);
  const [totalBookingsCount, setTotalBookingsCount] = useState(null);

  useEffect(() => {
    const fetchTotalJobCount = async () => {
      try {
        console.log('Fetching jobs from URL:', apiUrls.jobs);
        const response = await axios.get(apiUrls.jobs);
        console.log('Job response:', response);
        if (response.data && response.data.totalCount !== undefined) {
          setTotalJobCount(response.data.totalCount);
        } else {
          throw new Error('Failed to fetch total job count');
        }
      } catch (error) {
        console.error('Error fetching total job count:', error);
      }
    };

    fetchTotalJobCount();
  }, []);

  useEffect(() => {
    const fetchEmployeesCount = async () => {
      try {
        console.log('Fetching employees from URL:', apiUrls.workers);
        const response = await axios.get(apiUrls.workers);
        console.log('Employee response:', response);
        if (response.data && response.data.totalCount !== undefined) {
          setEmployeeCount(response.data.totalCount);
        } else {
          throw new Error('Failed to fetch total employees count');
        }
      } catch (error) {
        console.error('Error fetching total employees count:', error);
      }
    };

    fetchEmployeesCount();
  }, []);
  useEffect(() => {
    const fetchTotalBookingsCount = async () => {
      try {
        console.log('Fetching bookings from URL:', apiUrls.bookings);
        const response = await axios.get(apiUrls.bookings);
        console.log('Bookings response:', response);
        if (response.data && response.data.totalCount !== undefined) {
          setTotalBookingsCount(response.data.totalCount);
        } else {
          throw new Error('Failed to fetch total bookings count');
        }
      } catch (error) {
        console.error('Error fetching total bookings count:', error);
      }
    };

    fetchTotalBookingsCount();
  }, []);

  const courses = [
    {
      title: 'Jobs',
      icon: <MdOutlineWork />,
      path: '/jobs',
      totalCount: totalJobCount,
    },
    {
      title: 'Employees',
      icon: <HiUserGroup />,
      path: '/employees',
      totalCount: totalEmployeesCount,
    },
    {
      title: 'Bookings',
      icon: <TbBrandBooking />,
      path: '/bookings',
      totalCount: totalBookingsCount,
    },
  ];

  return (
    <div className="card-container">
      {courses.map((item, index) => (
        <Link to={item.path} key={index} className="card-link">
          <div className="card">
            <div className="card--cover">{item.icon}</div>
            <div className="card--title">
              <h2>{item.title}</h2>
              {item.totalCount !== null && <p>Total Count: {item.totalCount}</p>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
