const express = require("express");

const router = express.Router();
const {verifyToken} = require("../middelware/auth");
const { insertSubscription, deletePlane, allPlan, updatePlane, getPlaneBySearch } = require("../controllers/planCotroller");

router.post("/add/plan", verifyToken, insertSubscription);
router.delete("/delete/plan/:id", verifyToken, deletePlane);
router.get("/all/plan", verifyToken, allPlan);
router.put("/update/plan/:id", verifyToken, updatePlane);
router.get("/search/plan", verifyToken, getPlaneBySearch);
// router.get("/allindices",verifyToken,allIndices)

module.exports = router;

