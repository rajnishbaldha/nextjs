const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userType:{
    type:Number
  }
});
serviceSchema.set("timestamps", true);
module.exports = mongoose.model("Service", serviceSchema);
