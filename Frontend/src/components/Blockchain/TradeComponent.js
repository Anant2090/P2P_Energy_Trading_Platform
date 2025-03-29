import React, { useState } from "react";
import { storeTransaction, verifyAndSettle } from "./blockchain";

const TradeComponent = () => {
  const [tradeId, setTradeId] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [energyAmount, setEnergyAmount] = useState("");
  const [price, setPrice] = useState("");
  const [transferredAmount, setTransferredAmount] = useState("");

  const handleStoreTransaction = async () => {
    await storeTransaction(sellerEmail, buyerEmail, energyAmount, price);
  };

  const handleVerifyAndSettle = async () => {
    await verifyAndSettle(tradeId, buyerEmail, sellerEmail, transferredAmount);
  };

  return (
    <div>
      <h2>P2P Energy Trading</h2>
      
      <h3>Store Transaction</h3>
      <input type="text" placeholder="Seller Email" onChange={(e) => setSellerEmail(e.target.value)} />
      <input type="text" placeholder="Buyer Email" onChange={(e) => setBuyerEmail(e.target.value)} />
      <input type="number" placeholder="Energy Amount" onChange={(e) => setEnergyAmount(e.target.value)} />
      <input type="number" placeholder="Price (ETH)" onChange={(e) => setPrice(e.target.value)} />
      <button onClick={handleStoreTransaction}>Store Trade</button>

      <h3>Verify & Settle Trade</h3>
      <input type="number" placeholder="Trade ID" onChange={(e) => setTradeId(e.target.value)} />
      <input type="number" placeholder="Transferred Amount" onChange={(e) => setTransferredAmount(e.target.value)} />
      <button onClick={handleVerifyAndSettle}>Settle Trade</button>
    </div>
  );
};

export default TradeComponent;
