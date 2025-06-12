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
    const { email } = req.query;
    

    if (!email) return res.status(400).json({ msg: "Please provide email or name" });

    // Try finding by email first
    let user = await User.findOne({ email });

    if (!user) {
      const parts = email.trim().split(" ");

      // Handle both single and full name inputs
      if (parts.length === 2) {
        const [firstName, lastName] = parts;
        user = await User.findOne({ firstName, lastName });
      } else {
        user = await User.findOne({
          $or: [{ firstName: parts[0] }, { lastName: parts[0] }]
        });
      }
    }

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});




module.exports = router;
