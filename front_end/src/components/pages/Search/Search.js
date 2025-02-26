// src/components/pages/Search/Search.js
import React from "react";
import "./Search.css"; // Import custom CSS for styling
import SearchTable from "./Components/SearchTable";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const flag = localStorage.getItem("isNewUser") === "true";
    if (flag) {
      alert("Fill all the data first!");
      navigate("/Profile", { replace: true });
    }
  }, []);

  const framer = [
    {
      name: "Anant",
      price: "$3",
      energy: "10 kWh",
      distance: "2 km",
      trade: "sell",
    },
    {
      name: "Imran",
      price: "$4",
      energy: "15 kWh",
      distance: "3 km",
      trade: "buy",
    },
    {
      name: "Suraj",
      price: "$5",
      energy: "20 kWh",
      distance: "5 km",
      trade: "sell",
    },
    {
      name: "ABC",
      price: "$2",
      energy: "15 Units",
      distance: "1 km",
      trade: "buy",
    },
    {
      name: "XYZ",
      price: "$1",
      energy: "20 Units",
      distance: "0.5 km",
      trade: "buy",
    },
    {
      name: "PRQ",
      price: "$3",
      energy: "5 Units",
      distance: "2 km",
      trade: "sell",
    },
  ];

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
            />
          </div>

          <div className="form-group">
            <label htmlFor="distance">Distance:</label>
            <input
              type="text"
              id="distance"
              name="distance"
              placeholder="Distance"
            />
          </div>

          <button className="search-button ">Search</button>
        </div>
      </div>
      <SearchTable
        title="Farmers"
        data={framer}
        onActionClick={(name, price, energy, distance, trade) =>
          alert(
            `Action: ${
              trade === "buy" ? "Buy" : "Sell"
            }!\nName: ${name}\nPrice: ${price}\nEnergy: ${energy}\nDistance: ${distance}`
          )
        }
      />
    </div>
  );
};

export default Search;
