const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  partName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userType: {
    type: Number,
  },
});
partSchema.set("timestamps", true);
module.exports = mongoose.model("Part", partSchema);
