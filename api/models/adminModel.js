const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  module: {
    type: Array,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    // minLength: [8, "Password should be greater than 8 characters"],
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    default: "subAdmin",
  },
});

adminSchema.set("timestamps", true);
adminSchema.index({ createdAt: 1 });

adminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// hasing password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
// Compare Password

adminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);