const express = require("express");
const Request = require("../models/Request"); // Your Mongoose Request model
const User = require("../models/User");
const router = express.Router();

// Create request
router.post("/create", async (req, res) => {
  try {
    const { buyername, sellername, energy, price, distance, tradeType } =
      req.body;

    if (!buyername || !sellername || !energy || !price || !distance) {
      return res
        .status(400)
        .json({ msg: "tradeType and distance are required" });
    }

    if (tradeType === "Buy") {
      var User_data = await User.findOne({ email: buyername });
    } else {
      var User_data = await User.findOne({ email: sellername });
    }
    if (parseInt(User_data.outgoingRequests) === 1) {
      return res.status(400).json({ msg: "One request already exists" });
    } else {
      const newRequest = new Request({
        buyername,
        sellername,
        energy,
        price,
        distance,
      });
      User_data.outgoingRequests = "1";
      await User_data.save();
      await newRequest.save();

      res
        .status(201)
        .json({ message: "Request created successfully", request: newRequest });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all requests
router.get("/list", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch request for particular user
router.get("/list/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const requests = await Request.find({ username });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
