const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/profileupdate", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, country, city, address, zipCode } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.country = country;
    user.city = city;
    user.address = address;
    user.zipCode = zipCode;
    user.isNewUser = false;
    await user.save();
    res.json({ msg: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/getprofile", async (req, res) => {
  try {
    console.log(req.body)
    const email = req.body;
    console.log(email);
    console.log("Hi");
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
