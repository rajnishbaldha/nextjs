const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
  },
  vendorShopName:{
    type: String,
  },
  mobileNo: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  gstIn: {
    type: String,
  },
  panCard: {
    type: String,
  },
  vendorReferanceId: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  dueAmount: {
    type: Number,
    default: 0,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
});

vendorSchema.set("timestamps", true);
module.exports = mongoose.model("vendor", vendorSchema);
