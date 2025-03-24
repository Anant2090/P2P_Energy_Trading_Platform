const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = "your_jwt_secret"; // Change this in production

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, userId: user._id, isNewUser: user.isNewUser, username: user.name });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Protected Route (Example)
router.get("/me", async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password");

        res.json(user);
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
});

module.exports = router;
