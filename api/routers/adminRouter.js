const express = require("express");
const {
  loginAdmin,
  insertUser,
  updateAdmin,
  deleteAdmin,
  getAdmin,
  getAdminBySearch,
  adminSearch,
  resetPassword,
  getSubAdmin,
} = require("../controllers/adminController");
const { verifyToken } = require("../middelware/auth");
const router = express.Router();

router.post("/admin/registration", insertUser);
router.put("/admin/update/:id", verifyToken, updateAdmin);
router.delete("/admin/delete/:id", verifyToken, deleteAdmin);
router.get("/admin/get", verifyToken, getAdmin);
router.get("/admin/search/:id", adminSearch);
router.get("/admin/search", verifyToken, getAdminBySearch);
router.post("/admin/login", loginAdmin);
router.get("/subadmin/count", getSubAdmin);
router.post("/reset/password/:id", verifyToken, resetPassword);

module.exports = router;