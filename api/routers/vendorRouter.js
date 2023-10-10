const express = require("express");
const { verifyToken } = require("../middelware/auth");
const { createVendor, updateVendor, getAllVendorForSingleUser, getSingleVendorDetail } = require("../controllers/vendorController");
const router = express.Router();

router.post("/vendor/create/:id", verifyToken, createVendor);
router.put("/vendor/update/:id", verifyToken, updateVendor);
router.get("/vendor/get_all_vendor_for_single_user/:id", verifyToken, getAllVendorForSingleUser);
router.get("/vendor/get_vendor_detail/:id", verifyToken, getSingleVendorDetail);
router.delete("/vendor/delete_vendor_detail/:id", verifyToken, getSingleVendorDetail);
// router.delete("/admin/delete/:id", verifyToken, deleteAdmin);
// router.get("/admin/get", verifyToken, getAdmin);
// router.get("/admin/search/:id", adminSearch);
// router.get("/admin/search", verifyToken, getAdminBySearch);
// router.post("/admin/login", loginAdmin);
// router.get("/subadmin/count", getSubAdmin);
// router.post("/reset/password/:id", verifyToken, resetPassword);

module.exports = router;
