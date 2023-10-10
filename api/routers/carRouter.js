const express = require("express");

const { verifyToken } = require("../middelware/auth");
const { multipleCarCompanyName, addCarCompanyModel, addSingleCarCompany, getSingleCarCompanyDetail, updateSingleCarCompanyDetail, deleteSingleCarCompanyDetail, getAllCarCompany,  } = require("../controllers/carController");
const router = express.Router();

router.post("/car/multiple_car_company_name_add", multipleCarCompanyName);
router.put("/car/add_car_company_model/:id", addCarCompanyModel);
router.post("/car/add_single_car_company", addSingleCarCompany);
router.get("/car/get_single_car_company_detail/:id", getSingleCarCompanyDetail);
router.put("/car/update_single_car_company_detail/:id", updateSingleCarCompanyDetail);
router.delete("/car/delete_single_car_company_detail/:id", deleteSingleCarCompanyDetail);
router.get("/car/get_all_car_company", getAllCarCompany);



module.exports = router;