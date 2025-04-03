import React, { useEffect, useState } from "react";
import "./Search.css"; // Import custom CSS for styling
import SearchTable from "./Components/SearchTable";
import { getTrades } from "../services/tradeService";

const Search = () => {

  const Email = localStorage.getItem("userEmail");
  const [searchTerm, setSearchTerm] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");
  const [tradeRequests, setTradeRequests] = useState([]);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await getTrades();
      setTradeRequests(response.data); // Store all trade requests (Buy + Sell)
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  const handleSearch = () => {
    let filteredData = tradeRequests;

    if (searchTerm) {
      filteredData = filteredData.filter((trade) =>
        trade.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (distanceFilter) {
      filteredData = filteredData.filter((trade) =>
        parseFloat(trade.distance) <= parseFloat(distanceFilter)
      );
    }

    filteredData = filteredData.filter((trade) => trade.email !== Email);

    return filteredData;
  };

  return (
    <div>
      <div className="search-container animate-fadeIn">
        {/* Search Section */}
        <div className="search-section">
          <div className="form-group">
            <label htmlFor="farmerName">Farmer Name:</label>
            <input
              type="text"
              id="farmerName"
              name="farmerName"
              placeholder="Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="distance">Distance:</label>
            <input
              type="text"
              id="distance"
              name="distance"
              placeholder="Distance"
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
            />
          </div>

          <button className="search-button" onClick={fetchTrades}>
            Search
          </button>
        </div>
      </div>

      {/* Display filtered Trade Requests */}
      <SearchTable
        title="Trade Requests"
        data={handleSearch()}
      />
    </div>
  );
};

export default Search;