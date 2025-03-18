require("dotenv").config();
const express = require("express");       //using express
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const tradeRoutes = require("./routes/trade");

const app = express();   //server created (app) this is instance of express created server

// Middleware
app.use(express.json());   // parsing the json response ---> javascript object not just middleware
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trade", tradeRoutes);       //using routes request is api/trade route and we get response from tradeRoutes


const PORT =8080;         //port number
mongoose.connect("mongodb+srv://p2penergytraders:Antman%40123@cluster0.yft23.mongodb.net/new-app?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
