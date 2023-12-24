const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["basic", "admin"],
    default: "basic"
  }
}, { timestamps: true });

userSchema.pre("save", function () {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = bcrypt.genSaltSync(8);
  const hashPassword = bcrypt.hashSync(user.password, salt);
  return user.password = hashPassword
});

userSchema.pre("deleteOne", function () {
  console.log("removed")
});

const User = mongoose.model("users", userSchema);
module.exports = User
