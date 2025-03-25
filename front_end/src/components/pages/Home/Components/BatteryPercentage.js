// Import necessary modules
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const BatteryPercentage = () => {
  const [batteryPercentage, setBatteryPercentage] = useState(0);

  useEffect(() => {
    const fetchBatteryPercentage = async () => {
      try {
        const response = await fetch(
          'https://api.thingspeak.com/channels/2736502/fields/1.json?api_key=F3680PI3K5CQPRB0&results=1'
        );
        const json = await response.json();

        // Extract latest battery percentage
        const latestBattery = parseInt(json.feeds[0].field1, 10);
        setBatteryPercentage(latestBattery);
      // console.log("response:", response);

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
    datasets: [
      {
        label: ['Battery Charging', 'Battery Discharge'],
        data: [batteryPercentage, 100 - batteryPercentage],
        backgroundColor: ['rgba(0, 200, 0, 1)', 'rgba(255, 0, 0, 1)'],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default BatteryPercentage;