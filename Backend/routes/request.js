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
    await Trade.deleteOne({ name: buyerName });
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
      distance,
    });

    Seller_data.SellRequests = false;
    await newRequest.save();
    await Seller_data.save();

    res.status(201).json({
      message: "Request created successfully",
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
    const requests = await Request.find({ buyerEmail: email });
    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete all request after accept clicked
router.delete("/delete/", async (req, res) => {
  try {
    const { email, seller_name } = req.query;

    if (!email || !seller_name) {
      return res.status(400).json({ error: "Email and seller_name are required" });
    }

    const requestsToDelete = await Request.find({ 
      buyerEmail: email,
      sellerName: { $ne: seller_name } 
    });

    const sellerEmails = [...new Set(
      requestsToDelete.map(req => req.sellerEmail)
    )];

    await Request.deleteMany({
      _id: { $in: requestsToDelete.map(req => req._id) }
    });

    if (sellerEmails.length > 0) {
      await User.updateMany(
        { email: { $in: sellerEmails } },
        { $set: { SellRequests: true } }
      );
    }

    return res.status(200).json({
      message: `Deleted ${requestsToDelete.length} requests and updated ${sellerEmails.length} sellers`,
      deletedCount: requestsToDelete.length,
      updatedSellers: sellerEmails
    });

  } catch (error) {
    return res.status(500).json({ 
      error: error.message,
      context: "Failed to clean up requests"
    });
  }
});

// Delete particular request for particular request with user seller_name
router.delete("/delete_request/", async (req, res) => {
  try {
    const { seller_name } = req.query;
    const seller_request = await Request.findOne({ sellerName: seller_name });
    const requests = await Request.deleteOne({ sellerName: seller_name });
    const user = await User.findOne({ email: seller_request.sellerEmail });
    user.SellRequests = true;
    user.save();
    return res.status(201).json({
      message: "Request cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
