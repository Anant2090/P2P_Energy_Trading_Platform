import React from "react";
import { createRequest, getSellerEmail } from "../services/requestService";

const DataTable = ({ title, data, actionLabel }) => {
  return (
    <div className="mt-5 animate-fadeIn">
      <h2 className="text-2xl text-center mb-4 text-gray-800">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="border border-gray-300 px-4 py-2">Farmer Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Energy</th>
              <th className="border border-gray-300 px-4 py-2">Distance</th>
              <th className="border border-gray-300 px-4 py-2">
                {actionLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-center border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">
                  {item.name || "Unknown"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.energy}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.distance}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className={`px-4 py-2 text-white rounded-md transition ${
                      actionLabel === "Buy"
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-red-500 hover:bg-red-700"
                    }`}
                    onClick={async () => {
                      try {
                        if (actionLabel === "Buy") {
                          const response = await getSellerEmail(item.name);
                          console.log(response.data);
                        } else {
                          const response = await createRequest({
                            buyerName: item.name,
                            sellerEmail: localStorage.getItem("userEmail"),
                            energy: item.energy,
                            price: item.price,
                            distance: item.distance,
                          });
                          console.log(response.data);
                        }
                      } catch (error) {
                        alert(error.response.data.msg);
                      }
                    }}
                  >
                    {actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
