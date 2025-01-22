// Import necessary modules
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components

ChartJS.register(ArcElement, Tooltip, Legend);

const BatteryPercentage = ({ Battety_percentage }) => {
  // Example battery usage data
  const Battery_percentage_int = parseInt(Battety_percentage);
  const data = {
    datasets: [
      {
        label: ["Battery Charging", "Battery Discharge"],
        data: [Battery_percentage_int, 100 - Battery_percentage_int],
        backgroundColor: [
          "rgba(0, 200, 0, 1)", // Solid green
          "rgba(255, 0, 0, 1)", // White (unchanged) // White (unchanged)
        ],
      },
    ],
  };

  const options = {};

  return <Doughnut data={data} options={options} />;
};

export default BatteryPercentage;
