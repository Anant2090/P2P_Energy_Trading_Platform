// Import necessary modules
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const BatteryPercentage = () => {
  const [batteryPercentage, setBatteryPercentage] = useState(0);
  const espid = localStorage.getItem('ESPID');

  useEffect(() => {
    const fetchBatteryPercentage = async () => {
      try {
        fetch("http://192.168.18.184/battery")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch battery data");
        return res.json();
      })
      .then((data) => {
        setBatteryPercentage(data.percentage); // access directly here
      })
      .catch((err) => console.log(err.message));

      } catch (error) {
        console.error('Error fetching battery percentage:', error);
      }
      // console.log("Battery Percentage: ", batteryPercentage);
    };

    fetchBatteryPercentage();
    const interval = setInterval(fetchBatteryPercentage, 15000); // Fetch every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['Battery Charge', 'Battery Discharge'],
    datasets: [
      {
        data: [batteryPercentage, 100 - batteryPercentage],
        backgroundColor: ['rgba(0, 200, 0, 1)', 'rgba(255, 0, 0, 1)'],
        
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default BatteryPercentage;