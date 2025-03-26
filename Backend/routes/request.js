const express = require("express");
const Request = require("../models/Request"); // Your Mongoose Request model
const Trade = require("../models/Trade");
const User = require("../models/User");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { buyerName, sellerEmail, energy, price, distance } = req.body;

    if (!buyerName || !sellerEmail || !energy || !price || !distance) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const Seller_data = await User.findOne({ email: sellerEmail });
    const Trader_data = await Trade.findOne({ name: buyerName });
    const Buyer_data = await User.findOne({ email: Trader_data.email });

    if (!Seller_data || !Trader_data || !Buyer_data) {
      return res.status(404).json({ msg: "Invalid trade data" });
    }

    if (Seller_data.SellRequests === false) {
      return res.status(400).json({ msg: "Sell Request already exists" });
    }

    const buyerEmail = Buyer_data.email;
    const sellerName = `${Seller_data.firstName} ${Seller_data.lastName}`;

    const newRequest = new Request({ 
      buyerEmail, 
      buyerName, 
      sellerEmail, 
      sellerName, 
      energy, 
      price, 
      distance 
    });

    Seller_data.SellRequests = false;
    await newRequest.save();
    await Seller_data.save();

    res.status(201).json({ 
      message: "Request created successfully", 
      request: newRequest 
    });

  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Fetch request for particular user
router.get("/list/", async (req, res) => {
  try {
    const { email } = req.query;
    const requests = await Request.find({ buyerEmail:email });
    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
