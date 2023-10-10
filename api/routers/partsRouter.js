const express = require("express");
const { verifyToken } = require("../middelware/auth");
const {
  addPart,
  addPartDetailByUser,
  getAllPartForUser,
  getAllPartForAdmin,
  getSinglePartDetailByUser,
  getSinglePart,
  updateSinglePartDetailByUser,
  updateSinglePartByAdmin,
  deleteSinglePartDetailInPartDetail,
  deleteSinglePartInPart,
  multiplePartAdd,
  getUserAllPartDetail,
  getStockinOut,
} = require("../controllers/partsController");
const Router = express.Router();

Router.post("/add_part/:id", verifyToken, addPart);
Router.post("/add_multiple_part/:id", multiplePartAdd);
Router.post("/add_part_detail_by_user/:id", verifyToken, addPartDetailByUser);
Router.get("/get_all_part_for_user/:id", verifyToken, getAllPartForUser);
Router.get("/get_all_part_for_admin", verifyToken, getAllPartForAdmin);
Router.get("/get_single_part/:id", verifyToken, getSinglePart);
Router.get(
  "/get_single_part_detail_by_user/:id",
  verifyToken,
  getSinglePartDetailByUser
);
Router.put(
  "/update_single_part_detail_by_user/:id",
  verifyToken,
  updateSinglePartDetailByUser
);
Router.put(
  "/update_single_part_by_admin/:id",
  verifyToken,
  updateSinglePartByAdmin
);

Router.delete(
  "/delete_single_part_detail_in_part_detail/:id",
  verifyToken,
  deleteSinglePartDetailInPartDetail
);
Router.put(
  "/delete_single_part_in_part_/:id",
  verifyToken,
  deleteSinglePartInPart
);
Router.post(
  "/get_all_user_part_details",
  verifyToken,
  getUserAllPartDetail
);
Router.post(
  "/stock_inor_out",
  verifyToken,
  getStockinOut
);

module.exports = Router;
