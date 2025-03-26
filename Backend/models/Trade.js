const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email : { type: String, required: true },
  energy: { type: Number, required: true },
  price: { type: Number, required: true },
  distance: { type: Number, required: true }, //  Ensure distance is required
  tradeType: { type: String, enum: ["buy", "sell"], required: true }, // Ensure tradeType is required
});

const Trade = mongoose.model("Trade", tradeSchema);
module.exports = Trade;