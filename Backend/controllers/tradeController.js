const Trade = require("../models/Trade.js");

// Create Trade Request
exports.createTrade = async (req, res) => {
    try {
      const { name, energy, price, distance, tradeType } = req.body;
  
      if (!name || !energy || !price || !distance || !tradeType) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      if (!["buy", "sell"].includes(tradeType)) {
        return res.status(400).json({ error: "Invalid trade type" });
      }
  
      const newTrade = new Trade({ name, energy, price, distance, tradeType });
      await newTrade.save();
  
      res.status(201).json({ message: "Trade request created", trade: newTrade });
    } catch (error) {
      console.error("Error creating trade:", error);
      res.status(500).json({ error: "Server error" });
    }
};

// Get Trade Requests by Type (Buy/Sell)
exports.getTradesByType = async (req, res) => {
  try {
    const { tradeType } = req.params;
    if (!["buy", "sell"].includes(tradeType)) {
      return res.status(400).json({ error: "Invalid trade type" });
    }

    const trades = await Trade.find({ tradeType, status: "pending" });
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};