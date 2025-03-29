import React, { useEffect, useState } from 'react';
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

const BatteryUsageChart = () => {
  const [batteryUsage, setBatteryUsage] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        const response = await fetch(
          'https://api.thingspeak.com/channels/2736502/feeds.json?api_key=F3680PI3K5CQPRB0&results=10'
        );
        const json = await response.json();

        const labels = json.feeds.map(feed => new Date(feed.created_at).toLocaleTimeString());
        const data = json.feeds.map(feed => parseInt(feed.field1, 10));

        setBatteryUsage({ labels, data });
      } catch (error) {
        console.error('Error fetching battery data:', error);
      }
    };

    fetchBatteryData();
    const interval = setInterval(fetchBatteryData, 15000); // Fetch every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to determine color dynamically
  const getBatteryColor = (batteryLevel) => {
    if (batteryLevel >= 75) return 'green';
    if (batteryLevel >= 50) return 'yellow';
    return 'red';
  };

  const borderColors = batteryUsage.data.map(level => getBatteryColor(level));
  const backgroundColors = batteryUsage.data.map(level =>
    level >= 75 ? 'rgba(0, 128, 0, 0.2)' : level >= 50 ? 'rgba(255, 165, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'
  );

  const chartData = {
    labels: batteryUsage.labels,
    datasets: [
      {
        data: batteryUsage.data,
        borderColor: borderColors,
        backgroundColor: backgroundColors,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: borderColors,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (context) => `${context.raw}%` },
      },
      title: {
        display: true,
        text: 'Battery Usage Over Time',
        font: { size: 16 },
        color: 'black',
        padding: { top: 10, bottom: 30 },
      },
    },
    scales: {
      x: { grid: { display: false }, title: { display: true, text: 'Time' } },
      y: {
        grid: { display: false },
        min: 0,
        max: 100,
        ticks: { callback: (value) => `${value}%` },
        title: { display: true, text: 'Battery Level' },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default BatteryUsageChart;