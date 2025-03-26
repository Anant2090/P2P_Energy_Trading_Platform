import React from "react";
import { createRequest } from "../../services/requestService";

const SearchTable = ({ title, data, actionLabel }) => {
  return (
    <div className="mt-5 max-w-[90%] mx-auto bg-[#faf9fac2] p-5 rounded-lg shadow-md animate-fadeIn border-black border-2">
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">
              Farmer Name
            </th>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">
              Price
            </th>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">
              Energy
            </th>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">
              Distance
            </th>
            <th className="border px-4 py-2 bg-gray-200 text-gray-800">
              Trade
            </th>
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
                  className={`px-4 py-2 text-white rounded-md transition ${
                    item.tradeType === "buy" ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"
                  }`}
                  onClick={async () => {
                    try {
                      if (actionLabel === "Buy") {
                        console.log(
                          "On clicking user need to go on login page"
                        );
                      } else {
                        await createRequest({
                          buyerName: item.name,
                          sellerEmail: localStorage.getItem("userEmail"),
                          energy: item.energy,
                          price: item.price,
                          distance: item.distance,
                        });
                      }
                    } catch (error) {
                      alert(error.response.data.msg);
                    }
                  }}
                 >
                  {item.tradeType === "buy" ? "Sell" : "Buy"}
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