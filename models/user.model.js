const mongoose = require("mongoose");
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });

userSchema.pre("save", function () {
  console.log("saved success")
});

userSchema.pre("deleteOne", function () {
  console.log("removed")
});

const User = mongoose.model("users", userSchema);
module.exports = User
