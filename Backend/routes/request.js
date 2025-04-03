const express = require("express");
const Request = require("../models/Request"); // Your Mongoose Request model
const Trade = require("../models/Trade");
const User = require("../models/User");
const router = express.Router();


// Create request on Buy-Sell and search Page
router.post("/create", async (req, res) => {
  try {
    const { buyerName, sellerEmail, energy, price, distance } = req.body;

    if (!buyerName || !sellerEmail || !energy || !price || !distance) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const Existing_Request = await Request.findOne({ sellerEmail: sellerEmail });

    if (Existing_Request) {
      return res.status(400).json({ msg: "You have an selling request" });
    }

    const Seller_data = await User.findOne({ email: sellerEmail });
    const Buyer_trade = await Trade.findOne({ name: buyerName });
    const Buyer_data = await User.findOne({ email: Buyer_trade.email });

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
    await newRequest.save();

    res.status(201).json({
      message: "Request created successfully",
      sellerEmail: sellerEmail,
      buyerEmail: buyerEmail,
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Fetch request for particular user (Home Page)
router.get("/list/", async (req, res) => {
  try {
    const { email } = req.query;
    const requests = await Request.find({ buyerEmail: email });
    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Fetch request for particular user (Home Page)
router.get("/list_buyer/", async (req, res) => {
  try {
    const { email } = req.query;
    const requests = await Request.find({ sellerEmail: email });
    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete particular request for particular request with user seller_name (Home Page)
router.delete("/delete_request/", async (req, res) => {
  try {
    const { seller_name } = req.query;
    const requests = await Request.deleteOne({ sellerName: seller_name });
    return res.status(201).json({
      message: "Request cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete request by self by clicking cancel button (Home Page)
router.delete("/delete_req/",async (req, res) => {
  try{
    const { seller_email } = req.query;
    const request = await Request.deleteOne( { sellerEmail: seller_email });
    return res.status(201).json({ message: "Request cancelled successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})


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

router.delete("/delete_trade/", async (req, res) => {
  try{
    const {Seller_Email, Buyer_Email} = req.query;
    console.log(Seller_Email,Buyer_Email)
    const a=await Trade.deleteMany({ email: Seller_Email });
    const b=await Trade.deleteMany({ email: Buyer_Email });
    await User.updateMany({ email: Seller_Email }, { $set: { existingBuyTrade: true ,existingSellTrade: true } });
    await User.updateMany({ email: Buyer_Email }, { $set: { existingBuyTrade: true ,existingSellTrade: true  } });
    console.log(a,b)
    return res.status(201).json({
      message: "Trade deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


router.get("/seller_email", async (req, res) => {
  try {
    const { seller_name } = req.query;
    const seller_trade = await Trade.findOne({ name: seller_name });
    return res.json(seller_trade.email);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

module.exports = router;
