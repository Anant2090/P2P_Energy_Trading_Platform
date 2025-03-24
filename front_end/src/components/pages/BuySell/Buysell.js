import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { getTrades, createTrade } from "../services/tradeService";

const BuySell = () => {
  const [transactionType, setTransactionType] = useState(
    localStorage.getItem("transactionType") || "buy"
  );
  const [formData, setFormData] = useState({
    name: "",
    energy: "",
    price: "",
    distance: "",
  });
  const [errors, setErrors] = useState({});
  const [buyRequests, setBuyRequests] = useState([]);
  const [sellRequests, setSellRequests] = useState([]);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await getTrades();
      const trades = response.data;
      setBuyRequests(trades.filter((trade) => trade.tradeType === "buy"));
      setSellRequests(trades.filter((trade) => trade.tradeType === "sell"));
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
      await createTrade(newTrade);
      fetchTrades();
      setFormData({ name: "", energy: "", price: "", distance: "" });
      alert("Trade request sent!");
    } catch (error) {
      console.error("Error creating trade:", error);
    }
  };

  return (
    <div className="m-2 rounded-lg bg-gray-100 p-4 shadow-lg">
      <div
        className={`p-4 ${
          transactionType === "buy" ? "border-green-500" : "border-red-500"
        } border-2 rounded-lg animate-fadeIn`}
      >
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">
            {transactionType === "buy" ? "Buy Energy" : "Sell Energy"}
          </h2>

          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-6 py-2 rounded-lg font-bold ${
                transactionType === "buy"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTransactionToggle("buy")}
            >
              Buy
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-bold ${
                transactionType === "sell"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTransactionToggle("sell")}
            >
              Sell
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                {transactionType === "buy"
                  ? "Energy Required (kWh):"
                  : "Energy For Sale (kWh):"}
              </label>
              <input
                type="number"
                name="energy"
                value={formData.energy}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter energy amount"
              />
              {errors.energy && (
                <span className="text-red-500 text-sm">{errors.energy}</span>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Price (per kWh):
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter price"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">{errors.price}</span>
              )}
            </div>
            <div>
              <label className="block font-medium text-gray-600">
                Distance Preference (km):
              </label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter preferred distance"
              />
              {errors.distance && (
                <span className="text-red-500 text-sm">{errors.distance}</span>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-lg font-bold text-white ${
                transactionType === "buy" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {transactionType === "buy" ? "Buy" : "Sell"}
            </button>
          </form>
        </div>

        <DataTable
          title={
            transactionType === "buy" ? "Available Sellers" : "Available Buyers"
          }
          data={transactionType === "buy" ? sellRequests : buyRequests}
          actionLabel={transactionType === "buy" ? "Buy" : "Sell"}
        />
      </div>
    </div>
  );
};

export default BuySell;
