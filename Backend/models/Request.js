const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  buyername: { type: String, required: true },
  sellername: { type: String, required: true },
  energy: { type: Number, required: true },
  price: { type: Number, required: true },
  distance: { type: Number, required: true }, //  Ensure distance is required
  buyer_status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }, // Add status field with default value of "pending"
  seller_status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }, // Add status field with default value of "pending"
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;