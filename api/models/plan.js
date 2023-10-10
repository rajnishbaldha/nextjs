const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  ammount: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    require: true,
  },

  description: {
    type: String,
    required: true,
  },
});

subscriptionSchema.set("timestamps", true);
subscriptionSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Plan", subscriptionSchema);
