require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const tradeRoutes = require("./routes/trade");
const requestRoutes = require("./routes/request");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/request", requestRoutes);

const PORT =8000;
mongoose.connect("mongodb+srv://p2penergytraders:Antman%40123@cluster0.yft23.mongodb.net/Suraj_test_999?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
