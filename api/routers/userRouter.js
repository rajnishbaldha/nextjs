const express = require("express");
const {
  userRegister,
  getSingleUserDetail,
  updateSingleUserDetail,
  getAllUser,
  deleteSingleUser,
  phoneNumberVerified,
  otpVerifiedUser,
  logOutUser,
  loginWithGoogle,
  loginWithFacebook,
  simpleLogin,
  verifyOtp,
  resendOtp,
  getUserBySearch,
} = require("../controllers/userController");
const upload = require("../middelware/fileUpload");
const { verifyToken } = require("../middelware/auth");
const Router = express.Router();


Router.post("/google_login",  loginWithGoogle);
Router.post("/facebook_login",  loginWithFacebook);
Router.post("/login",  simpleLogin);
Router.post("/verify/otp",  verifyOtp);
Router.post("/resend/otp",  resendOtp);
Router.get("/get_single_detail/:id", verifyToken, getSingleUserDetail);
Router.put(
  "/update_single_user/:id",
  upload.fields([{ name: "image" }, { name: "image2" }]),
  verifyToken,
  updateSingleUserDetail
);
Router.get("/get_all_user", verifyToken, getAllUser);
Router.delete("/delete_single_user/:id", verifyToken, deleteSingleUser);
Router.put("/log_out_user/:id", verifyToken, logOutUser);
Router.get("/user/search", verifyToken,getUserBySearch);

module.exports = Router;
