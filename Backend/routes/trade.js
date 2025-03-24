const express = require("express");
const Trade = require("../models/Trade"); // Your Mongoose Trade model
const router = express.Router();

// Create trade request
router.post("/create", async (req, res) => {
    try {
      const { name, energy, price, distance, tradeType } = req.body;
  
      if (!tradeType || !distance) {
        return res.status(400).json({ error: "tradeType and distance are required" });
      }
  
      const newTrade = new Trade({ name, energy, price, distance, tradeType });
      await newTrade.save();
  
      res.status(201).json({ message: "Trade created successfully", trade: newTrade });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Fetch all trades
router.get("/list", async (req, res) => {
  try {
    const trades = await Trade.find();
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Fetch all trades (Buy & Sell)
router.get("/trades", async (req, res) => {
    try {
      const trades = await Trade.find(); // Fetch all trade requests
      res.json(trades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;