import {
  getUserBuyerRequest,
  deleteSellRequest,
} from "../../services/requestService";
import { getTradesByEmail, deleteTrade } from "../../services/tradeService";
import { useState, useEffect } from "react";
import { MdEnergySavingsLeaf, MdShoppingCart } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { LuClock4, LuHouse } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";

function MyRequestTrade() {
  const [userSellRequest, setUserSellRequests] = useState([]);
  const [userTrades, setUserTrades] = useState([]);
  const [section, setSection] = useState(0);

  const fetchSellRequests = async () => {
    try {
      const response = await getUserBuyerRequest(
        localStorage.getItem("userEmail")
      );
      setUserSellRequests(response.data[0]);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  const fetchTrades = async () => {
    try {
      const response = await getTradesByEmail(
        localStorage.getItem("userEmail")
      );
      const Trades = response.data;
      setUserTrades(Trades);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  const handleDeleteBuyTrade = async () => {
    try {
      await deleteTrade(localStorage.getItem("userEmail"), "buy");
      fetchTrades();
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  const handleDeleteSellTrade = async () => {
    try {
      await deleteTrade(localStorage.getItem("userEmail"), "sell");
      fetchTrades();
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const res = await deleteSellRequest(localStorage.getItem("userEmail"));
      alert(res.data.message);
      fetchSellRequests();
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  useEffect(() => {
    fetchSellRequests();
    fetchTrades();
  }, []);

  const userSellTrade = userTrades.filter((trade) => trade.tradeType === "sell");
  const userBuyTrade = userTrades.filter((trade) => trade.tradeType === "buy");

  return (
    <>
      <div className="flex flex-col gap-2 w-[100%] h-auto m-2 p-2">
        <div className="flex flex-row w-[100%] bg-gray-100 rounded-[8px]">
          <button
            className={`w-[33%] ${
              section === 0 ? "bg-slate-700 text-white" : ""
            } rounded-[8px] p-1`}
            onClick={() => setSection(0)}
          >
            Your Request
          </button>
          <button
            className={`w-[33%] ${
              section === 1 ? "bg-slate-700 text-white" : ""
            } rounded-[8px] p-1`}
            onClick={() => setSection(1)}
          >
            Buy Trade
          </button>
          <button
            className={`w-[33%] ${
              section === 2 ? "bg-slate-700 text-white" : ""
            } rounded-[8px] p-1`}
            onClick={() => setSection(2)}
          >
            Sell Trade
          </button>
        </div>
        <div>
          {section === 0 ? (
            userSellRequest && userSellRequest.seller_status === "pending" ? (
              <div className="flex flex-col w-[100%] gap-2 bg-[#fff] border rounded-[8px] border-solid border-[#ccc] pl-3 py-4 mt-[10px]">
                <div className="flex flex-row items-center pl-5 gap-2">
                  <div className="w-[30px] h-[30px] bg-blue-400 rounded-full flex justify-center items-center">
                    <LuClock4 className="text-blue-700" />
                  </div>
                  <h1 className="text-left text-2xl font-bold text-[#333] ">
                    Your Requests
                  </h1>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-row gap-2.5 w-[80%] pl-5 items-center">
                    <MdEnergySavingsLeaf className="w-[15px] h-[15px] text-gray-400" />
                    <h1 className="font-bold">
                      Energy : {userSellRequest.energy} kWh
                    </h1>
                    <FiDollarSign className="w-[15px] h-[15px] text-gray-400" />
                    <h1 className="font-bold">
                      Price : {userSellRequest.price} Rs
                    </h1>
                    <CiLocationOn className="w-[15px] h-[15px] text-gray-400" />
                    <h1 className="font-bold">
                      Distance : {userSellRequest.distance} km
                    </h1>
                  </div>
                  <div className="flex justify-center w-[30%]">
                    <button
                      onClick={handleDeleteRequest}
                      className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="text-center text-2xl mt-4">No Pending Request</h1>
            )
          ) : section === 1 ? (
            userBuyTrade && userBuyTrade.length > 0 ? (
              <div className="flex flex-col w-[100%] gap-2 bg-[#fff] border rounded-[8px] border-solid border-[#ccc] pl-3 py-4 mt-[10px]">
                <div className="flex flex-row items-center pl-5 gap-2">
                  <div className="w-[30px] h-[30px] bg-purple-400 rounded-full flex justify-center items-center">
                    <MdShoppingCart className="text-purple-700" />
                  </div>
                  <h1 className="text-left text-2xl font-bold text-[#333] ">
                    Buy Trade
                  </h1>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-row gap-2.5 w-[80%] pl-5 items-center">
                    <MdEnergySavingsLeaf className="w-[15px] h-[15px] text-gray-400" />
                    <h1 className="font-bold">
                      Energy : {userBuyTrade[0].energy} kWh
                    </h1>
                    <FiDollarSign className="w-[15px] h-[15px] text-gray-400" />
                    <h1 className="font-bold">
                      Price : {userBuyTrade[0].price} Rs
                    </h1>
                    <CiLocationOn className="w-[15px] h-[15px] text-gray-400" />
                    <h1 className="font-bold">
                      Distance : {userBuyTrade[0].distance} km
                    </h1>
                  </div>
                  <div className="flex justify-center w-[30%]">
                    <button
                      onClick={handleDeleteBuyTrade}
                      className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="text-center text-2xl mt-4">No Buy Trades</h1>
            )
          ) : userSellTrade && userSellTrade.length > 0 ? (
            <div className="flex flex-col w-[100%] gap-2 bg-[#fff] border rounded-[8px] border-solid border-[#ccc] pl-3 py-4 mt-[10px]">
              <div className="flex flex-row items-center pl-5 gap-2">
                <div className="w-[30px] h-[30px] bg-yellow-400 rounded-full flex justify-center items-center">
                  <LuHouse className="text-yellow-700" />
                </div>
                <h1 className="text-left text-2xl font-bold text-[#333] ">
                  Sell Trade
                </h1>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-row gap-2.5 w-[80%] pl-5 items-center">
                  <MdEnergySavingsLeaf className="w-[15px] h-[15px] text-gray-400" />
                  <h1 className="font-bold">
                    Energy : {userSellTrade[0].energy} kWh
                  </h1>
                  <FiDollarSign className="w-[15px] h-[15px] text-gray-400" />
                  <h1 className="font-bold">
                    Price : {userSellTrade[0].price} Rs
                  </h1>
                  <CiLocationOn className="w-[15px] h-[15px] text-gray-400" />
                  <h1 className="font-bold">
                    Distance : {userSellTrade[0].distance} km
                  </h1>
                </div>
                <div className="flex justify-center w-[30%]">
                  <button
                    onClick={handleDeleteSellTrade}
                    className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-2xl mt-4">No Sell Trades</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default MyRequestTrade;
