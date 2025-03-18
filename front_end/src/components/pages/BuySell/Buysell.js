import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./DataTable";
import "./BuySell.css";

const API_URL = "http://localhost:8080/api/trade";

const BuySell = () => {
  const [transactionType, setTransactionType] = useState(
    localStorage.getItem("transactionType") || "buy"
  );
  const [formData, setFormData] = useState({ name: "", energy: "", price: "", distance: "" });
  const [errors, setErrors] = useState({});
  const [buyRequests, setBuyRequests] = useState([]);
  const [sellRequests, setSellRequests] = useState([]);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await axios.get(`${API_URL}/list`);
      const trades = response.data;
      setBuyRequests(trades.filter(trade => trade.tradeType === "buy"));
      setSellRequests(trades.filter(trade => trade.tradeType === "sell"));
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  const handleTransactionToggle = (type) => {
    setTransactionType(type);
    localStorage.setItem("transactionType", type);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.energy) newErrors.energy = "Energy is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.distance) newErrors.distance = "Distance is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTrade = {
      name: formData.name,
      price: formData.price,
      energy: formData.energy,
      distance: formData.distance,
      tradeType: transactionType,
    };

    try {
      await axios.post(`${API_URL}/create`, newTrade);
      fetchTrades();
      setFormData({ name: "", energy: "", price: "", distance: "" });
      alert("Trade request sent!");
    } catch (error) {
      console.error("Error creating trade:", error);
    }
  };

  return (
    <div className="m-2 rounded-lg bg-[#faf9faaa]">
      <div className={`buy-sell-container ${transactionType} animate-fadeIn animate-slideIn`}>
        <div className="buy-sell-section bg-[#faf9fa0f]">
          <h2 className="title">{transactionType === "buy" ? "Buy Energy" : "Sell Energy"}</h2>

          <div className="transaction-toggle">
            <button
              className={`toggle-button ${transactionType === "buy" ? "active-buy" : ""}`}
              onClick={() => handleTransactionToggle("buy")}
            >
              Buy
            </button>
            <button
              className={`toggle-button ${transactionType === "sell" ? "active-sell" : ""}`}
              onClick={() => handleTransactionToggle("sell")}
            >
              Sell
            </button>
          </div>

          <form className="transaction-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>
            <label>
              {transactionType === "buy" ? "Energy Required (kWh):" : "Energy For Sale (kWh):"}
              <input type="number" name="energy" value={formData.energy} onChange={handleInputChange} placeholder="Enter energy amount" />
              {errors.energy && <span className="error">{errors.energy}</span>}
            </label>
            <label>
              Price (per kWh):
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter price" />
              {errors.price && <span className="error">{errors.price}</span>}
            </label>
            <label>
              Distance Preference (km):
              <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} placeholder="Enter preferred distance" />
              {errors.distance && <span className="error">{errors.distance}</span>}
            </label>
            <button type="submit" className={`submit-button ${transactionType}-button`}>
              {transactionType === "buy" ? "Buy" : "Sell"}
            </button>
          </form>
        </div>

        {/* Tables Section */}
        <DataTable
          title={transactionType === "buy" ? "Available Sellers" : "Available Buyers"}
          data={transactionType === "buy" ? sellRequests : buyRequests}
          actionLabel={transactionType === "buy" ? "Buy" : "Sell"}
          onActionClick={(name, price, energy, distance) =>
            alert(`Action: ${transactionType === "buy" ? "Buy" : "Sell"}!\nName: ${name}\nPrice: ${price}\nEnergy: ${energy}\nDistance: ${distance}`)
          }
        />
      </div>
    </div>
  );
};

export default BuySell;
