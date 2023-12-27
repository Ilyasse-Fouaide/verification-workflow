const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  refresh_token: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true
  }
}, { timestamps: true });

const Token = mongoose.model("tokens", tokenSchema);
module.exports = Token
