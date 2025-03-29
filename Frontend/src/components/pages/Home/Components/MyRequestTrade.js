import { getUserRequest } from "../../services/requestService";
import { useState, useEffect } from "react";

function MyRequestTrade() {
  const [userSellRequest, setUserSellRequests] = useState([]);

  const fetchSellRequests = async () => {
    try {
      const response = await getUserRequest(
        localStorage.getItem("userEmail"),
        "Sell"
      );
      const Requests = response.data;
      console.log(Requests)
      setUserSellRequests(Requests);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  useEffect(() => {
    fetchSellRequests();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 w-[100%] h-[75%] rounded-2xl p-2">
        <div className="flex flex-col w-[100%] h-[50%] items-center p-1 bg-[#e6e6e6] rounded-[25px]">
          <h1 className="text-center text-2xl font-bold text-[#333] ">
            Your Requests
          </h1>
          {userSellRequest.seller_status === "pending" ? (
            <div className="flex flex-row w-[95%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
              <div className="flex flex-col gap-1 w-[80%]">
                <h1 className="font-bold">Enegry : </h1>
                <h1 className="font-bold">Price : </h1>
                <h1 className="font-bold">Distance : </h1>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center w-[30%]">
                <button className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-2xl font-bold text-[#333]">
              You have no pending requests
            </h1>
          )}
        </div>
        <div className="w-[100%] h-[60%] item-center">
          <div className="flex flex-row h-[95%] w-[100%] gap-2">
            <div className="h-[92%] w-[50%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
              <h1 className="text-center text-2xl font-bold text-[#333]">
                Your Buy Trades
              </h1>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold">Enegry : </h1>
                <h1 className="font-bold">Price : </h1>
                <h1 className="font-bold">Distance : </h1>
              </div>
              <div className="flex flex-row gap-2 h-[20%] mt-[15px]">
                <button className="h-[30px] bg-[#00B400] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]">
                  Edit
                </button>
                <button className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]">
                  Cancel
                </button>
              </div>
            </div>
            <div className="h-[92%] w-[50%] bg-[#fff] border rounded-[8px] border-solid border-[#ccc] p-2 mt-[10px]">
              <h1 className="text-center text-2xl font-bold text-[#333]">
                Your Sell Trades
              </h1>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold">Enegry : </h1>
                <h1 className="font-bold">Price : </h1>
                <h1 className="font-bold">Distance : </h1>
              </div>
              <div className="flex flex-row gap-2 h-[20%] mt-[15px]">
                <button className="h-[30px] bg-[#00B400] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]">
                  Edit
                </button>
                <button className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[50%] p-[7px] font-bold text-[12px]">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRequestTrade;
