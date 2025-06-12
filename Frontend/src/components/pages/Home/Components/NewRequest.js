import React from "react";
import {
  deleteRequest,
  deleteSellerRequest,
} from "../../services/requestService";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { IoPersonAdd } from "react-icons/io5";
import { storeTransaction } from "../../../Blockchain/blockchain";
import { getProfile } from "../../services/profileService";

import {
  createRequest,
  getSellerEmail,
  deleteTrades,
} from "../../services/requestService";

const NewRequest = ({ sellerName, price, energy }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentSellerEmail, setCurrentSellerEmail] = React.useState("");
  const espid = localStorage.getItem("ESPID");

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-300">
      <div className="flex flex-col">
        <div className="flex flex-row items-center pl-5 gap-2 mb-3">
          <div className="w-[30px] h-[30px] bg-green-400 rounded-full flex justify-center items-center">
            <IoPersonAdd className="text-green-700" />
          </div>
          <h1 className="text-left text-2xl font-bold text-[#333] ">
            Incoming Requests from {sellerName}
          </h1>
        </div>
        <div className="flex flex-row gap-2.5 w-[100%] pl-5 items-center">
          <FiDollarSign className="w-[15px] h-[15px] text-gray-400" />
          <h1 className="font-bold">Price : {price} Rs</h1>
          <MdEnergySavingsLeaf className="w-[15px] h-[15px] text-gray-400" />
          <h1 className="font-bold">Energy : {energy} kWh</h1>
          <FiDollarSign className="w-[15px] h-[15px] text-gray-400" />
          <h1 className="font-bold">Total : {energy * price} Rs</h1>
        </div>
      </div>
      <div className="flex flex-row gap-2 w-[30%]">
        <button
          onClick={async () => {
            try {
              const seller = await getProfile(sellerName);
              const buyer = localStorage.getItem("userEmail");
              console.log("seller", seller.data.email);

              const selllerEspId = seller.data.espid;
              const buyerEspId = localStorage.getItem("ESPID");

              const priceInEther = energy * price;
              const actualEtherPrice = (priceInEther / 1e18).toFixed(18);

              console.log("sellerEspId", selllerEspId);
              console.log("buyerEspId", buyerEspId);

              console.log("buyer", buyer);
              console.log("Accepting request for seller:", sellerName);
              const transaction = await storeTransaction(
                buyer,
                localStorage.getItem("userEmail"),
                energy,
                actualEtherPrice,
                0
              );

              if (transaction) {
                await deleteTrades(buyer, localStorage.getItem("userEmail"));
              }
              await deleteSellerRequest(sellerName);



              alert("Request accepted!");

              try {
                const [resReceiver, resSender] = await Promise.all([
                  fetch(`http://${selllerEspId}/on`),
                  fetch(`http://${buyerEspId}/on`),
                ]);

                if (!resReceiver.ok || !resSender.ok) {
                  throw new Error("One or both ESP devices failed to respond.");
                }

                console.log("✅ Both ESPs triggered successfully.");
              } catch (espError) {
                console.error("❌ ESP Error:", espError.message);
              }

              setTimeout(async () => {
                // Trigger ESP devices
                try {
                  const [resReceiver, resSender] = await Promise.all([
                    fetch(`http://${selllerEspId}/off`),
                    fetch(`http://${buyerEspId}/off`),
                  ]);

                  if (!resReceiver.ok || !resSender.ok) {
                    throw new Error(
                      "One or both ESP devices failed to respond."
                    );
                  }

                  console.log("✅ Both ESPs triggered successfully.");
                } catch (espError) {
                  console.error("❌ ESP Error:", espError.message);
                }
              }, 15000);

            } catch (error) {
              alert(error.response?.data?.msg || "Error accepting request.");
            }
          }}
          className="h-[30px] bg-green-600 text-[#fff] rounded-[15px] w-[100%] p-[7px] font-bold text-[12px]"
        >
          Accept
        </button>
        <button
          onClick={async () => {
            try {
              await deleteSellerRequest(sellerName);
              alert("Request rejected!");
            } catch (error) {
              alert(error.response?.data?.msg || "Error rejecting request.");
            }
          }}
          className="h-[30px] bg-[#FF0000] text-[#fff] rounded-[15px] w-[100%] p-[7px] font-bold text-[12px]"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default NewRequest;
