import React, { useEffect } from "react";
import BatteryUsageChart from "./Components/BatteryUsage";
import NewRequest from "./Components/NewRequest";
import BatteryPercentage from "./Components/BatteryPercentage";
import "./Home.css";
import DataTable from "./Components/HistoryTable";
import { useNavigate } from "react-router-dom";
import { getUserRequest } from "../services/requestService";
import { useState } from "react";
import MyRequestTrade from "./Components/MyRequestTrade";
const Home = () => {
  const navigate = useNavigate();
  const [userRequest, setUserRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await getUserRequest(localStorage.getItem("userEmail"));
      const Requests = response.data;
      setUserRequests(Requests);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  useEffect(() => {
    const flag = localStorage.getItem("isNewUser") === "true";
    if (flag) {
      alert("Fill all the data first!");
      navigate("/Profile", { replace: true });
    }
    fetchRequests();
  }, [userRequest]);

  const History = [
    { id: 1, name: "Anant", trade: "Sell" },
    { id: 2, name: "Imran", trade: "Buy" },
    { id: 3, name: "Suraj", trade: "Buy" },
    { id: 1, name: "Anant", trade: "Sell" },
    { id: 2, name: "Imran", trade: "Buy" },
    { id: 3, name: "Suraj", trade: "Buy" },
    { id: 1, name: "Anant", trade: "Sell" },
    { id: 2, name: "Imran", trade: "Buy" },
    { id: 3, name: "Suraj", trade: "Buy" },
  ];

  // Data for Battery Usage Chart
  const Battery_Usage_data = {
    label: ["07:00", "15:00", "23:00", "Now"],
    data: [80, 40, 60, 50],
  };

  // Data for Battery Percentage
  const Battery_Percentage_data = "75";

  return (
    <div className="home-container inset-0 z-50 animate-fadeIn">
      <div className="battery-container rounded-lg ">
        <div className="battery-percentage">
          <BatteryPercentage Battety_percentage={Battery_Percentage_data} />
        </div>
        <div className="battery-usage   bg-[#faf9fa89] p-2 rounded-md pt-5">
          <BatteryUsageChart Battery_Usage={Battery_Usage_data} />
        </div>
      </div>
      <div>
        <div className="new-request-container h-auto bg-[#faf9fac2] ">
          {userRequest &&
            userRequest.length > 0 &&
            userRequest.map((request) => (
              <div className="new-requests">
                <h2>New Request</h2>
                <NewRequest
                  key={request.sellEmail}
                  sellerName={request.sellerName}
                  price={request.price}
                  energy={request.energy}
                />
              </div>
            ))}

          <MyRequestTrade />
          <div className="request-history-container bg-[#faf9fac2] ">
            <DataTable title={"History Table"} data={History} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
