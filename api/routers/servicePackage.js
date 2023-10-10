const express = require("express");
const { verifyToken } = require("../middelware/auth");
const { addServicePackageforSingleUser, getAllServicePackageforSingleUser, getSingleServicePackageDetailforsingleUser, updateSingleServicePackageDetailforsingleUser, deleteSingleServicePackageDetailforsingleUser, servicePackageSearch } = require("../controllers/servicePackageController");
const Router = express.Router();

Router.post(
  "/add_service_package_for_single_user/:id",
  verifyToken,
  addServicePackageforSingleUser
);
Router.get(
  "/get_all_services_package_for_single_user/:id",
  verifyToken,
  getAllServicePackageforSingleUser
);
Router.get(
  "/get_single_service_package_detail_for_single_user/:id",
  verifyToken,
  getSingleServicePackageDetailforsingleUser
);
Router.put(
  "/update_single_service_package_detail_for_single_user/:id",
  verifyToken,
  updateSingleServicePackageDetailforsingleUser
);

Router.delete(
  "/delete_single_service_package_detail_for_single_user/:id",
  verifyToken,
  deleteSingleServicePackageDetailforsingleUser
);
Router.get(
  "/search_service_package_form_single_user/:id",
  verifyToken,
  servicePackageSearch
);

module.exports = Router;
