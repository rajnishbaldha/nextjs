const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  workShopName: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  workShopAddress: {
    type: String,
  },
  token: {
    type: String,
  },

  mobileNo: {
    type: String,
  },
  image: {
    type: String,
  },
  deviceToken: {
    type: String,
  },
  garageType: {
    type: String,
  },
  isExpire: {
    type: Boolean,
    default: true,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  isVerify: {
    type: Boolean,
  },
  isRegister: {
    type: Number,
    default: 0,
  },
  signature: {
    type: String,
  },
  otp: {
    type: Number,
  },
  isBlock: {
    type: Boolean,
    default: true,
  },
  endDate: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  repairOrder: {
    type: {
      create: {
        type: Boolean,
        default: true,
      },
      modify: {
        type: Boolean,
        default: true,
      },

      view: {
        type: Boolean,
        default: true,
      },
      delete: {
        type: Boolean,
        default: true,
      },
      price: {
        type: Boolean,
        default: true,
      },
    },
    default: {
      create: true,
      modify: true,
      view: true,
      delete: true,
      price: true,
    },
  },

  counterSale: {
    type: {
      create: {
        type: Boolean,
        default: true,
      },
      modify: {
        type: Boolean,
        default: true,
      },
      view: {
        type: Boolean,
        default: true,
      },
      delete: {
        type: Boolean,
        default: true,
      },
    },
    default: {
      create: true,
      modify: true,
      view: true,
      delete: true,
    },
  },
  purchaseOrder: {
    type: {
      create: {
        type: Boolean,
        default: true,
      },
      modify: {
        type: Boolean,
        default: true,
      },
      view: {
        type: Boolean,
        default: true,
      },
      delete: {
        type: Boolean,
        default: true,
      },
    },
    default: {
      create: true,
      modify: true,
      view: true,
      delete: true,
    },
  },
  appointment: {
    type: {
      create: {
        type: Boolean,
        default: true,
      },
      modify: {
        type: Boolean,
        default: true,
      },
      view: {
        type: Boolean,
        default: true,
      },
      delete: {
        type: Boolean,
        default: true,
      },
    },
    default: {
      create: true,
      modify: true,
      view: true,
      delete: true,
    },
  },
  accounts: {
    type: {
      create: {
        type: Boolean,
        default: true,
      },
      modify: {
        type: Boolean,
        default: true,
      },
      view: {
        type: Boolean,
        default: true,
      },
      delete: {
        type: Boolean,
        default: true,
      },
      income: {
        type: Boolean,
        default: true,
      },
      paymentDue: {
        type: Boolean,
        default: true,
      },
    },
    default: {
      create: true,
      modify: true,
      view: true,
      delete: true,
      income: true,
      paymentDue: true,
    },
  },
  workshopeDetail: {
    type: {
      edit: {
        type: Boolean,
        default: true,
      },
      userAccess: {
        type: Boolean,
        default: true,
      },
      employee: {
        type: Boolean,
        default: true,
      },
      vendors: {
        type: Boolean,
        default: true,
      },
      reports: {
        type: Boolean,
        default: true,
      },
      downloadReports: {
        type: Boolean,
        default: true,
      },
      itemMaster: {
        type: Boolean,
        default: true,
      },
      packageMaster: {
        type: Boolean,
        default: true,
      },
    },
    default: {
      userAccess: true,
      edit: true,
      employee: true,
      vendors: true,
      reports: true,
      downloadReports: true,
      itemMaster: true,
      packageMaster: true,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.index({ type: 1 });

userSchema.set("timestamps", true);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
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

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
