const express = require("express");
const { verifyToken } = require("../middelware/auth");
const {
  addRepairTagforSingleUser,
  getAllRepairTagforSingleUser,
  getSingleRepairTagDetailforsingleUser,
  updateSingleRepairTagDetailforsingleUser,
  deleteSingleRepairTagDetailforsingleUser,
  RepairTagSearch,
} = require("../controllers/repairTagController");
const Router = express.Router();

Router.post(
  "/add_repair_tag_for_single_user/:id",
  verifyToken,
  addRepairTagforSingleUser
);
Router.get(
  "/get_all_repair_tag_for_single_user/:id",
  verifyToken,
  getAllRepairTagforSingleUser
);
Router.get(
  "/get_single_service_detail_for_single_user/:id",
  verifyToken,
  getSingleRepairTagDetailforsingleUser
);
Router.put(
  "/update_single_service_detail_for_single_user/:id",
  verifyToken,
  updateSingleRepairTagDetailforsingleUser
);

Router.delete(
  "/delete_single_service_detail_for_single_user/:id",
  verifyToken,
  deleteSingleRepairTagDetailforsingleUser
);
Router.get("/search_service_form_single_user/:id", verifyToken, RepairTagSearch);

module.exports = Router;
