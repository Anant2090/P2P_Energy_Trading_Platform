// Import necessary modules
import React from 'react';
import './NewRequest.css'; // For styling the component

const NewRequest = () => {

  return (
      <div className="new-request-card">
        <div className="request-info">
          <p><strong>Farmer Name:</strong></p>
          <p><strong>Rate Price:</strong></p>
          <p><strong>Energy:</strong></p>
          <p><strong>Request Type:</strong></p>
        </div>
        <div className="request-actions">
          <button className="accept-button">Accept</button>
          <button className="reject-button">Reject</button>
        </div>
      </div>
  );
};

export default NewRequest;