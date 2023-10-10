const mongoose = require("mongoose");

const servicePackageSchema = new mongoose.Schema({
  servicePackageName: {
    type: String,
  },
  includeServices:{
    type: Array,
  },
  price:{
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});
servicePackageSchema.set("timestamps", true);
module.exports = mongoose.model("ServicePackage", servicePackageSchema);
