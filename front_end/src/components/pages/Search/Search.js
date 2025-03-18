import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css"; // Import custom CSS for styling
import SearchTable from "./Components/SearchTable";

const API_URL = "http://localhost:8080/api/trade";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("");
  const [tradeRequests, setTradeRequests] = useState([]);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await axios.get(`${API_URL}/list`);
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

    return filteredData;
  };

  return (
    <div>
      <div className="search-container animate-fadeIn animate-slideIn">
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
        onActionClick={(name, price, energy, distance, tradeType) =>
          alert(
            `Action: ${tradeType === "buy" ? "Buy" : "Sell"}!\nName: ${name}\nPrice: ${price}\nEnergy: ${energy}\nDistance: ${distance}`
          )
        }
      />
    </div>
  );
};

export default Search;