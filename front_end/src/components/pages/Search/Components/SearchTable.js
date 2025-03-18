import React from "react";

const SearchTable = ({ title, data, onActionClick }) => {
  return (
    <div className="mt-5 max-w-[90%] mx-auto bg-[#faf9fac2] p-5 rounded-lg shadow-md animate-fadeIn animate-slideIn">
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">Farmer Name</th>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">Price</th>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">Energy</th>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">Distance</th>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">Trade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">{item.name}</td>
              <td className="border px-4 py-2 text-center">{item.price}</td>
              <td className="border px-4 py-2 text-center">{item.energy}</td>
              <td className="border px-4 py-2 text-center">{item.distance}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className={`px-3 py-1 text-white rounded ${
                    item.trade === "buy" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={() =>
                    onActionClick(item.name, item.price, item.energy, item.distance, item.trade)
                  }
                >
                  {item.trade === "buy" ? "Buy" : "Sell"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchTable;