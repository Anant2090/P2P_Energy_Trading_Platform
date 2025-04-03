import {
  getUserBuyerRequest,
  deleteSellRequest,
} from "../../services/requestService";
import { getTradesByEmail, deleteTrade } from "../../services/tradeService";
import { useState, useEffect } from "react";

function MyRequestTrade() {
  const [userSellRequest, setUserSellRequests] = useState([]);
  const [userTrades, setUserTrades] = useState([]);

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

  const handleDeleteTrade = async (tradeType) => {
    try {
      await deleteTrade(localStorage.getItem("userEmail"), tradeType);
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
  }, [userSellRequest, userTrades]);

  const userSellTrade = userTrades.filter(
    (trade) => trade.tradeType === "sell"
  );
  const userBuyTrade = userTrades.filter((trade) => trade.tradeType === "buy");

  console.log("userSellRequest", userSellRequest);
  return (
    <>
      {(userBuyTrade.length > 0 ||
        userSellTrade.length > 0 ||
        userSellRequest) && (
        <div className="flex flex-col gap-2 w-[100%] h-auto rounded-2xl p-2">
          {userSellRequest && userSellRequest.seller_status === "pending" && (
            <div className="flex flex-col w-[100%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
              <h1 className="text-center text-2xl font-bold text-[#333] ">
                Your Requests
              </h1>
              <div className="flex flex-row">
              <div className="flex flex-col gap-1 w-[80%] pl-5">
                <h1 className="font-bold">Enegry : {userSellRequest.energy}</h1>
                <h1 className="font-bold">Price : {userSellRequest.price}</h1>
                <h1 className="font-bold">Distance : {userSellRequest.distance}</h1>
              </div>
              <div className="flex gap-2 items-center justify-center w-[30%]">
                <button onClick={handleDeleteRequest} className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]">
                  Cancel
                </button>
              </div>
              </div>
            </div>
          )}

          {(userBuyTrade.length > 0 || userSellTrade.length > 0) && (
            <div className="w-[100%] h-[65%] item-center">
              <div className="flex flex-row h-[95%] w-[100%] gap-2">
                {userBuyTrade.length > 0 && (
                  <div className="h-[92%] w-[50%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
                    <h1 className="text-center text-2xl font-bold text-[#333]">
                      Your Buy Trades
                    </h1>
                    <div className="flex flex-col gap-1 pl-5">
                      <h1 className="font-bold">
                        Enegry : {userBuyTrade[0].energy}
                      </h1>
                      <h1 className="font-bold">
                        Price : {userBuyTrade[0].price}
                      </h1>
                      <h1 className="font-bold">
                        Distance : {userBuyTrade[0].distance}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-center gap-2 h-[20%] mt-[15px]">
                      <button
                        onClick={() => {
                          handleDeleteTrade("buy");
                        }}
                        className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {userSellTrade.length > 0 && (
                  <div className="h-[92%] w-[50%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
                    <h1 className="text-center text-2xl font-bold text-[#333]">
                      Your Sell Trades
                    </h1>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-bold">
                        Enegry : {userSellTrade[0].energy}
                      </h1>
                      <h1 className="font-bold">
                        Price : {userSellTrade[0].price}
                      </h1>
                      <h1 className="font-bold">
                        Distance : {userSellTrade[0].distance}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-center gap-2 h-[20%] mt-[15px]">
                      <button
                        onClick={() => {
                          handleDeleteTrade("sell");
                        }}
                        className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MyRequestTrade;

/*
{(userBuyTrade.length > 0 ||
        userSellTrade.length > 0 ||
        userSellRequest) && (
        <div className="flex flex-col gap-2 w-[100%] h-auto rounded-2xl p-2">
          {userSellRequest && userSellRequest.seller_status === "pending" && (
            <div className="flex flex-col w-[100%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
              <h1 className="text-center text-2xl font-bold text-[#333] ">
                Your Requests
              </h1>
              <div className="flex flex-row">
              <div className="flex flex-col gap-1 w-[80%] pl-5">
                <h1 className="font-bold">Enegry : {userSellRequest.energy}</h1>
                <h1 className="font-bold">Price : {userSellRequest.price}</h1>
                <h1 className="font-bold">Distance : {userSellRequest.distance}</h1>
              </div>
              <div className="flex gap-2 items-center justify-center w-[30%]">
                <button onClick={handleDeleteRequest} className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]">
                  Cancel
                </button>
              </div>
              </div>
            </div>
          )}

          {(userBuyTrade.length > 0 || userSellTrade.length > 0) && (
            <div className="w-[100%] h-[65%] item-center">
              <div className="flex flex-row h-[95%] w-[100%] gap-2">
                {userBuyTrade.length > 0 && (
                  <div className="h-[92%] w-[50%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
                    <h1 className="text-center text-2xl font-bold text-[#333]">
                      Your Buy Trades
                    </h1>
                    <div className="flex flex-col gap-1 pl-5">
                      <h1 className="font-bold">
                        Enegry : {userBuyTrade[0].energy}
                      </h1>
                      <h1 className="font-bold">
                        Price : {userBuyTrade[0].price}
                      </h1>
                      <h1 className="font-bold">
                        Distance : {userBuyTrade[0].distance}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-center gap-2 h-[20%] mt-[15px]">
                      <button
                        onClick={() => {
                          handleDeleteTrade("buy");
                        }}
                        className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {userSellTrade.length > 0 && (
                  <div className="h-[92%] w-[50%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
                    <h1 className="text-center text-2xl font-bold text-[#333]">
                      Your Sell Trades
                    </h1>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-bold">
                        Enegry : {userSellTrade[0].energy}
                      </h1>
                      <h1 className="font-bold">
                        Price : {userSellTrade[0].price}
                      </h1>
                      <h1 className="font-bold">
                        Distance : {userSellTrade[0].distance}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-center gap-2 h-[20%] mt-[15px]">
                      <button
                        onClick={() => {
                          handleDeleteTrade("sell");
                        }}
                        className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
*/
