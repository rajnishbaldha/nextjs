const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");

exports.createEmployee = async (req, res) => {
  try {
    const find = await Employee.findOne({ phoneNo: req.body.phoneNo });
    if (find) {
      res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    } else {
      const employeeId = Math.floor(10000000 + Math.random() * 90000000);
      const employeeIdFind = Employee.findOne({ employeeId: employeeId });
      const createEmployee = await Employee.create({
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        password: req.body.password,
        employeeId: employeeIdFind
          ? Math.floor(10000000 + Math.random() * 90000000)
          : employeeId,
        token: jwt.sign({ id: employeeId }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        }),
        repairOrder: req.body.repairOrder,
        counterSale: req.body.counterSale,
        purchaseOrder: req.body.purchaseOrder,
        appointment: req.body.appointment,
        accounts: req.body.accounts,
        workshopeDetail: req.body.workshopeDetail,
      });
      res.status(200).json({
        success: true,
        message: "employee create successfully",
        data: createEmployee,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.garageEmployee = async (req, res) => {
  try {
    const data = await Employee.find({ userId: req.params.id });
    res.status(200).json({
      success: true,
      message: "employee listing successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "employee delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getSingleEmployee = async (req, res) => {
  try {
    const data = await Employee.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "employee listing successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const data = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "employee updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    if (!employeeId || !password) {
      return res.status(400).send({
        message: "please Enter employeeId & Password",
      });
    }
    let user = await Employee.findOne({ employeeId }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid employeeId or Password",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid employeeId or Password",
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

    // console.log(user, "log in user");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};
