const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

exports.insertUser = async (req, res) => {
  try {
    const { name, phoneNo, email, password, module } = req.body;
    let user = await Admin.findOne({ email: email });
    if (user) {
      return res.status(200).json({
        success: false,
        message: "Admin already exists",
      });
    }
    user = await Admin.create({
      name,
      phoneNo,
      email,
      password,
      module,
    });
    token = user.getJWTToken();
    user.token = token;
    await user.save();

    res.status(200).json({
      success: true,
      message: "user register successfully",
      data: user,
    });
    // console.log(user, "Insert admin");
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        message: "please Enter Email & Password",
      });
    }
    const user = await Admin.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    token = user.getJWTToken();
    user.token = token;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Login Successfully...",
      data: user,
    });
    // console.log(user, "Login Admin");
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

//update subAdmin
exports.updateAdmin = async (req, res) => {
  try {
    const _id = req.params.id;
    let newUserData = req.body;
    const adminFind = await Admin.findById(_id);
    if (newUserData.password) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
    } else {
      newUserData.password = adminFind.password;
    }
    // console.log("first");
    // console.log(newUserData.userStatus);
    const user = await Admin.findByIdAndUpdate(_id, newUserData, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });
    console.log(user);
    res.status(200).send({
      success: true,
      message: "User Updated successfully.....",
      data: user,
    });
    // console.log(user, "Update Admin");
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

// delete subadmin
exports.deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: "User Delete successfully.....",
    });
    // console.log("delete Admin ");
  } catch (error) {
    res.status(400).send(error);
  }
};

// get all subadmin
exports.getAdmin = async (req, res) => {
  try {
    // console.log("user");
    let user = Admin.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * pageSize;
    const total = await Admin.countDocuments();
    const totalPages = Math.ceil(total / pageSize);
    user = user.skip(skip).limit(pageSize);
    if (page > totalPages) {
      return res.status(201).json({
        success: false,
        message: "No data found",
      });
    }
    const result = await user;
    res.status(200).send({
      success: true,
      message: "User listing successfully....",
      count: result.length,
      page,
      totalPages,
      data: result,
    });
    // console.log(result, "Admin get Result");
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

//search subadmin
exports.getAdminBySearch = async (req, res) => {
  try {
    let event = req.query.search;
    event = event.split(" ").join("").trim();
    // console.log(event)
    const regfirsname = new RegExp(event, "i"); //this is for we serch meet or Meet or MEET all are same
    // console.log(regfirsname);
    let user = await Admin.find({ name: regfirsname });
    // console.log(user)
    res.status(200).send({
      message: "event listing successfully.....",
      data: user,
    });
    // console.log(user, "single Admin search");
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

// get single admin data
exports.adminSearch = async (req, res) => {
  try {
    const data = await Admin.findById(req.params.id);
    res.status(200).send({
      message: "admin listing successfully.....",
      data: data,
    });
    // console.log(data, "admin search");
  } catch (error) {
    res.send("error");
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    let user = await Admin.findById(req.params.id).select("+password");
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatch) {
      res.status(200).send({
        message: "old Password is incorrect",
      });
    } else {
      if (req.body.newPassword !== req.body.confirmPassword) {
        res.status(200).send({
          message: "password dose not match",
        });
      } else {
        user.password = req.body.newPassword;
        await user.save();
        res.status(200).send({
          message: "Password Update successfully.....",
          data: user,
        });
      }
    }
    // console.log(user, "reset password successfully admin");
  } catch (error) {
    res.send("error");
  }
};

// subAdmin length
exports.getSubAdmin = async (req, res) => {
  try {
    const data = await Admin.find({ role: "subAdmin" });
    res.status(200).send({
      success: true,
      message: "subadmin length count successfully...",
      data: data.length,
    });
    // console.log(data.length, "length find successfully in admin side");
  } catch (error) {
    res.send("error");
  }
};
