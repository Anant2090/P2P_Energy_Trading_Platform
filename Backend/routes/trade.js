const express = require("express");
const Trade = require("../models/Trade"); // Your Mongoose Trade model
const router = express.Router();

// Create trade request on Buy-Sell Page
router.post("/create", async (req, res) => {
    try {
      const {email, name , energy, price, distance, tradeType } = req.body;

      // Checking if User's trade is already created

      if (tradeType === "buy") {

        const ExistingTrade = await Trade.find({ email: email ,tradeType: "buy" })

        console.log(ExistingTrade)

        if (ExistingTrade.length > 0) {
          return res.status(400).json({ message: "You have an existing buy trade" });
        }
      }
      else if (tradeType === "sell") {
        const ExistingTrade = await Trade.findOne({ email:email ,tradeType:"sell" })

        if (ExistingTrade) {
          return res.status(400).json({ message: "You have an existing sell trade" });
        }
      }
  
      if (!tradeType || !distance) {
        return res.status(400).json({ error: "tradeType and distance are required" });
      }
  
      const newTrade = new Trade({email, name, energy, price, distance, tradeType });
      await newTrade.save();
  
      res.status(201).json({ message: "Trade created successfully", trade: newTrade });
    } catch (error) {
      console.error("Error fetching trades:", error);

      res.status(500).json({ error: error.message });
    }
  });

// Fetch all trades on Buy-Sell Page
router.get("/list", async (req, res) => {
  try {
    const trades = await Trade.find();
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  // Fetch trades with specific email (Home Page)
  router.get("/user_trades", async (req, res) => {
    try {
      const { email } = req.query;
      const trades = await Trade.find({ email: email }); // Fetch trades with specific email
      res.status(200).json(trades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete trade on Home Page
  router.delete("/delete_trade", async (req, res) => {
    try {
      const { email, tradeType } = req.query;
      await Trade.deleteOne({ email: email, tradeType: tradeType });
      res.status(200).json({ message: "Trade deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;