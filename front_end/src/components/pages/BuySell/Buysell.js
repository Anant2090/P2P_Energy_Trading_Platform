import React, { useEffect, useState } from "react";
import "./BuySell.css";
import DataTable from "./DataTable";

import { useNavigate } from "react-router-dom";

const BuySell = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const flag = localStorage.getItem("isNewUser") === "true"; 
      if (flag) {
        alert("Fill all the data first!");
        navigate("/Profile", { replace: true });
      }
    }, []);
  const [transactionType, setTransactionType] = useState("buy");
  const [formData, setFormData] = useState({
    energy: "",
    price: "",
    distance: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const buyers = [
    { name: "Anant", price: "$3", energy: "10 kWh", distance: "2 km" },
    { name: "Imran", price: "$4", energy: "15 kWh", distance: "3 km" },
    { name: "Suraj", price: "$5", energy: "20 kWh", distance: "5 km" },
  ];

  const sellers = [
    { name: "ABC", price: "$2", energy: "15 Units", distance: "1 km" },
    { name: "XYZ", price: "$1", energy: "20 Units", distance: "0.5 km" },
    { name: "PRQ", price: "$3", energy: "5 Units", distance: "2 km" },
  ];

  const validateForm = () => {
    const newErrors = {};
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true); // Show success modal
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ energy: "", price: "", distance: "" });
  };

  return (
    <div className=" m-2 rounded-lg bg-[#faf9faaa] ">
      <div
        className={`buy-sell-container ${transactionType} animate-fadeIn animate-slideIn `}
      >
        {/* BuySell Section */}
        <div className="buy-sell-section bg-[#faf9fa0f]">
          <h2 className="title ">
            {transactionType === "buy" ? "Buy Energy" : "Sell Energy"}
          </h2>

          <div className="transaction-toggle">
            <button
              className={`toggle-button ${
                transactionType === "buy" ? "active-buy" : ""
              }`}
              onClick={() => setTransactionType("buy")}
            >
              Buy
            </button>
            <button
              className={`toggle-button ${
                transactionType === "sell" ? "active-sell" : ""
              }`}
              onClick={() => setTransactionType("sell")}
            >
              Sell
            </button>
          </div>

          <form className="transaction-form" onSubmit={handleSubmit}>
            <label>
              {transactionType === "buy"
                ? "Energy Required (kWh):"
                : "Energy For Sell (kWh):"}
              <input
                type="number"
                name="energy"
                value={formData.energy}
                onChange={handleInputChange}
                placeholder={`Enter ${
                  transactionType === "buy" ? "amount to buy" : "energy to sell"
                }`}
              />
              {errors.energy && <span className="error">{errors.energy}</span>}
            </label>
            <label>
              Price (per kWh):
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder={`Enter ${
                  transactionType === "buy" ? "max price" : "selling price"
                }`}
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </label>
            <label>
              Distance Preference (km):
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
                placeholder="Enter preferred distance"
              />
              {errors.distance && (
                <span className="error">{errors.distance}</span>
              )}
            </label>
            <button
              type="submit"
              className={`submit-button ${transactionType}-button`}
            >
              {transactionType === "buy" ? "Buy" : "Sell"}
            </button>
          </form>
        </div>

        {/* Tables Section */}
        <DataTable
          title={
            transactionType === "buy" ? "Available Sellers" : "Available Buyers"
          }
          data={transactionType === "buy" ? sellers : buyers}
          actionLabel={transactionType === "buy" ? "Buy" : "Sell"}
          onActionClick={(name, price, energy, distance) =>
            alert(
              `Action: ${
                transactionType === "buy" ? "Buy" : "Sell"
              }!\nName: ${name}\nPrice: ${price}\nEnergy: ${energy}\nDistance: ${distance}`
            )
          }
        />

        {/* Success Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Successful!</h3>
              <p>
                You have successfully{" "}
                {transactionType === "buy" ? "bought" : "sold"} energy.
              </p>
              <button onClick={closeModal} className="close-modal-button">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuySell;
