const express = require("express");

const { verifyToken } = require("../middelware/auth");
const { multipleBikeCompanyName, addBikeCompanyModel, addSingleBikeCompany, getSingleBikeCompanyDetail, updateSingleBikeCompanyDetail, deleteSingleBikeCompanyDetail, getAllBikeCompany } = require("../controllers/bikeController");
const router = express.Router();

router.post("/bike/multiple_bike_company_name_add", multipleBikeCompanyName);
router.put("/bike/add_bike_company_model/:id", addBikeCompanyModel);
router.post("/bike/add_single_bike_company", addSingleBikeCompany);
router.get("/bike/get_single_bike_company_detail/:id", getSingleBikeCompanyDetail);
router.put(
  "/bike/update_single_bike_company_detail/:id",
  updateSingleBikeCompanyDetail
);
router.delete(
  "/bike/delete_single_bike_company_detail/:id",
  deleteSingleBikeCompanyDetail
);
router.get("/bike/get_all_bike_company", getAllBikeCompany);

module.exports = router;
