const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },
  password: {
    type: String,
  },
  employeeId: {
    type: Number,
  },
  token: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  repairOrder: {
    type: {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
     
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
      price: {
        type: Boolean,
        default: false,
      },
    },
    default: {
      create: false,
      modify: false,
      view: false,
      delete: false,
      price: false,
    },
  },

  counterSale: {
    type: {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    default: {
      create: false,
      modify: false,
      view: false,
      delete: false,
    },
  },
  purchaseOrder: {
    type: {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    default: {
      create: false,
      modify: false,
      view: false,
      delete: false,
    },
  },
  appointment: {
    type: {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    default: {
      create: false,
      modify: false,
      view: false,
      delete: false,
    },
  },
  accounts: {
    type: {
      create: {
        type: Boolean,
        default: false,
      },
      modify: {
        type: Boolean,
        default: false,
      },
      view: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
      income: {
        type: Boolean,
        default: false,
      },
      paymentDue: {
        type: Boolean,
        default: false,
      },
    },
    default: {
      create: false,
      modify: false,
      view: false,
      delete: false,
      income: false,
      paymentDue: false,
    },
  },
  workshopeDetail: {
    type: {
      edit: {
        type: Boolean,
        default: false,
      },
      userAccess: {
        type: Boolean,
        default: false,
      },
      employee: {
        type: Boolean,
        default: false,
      },
      vendors: {
        type: Boolean,
        default: false,
      },
      reports: {
        type: Boolean,
        default: false,
      },
      downloadReports: {
        type: Boolean,
        default: false,
      },
      itemMaster: {
        type: Boolean,
        default: false,
      },
      packageMaster: {
        type: Boolean,
        default: false,
      },
    },
    default: {
      userAccess: false,
      edit: false,
      employee: false,
      vendors: false,
      reports: false,
      downloadReports: false,
      itemMaster: false,
      packageMaster: false,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

employeeSchema.index({ type: 1 });

employeeSchema.set("timestamps", true);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// JWT TOKEN
employeeSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generating Password Reset Token
employeeSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};
// Compare Password

employeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("employee", employeeSchema);
