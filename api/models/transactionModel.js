const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  ammount: {
    type: Number,
    require: true,
  },
  transactionId: {
    type: String,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
});

transactionSchema.set("timestamps", true);
transactionSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);
