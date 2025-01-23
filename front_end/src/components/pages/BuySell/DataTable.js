import React from "react";
import "./DataTable.css";

const DataTable = ({ title, data, actionLabel, onActionClick }) => {
  return (
    <div className="data-table-container">
      <h2 className="text-2xl ">{title}</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Farmer Name</th>
            <th>Price</th>
            <th>Energy</th>
            <th>Distance</th>
            <th>{actionLabel}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.energy}</td>
              <td>{item.distance}</td>
              <td>
                <button
                  className="action-button"
                  onClick={() =>
                    onActionClick(item.name, item.price, item.energy, item.distance)
                  }
                >
                  {actionLabel}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;