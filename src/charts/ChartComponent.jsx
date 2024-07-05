// src/charts/ChartComponent.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ChartComponent = ({ type, data, options }) => {
  if (type === 'bar') {
    return <Bar data={data} options={options} />;
  } else if (type === 'pie') {
    return <Pie data={data} options={options} />;
  } else {
    return null;
  }
};

export default ChartComponent;
