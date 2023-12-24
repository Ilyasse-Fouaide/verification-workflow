const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
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
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedAt: Date
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

userSchema.methods.genToken = function () {
  const refresh_token = jwt.sign({
    userId: this._id,
    username: this.username,
    role: this.role
  }, config.JWT_SECRET, { expiresIn: config.JWT_LIFETIME });

  return refresh_token;
}

userSchema.methods.comparePassword = async function (password, hash) {
  return await bcrypt.compare(password, hash)
}

const User = mongoose.model("users", userSchema);
module.exports = User
