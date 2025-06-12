import React from "react";
import { createRequest, getSellerEmail } from "../services/requestService";
import { getProfile } from "../services/profileService";
import { storeTransaction } from "../../Blockchain/blockchain";
import { deleteTrades } from "../services/requestService";

const DataTable = ({ title, data, actionLabel }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentSellerEmail, setCurrentSellerEmail] = React.useState("");
  const espid = localStorage.getItem("ESPID");

  const fetchProfile = async (email) => {
    try {
      const res = await getProfile(email);
      if (res) {
        setCurrentUser(res.data);
        return res.data;
      } else {
        console.warn("Profile data is empty or undefined.");
        setCurrentUser({});
      }
    } catch (error) {
      console.error(
        error?.response?.data?.msg ??
          error.message ??
          "Failed to fetch profile."
      );
    }
  };

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
                          // Get sender's ESP ID
                         const senderProfile = await getProfile(item.email);  
                          const senderEspId = senderProfile?.data?.espid;
                          const receiverEspId = espid;

                          console.log("Sender ESP:", senderEspId);
                          console.log("Receiver ESP:", receiverEspId);

                          // Get seller email
                          const emailRes = await getSellerEmail(item.name);
                          const sellerEmail = emailRes.data.sellerEmail;
                          setCurrentSellerEmail(sellerEmail);

                          await fetchProfile(sellerEmail);

                          const priceInEther = item.energy * item.price;
                          const actualEtherPrice = (
                            priceInEther / 1e18
                          ).toFixed(18);

                          console.log(espid, senderEspId);


                          const transaction = await storeTransaction(
                            item.email,
                            localStorage.getItem("userEmail"),
                            item.energy,
                            actualEtherPrice,
                            0
                          );

                          if (transaction) {
                            await deleteTrades(
                              item.email,
                              localStorage.getItem("userEmail")
                            );
                          }


                          try {
                            const [resReceiver, resSender] = await Promise.all([
                              fetch(`http://${espid}/on`),
                              fetch(`http://${senderEspId}/on`),
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

                          setTimeout(async () => {
                            // Trigger ESP devices
                          try {
                            const [resReceiver, resSender] = await Promise.all([
                              fetch(`http://${espid}/off`),
                              fetch(`http://${senderEspId}/off`),
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
                        } else {
                          const response = await createRequest({
                            buyerName: item.name,
                            sellerEmail: localStorage.getItem("userEmail"),
                            energy: item.energy,
                            price: item.price,
                            distance: item.distance,
                          });
                          alert(response.data.message);
                        }
                      } catch (error) {
                        console.error("Error:", error);
                        alert(
                          error?.response?.data?.msg ||
                            "An unexpected error occurred."
                        );
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
