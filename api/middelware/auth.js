const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Employee = require("../models/employeeModel");

exports.verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];
  // console.log(token);
  const user = await User.findOne({ token: token });
  const admin = await Admin.findOne({ token: token });
  const employee = await Employee.findOne({ token: token });
  // console.log(admin);
  if (user || admin || employee) {
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(644).send("Invalid Token");
    }
  } else {
    return res.status(644).send("Session time out");
  }

  return next();
};

exports.isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// module.exports = verifyToken;
