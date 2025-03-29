// Import necessary modules
import React from "react";
import "./NewRequest.css"; // For styling the component
import { deleteRequest, deleteSellerRequest } from "../../services/requestService";

const NewRequest = ({ sellerName, price, energy }) => {
  return (
    <div className="new-request-card">
      <div className="request-info">
        <p>
          <strong>Farmer Name : {sellerName}</strong>
        </p>
        <p>
          <strong>Rate : {price}</strong>
        </p>
        <p>
          <strong>Energy : {energy}</strong>
        </p>
        <p>
          <strong>Total Price : {price * energy}</strong>
        </p>
      </div>
      <div className="request-actions">
        <button
          onClick={async () => {
            try {
              await deleteRequest(localStorage.getItem("userEmail"), sellerName);
              alert("Request accepted!");
            } catch (error) {
              alert(error.response.data.msg);
            }
          }}
          className="accept-button"
        >
          Accept
        </button>
        <button onClick={async () => {
            try {
              await deleteSellerRequest(sellerName);
              alert("Request rejected!");
            } catch (error) {
              alert(error.response.data.msg);
            }
          }} className="reject-button">Reject</button>
      </div>
    </div>
  );
};

export default NewRequest;
