const mongoose = require("mongoose");

const userPartSchema = new mongoose.Schema({
  partName: {
    type: String,
  },
  partType: {
    type: String,
  },
  partNumber: {
    type: Number,
  },
  partPurchasePrice: {
    type: Number,
  },
  partSalePrice: {
    type: Number,
  },
  inStock: {
    type: Number,
  },
  minStock: {
    type: Number,
  },
  rack: {
    type: String,
  },
  hsn: {
    type: String,
  },
  shopName: {
    type: String,
  },
  workShopName: {
    type: String,
  },
  workShopAddress: {
    type: String,
  },
  discription: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  partId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Part",
  },
});
userPartSchema.set("timestamps", true);
userPartSchema.index({ userId: 1 });
module.exports = mongoose.model("userPart", userPartSchema);
