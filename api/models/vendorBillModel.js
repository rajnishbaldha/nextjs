const mongoose = require("mongoose");

const vendorBillSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "pending",
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  partDetailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPart",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  pendingAmount: {
    type: Number,
    default: 0,
  },
  dueAmount: {
    type: Number,
    default: 0,
  },
  amountStatus: {
    type: String,
    default: "ordered",
  },
});
a
vendorBillSchema.set("timestamps", true);
module.exports = mongoose.model("vendorBill", vendorBillSchema);
