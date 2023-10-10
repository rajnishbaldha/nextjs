const mongoose = require("mongoose");

const carCompanyNameSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  type:{
    type:String,
    default:"car"
  },
  carModel:{
    type:Array
  }
});
carCompanyNameSchema.set("timestamps", true);
module.exports = mongoose.model("carCompanyName", carCompanyNameSchema);
