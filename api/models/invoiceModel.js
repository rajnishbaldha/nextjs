const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  mobileNo: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  chassisNumber: {
    type: String,
  },
  engineNumber: {
    type: String,
  },
  remark: {
    type: String,
  },
  vehicleType: {
    type: String,
  },
  vehicleCompany: {
    type: String,
  },
  vehicleModel: {
    type: String,
  },
  vehiclePlateNumber: {
    type: String,
  },
  kilometer: {
    type: String,
  },
  fuelType: {
    type: String,
  },
  fuelIndicator: {
    type: String,
  },
  repiarTag: {
    type: Array,
  },
  services: [
    {
      servicesName: {
        type: String,
      },
      price: {
        type: Number,
      },
      tax: {
        type: Number,
      },
      Quantity: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
  ],
  spareParts: [
    {
      sparePartsName: {
        type: String,
      },
      price: {
        type: Number,
      },
      tax: {
        type: Number,
      },
      Quantity: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
  ],
  selectPackage: [
    {
      selectPackagesName: {
        type: String,
      },
      price: {
        type: Number,
      },
      tax: {
        type: Number,
      },
      Quantity: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
  ],
  isGst: {
    type: Boolean,
  },
  gstNo: {
    type: String,
  },
  status: {
    type: String,
    default: "create",
  },
  totalPayment: {
    type: Number,
  },
  receivePayment: {
    type: Number,
    default: 0,
  },
  duePayment: {
    type: Number,
    default: 0,
  },
  servicesTotalAmount: {
    type: Number,
    default: 0,
  },
  partsTotalAmount: {
    type: Number,
    default: 0,
  },
  packageTotalAmount: {
    type: Number,
    default: 0,
  },
  isPaymentStatus: {
    type: String,
  },
  checkList: {
    type: Array,
  },
  vehicleImages: {
    type: Array,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
invoiceSchema.set("timestamps", true);
module.exports = mongoose.model("Invoice", invoiceSchema);
