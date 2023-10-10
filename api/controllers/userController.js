const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const sendEmail = require("../middelware/sendMail");
const Part = require("../models/partModel");
const PartDetail = require("../models/partDetailModel");

// user google login
exports.loginWithGoogle = async (req, res) => {
  try {
    const {
      ownerName,
      garageType,
      email,
      mobileNo,
      googleId,
      image,
      deviceToken,
    } = req.body;
    const find = await User.findOne({ email: email });
    if (find) {
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: find,
      });
    } else {
      const data = await User.create({
        ownerName: ownerName,
        email: email,
        mobileNo: mobileNo,
        image: image,
        googleId: googleId,
        deviceToken: deviceToken,
        isVerify: true,
        garageType: garageType,
      });
      data.token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      await data.save();

      const adminParts = await Part.find();
      const adminData = JSON.parse(JSON.stringify(adminParts));
      adminData.forEach(async (part) => {
        await PartDetail.create({
          partName: part.partName,
          partType: null,
          partNumber: 0,
          partPurchasePrice: 0,
          partSalePrice: 0,
          inStock: 0,
          minStock: 0,
          rack: null,
          hsn: null,
          shopName: null,
          workShopName: null,
          workShopAddress: null,
          discription: null,
          userId: data._id,
        });
      });
      res.status(200).send({
        success: true,
        message: "user create successfully",
        user: adminParts,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

// user facebook login
exports.loginWithFacebook = async (req, res) => {
  try {
    const {
      ownerName,
      garageType,
      email,
      mobileNo,
      facebookId,
      image,
      deviceToken,
    } = req.body;
    const find = await User.findOne({ email: email });
    if (find) {
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: find,
      });
    } else {
      const data = await User.create({
        ownerName: ownerName,
        email: email,
        mobileNo: mobileNo,
        image: image,
        facebookId: facebookId,
        deviceToken: deviceToken,
        isVerify: true,
        garageType: garageType,
      });
      data.token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      await data.save();
      const adminParts = await Part.find();
      const adminData = JSON.parse(JSON.stringify(adminParts));
      adminData.forEach(async (part) => {
        await PartDetail.create({
          partName: part.partName,
          partType: null,
          partNumber: 0,
          partPurchasePrice: 0,
          partSalePrice: 0,
          inStock: 0,
          minStock: 0,
          rack: null,
          hsn: null,
          shopName: null,
          workShopName: null,
          workShopAddress: null,
          discription: null,
          userId: data._id,
        });
      });
      res.status(200).send({
        success: true,
        message: "user create successfully",
        user: data,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "something went wrong",
    });
  }
};

//simple login
exports.simpleLogin = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (!data) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const user = await User.create({
        email: req.body.email,
        otp: otp,
        isVerify: false,
      });
      sendEmail(
        req.body.email,
        "Verify Your OTP",
        `your otp is ${otp} Do not share it`
      );
      res.status(200).json({
        success: true,
        message: `email send successfully to ${req.body.email}`,
      });
    } else {
      const data = await User.findOne({ email: req.body.email });
      data.token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      await data.save();
      if (data.isVerify) {
        res.status(200).json({
          success: true,
          message: "user login successfully",
          data: data,
        });
      } else {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await User.findByIdAndUpdate(
          data._id,
          {
            otp: otp,
            isVerify: false,
          },
          { new: true }
        );
        sendEmail(
          req.body.email,
          "Verify Your OTP",
          `your otp is ${otp} Do not share it`
        );
        res.status(200).json({
          success: true,
          message: `email send successfully to ${req.body.email}`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

// verify otp
exports.verifyOtp = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (data.isVerify) {
      res.status(200).json({
        success: true,
        message: `you are already verify please login`,
      });
    } else {
      const date1 = new Date(data.updatedAt); // Replace with your desired date and time
      const date2 = new Date();
      const timeDifference = date2.getTime() - date1.getTime();
      const fiveMinutesInMilliseconds = 5 * 60 * 1000;
      if (timeDifference < fiveMinutesInMilliseconds) {
        if (data.otp === req.body.otp) {
          data.isVerify = true;
          data.otp = null;
          data.token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          });
          await data.save();
          const adminParts = await Part.find();
          const adminData = JSON.parse(JSON.stringify(adminParts));
          adminData.forEach(async (part) => {
            await PartDetail.create({
              partName: part.partName,
              partType: null,
              partNumber: 0,
              partPurchasePrice: 0,
              partSalePrice: 0,
              inStock: 0,
              minStock: 0,
              rack: null,
              hsn: null,
              shopName: null,
              workShopName: null,
              workShopAddress: null,
              discription: null,
              userId: data._id,
            });
          });
          res.status(200).json({
            success: true,
            data: data,
            message: `login successfully`,
          });
        } else {
          res.status(400).json({
            success: false,
            message: `invalid otp`,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: `otp expire`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

//resend otp
exports.resendOtp = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (!data) {
      res.status(400).json({
        success: false,
        message: "user not found",
      });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      data.otp = otp;
      await data.save();
      sendEmail(
        req.body.email,
        "Verify Your OTP",
        `your otp is ${otp} Do not share it`
      );
      res.status(200).json({
        success: true,
        message: `email send successfully to ${req.body.email}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getSingleUserDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "user Detail get successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateSingleUserDetail = async (req, res) => {
  try {
    console.log(req.body.startDate);
    const id = req.params.id;
    const user = await User.findById(id);

    if (req.body.ownerName) {
      user.ownerName = req.body.ownerName;
    }
    if (req.body.mobileNo) {
      user.mobileNo = req.body.mobileNo;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.block) {
      user.isBlock = req.body.isBlock;
    }
    if (req.body.workShopAddress) {
      user.workShopAddress = req.body.workShopAddress;
    }
    if (req.body.workShopName) {
      user.workShopName = req.body.workShopName;
    }
    if (req.body.startDate) {
      user.startDate = req.body.startDate;
    }
    if (req.body.endDate) {
      user.endDate = req.body.endDate;
    }
    if (req.files?.["image"]) {
      if (user.image) {
        fs.unlink(user.image, function (err) {
          if (err && err.code == "ENOENT") {
            console.info("File doesn't exist, won't remove it.");
          } else if (err) {
            console.error("Error occurred while trying to remove file");
          } else {
            console.info(`removed`);
          }
        });
      }

      user.image = req.files["image"][0].path;
    }
    if (req.files?.["image2"]) {
      if (user.signature) {
        fs.unlink(user.signature, function (err) {
          if (err && err.code == "ENOENT") {
            console.info("File doesn't exist, won't remove it.");
          } else if (err) {
            console.error("Error occurred while trying to remove file");
          } else {
            console.info(`removed`);
          }
        });
      }

      user.signature = req.files["image2"][0].path;
    }
    await user.save();
    res
      .status(200)
      .json({ data: user, message: "Updated user", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const data = await User.find().sort({ createdAt: -1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = data.slice(skip, skip + pageSize);

    if (page > totalPages) {
      return res.status(404).json({
        status: false,
        message: "No data found",
      });
    }
    if (data.length === 0) {
      res
        .status(200)
        .json({ message: "No job find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "Get all User.",
        count: result.length,
        page,
        totalPages,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

exports.deleteSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted User", success: true });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};

exports.logOutUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    data.deviceToken = null;
    await data.save();
    res.status(200).json({
      success: true,
      message: "user log out.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

//search User
exports.getUserBySearch = async (req, res) => {
  try {
    let event = req.query.search;
    event = event.split(" ").join("").trim();

    const regEvent = new RegExp(event, "i");

    let user = await User.find({
      $or: [
        { workShopName: regEvent },
        { ownerName: regEvent },
        { email: regEvent },
        { mobileNo: regEvent },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Event listing successful...",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};
