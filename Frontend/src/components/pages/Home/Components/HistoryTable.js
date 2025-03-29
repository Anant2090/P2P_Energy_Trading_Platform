import React from "react";
import "./HistoryTable.css";

const DataTable = ({ title, data}) => {
  return (
    <div className="data-table-container">
      <h2>{title}</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Farmer Name</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.trade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;