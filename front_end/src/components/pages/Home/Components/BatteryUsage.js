// Import necessary modules
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const BatteryUsageChart = ({ Battery_Usage }) => {
  // Example battery usage data
  const data = {
    labels: Battery_Usage.label, // X-axis labels
    datasets: [
      {
        data: Battery_Usage.data, // Y-axis data points
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        tension: 0.4, // Curvature of the line
        pointRadius: 2,
        pointBackgroundColor: 'green',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
      title: {
        display: true, // Show the title
        text: 'Battery Usage Over Time', // Title text
        font: {
          size: 16, // Title font size
        },
        color: 'black', // Title color
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        grid: {
          display: false,
        },
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: 'Battery Level',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default BatteryUsageChart;
