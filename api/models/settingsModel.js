const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  trialDays: {
    type: Number,
  },
  notification: {
    type: Boolean,
  },

});
serviceSchema.set("timestamps", true);
module.exports = mongoose.model("setting", serviceSchema);
