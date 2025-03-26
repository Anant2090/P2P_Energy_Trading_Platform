const express = require("express");
const Trade = require("../models/Trade"); // Your Mongoose Trade model
const User = require("../models/User"); // Your Mongoose User model
const router = express.Router();

// Create trade request
router.post("/create", async (req, res) => {
    try {
      const {email, name, energy, price, distance, tradeType } = req.body;

      const existuser = await User.findOne({ email: email });

      if (tradeType === "buy" && !existuser.existingBuyTrade) {

        return res.status(400).json({ message: "You have an existing buy trade" });
      }
      else if (tradeType === "sell" && !existuser.existingSellTrade) {
        return res.status(400).json({ message: "You have an existing sell trade" });
      }
      // console.log("Check for existing trade");
  
      if (!tradeType || !distance) {
        return res.status(400).json({ error: "tradeType and distance are required" });
      }
  
      const newTrade = new Trade({email, name, energy, price, distance, tradeType });
  

      if (tradeType === "buy") {existuser.existingBuyTrade = false;}
      if (tradeType === "sell") {existuser.existingSellTrade = false;}

      await newTrade.save();
      await existuser.save();
  
      res.status(201).json({ message: "Trade created successfully", trade: newTrade });
    } catch (error) {
      console.error("Error fetching trades:", error);

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