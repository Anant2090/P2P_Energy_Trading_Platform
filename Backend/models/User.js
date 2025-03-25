const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    address: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    isNewUser: { type: Boolean, default: true },
    incomingRequests: { type: String, default: "0"},
    outgoingRequests: { type: String, default: "0"},
    existingBuyTrade: { type:Boolean, default: false},
    existingSellTrade: { type:Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
