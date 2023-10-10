const express = require("express");
const {
  addTransaction,
  getTransaction,
  getTransactionBySearch,
  getTotalAmmount,
  getUserPlane,
  updateTransaction,
} = require("../controllers/TransacationController");

const router = express.Router();
const { verifyToken } = require("../middelware/auth");

router.post("/add/transaction", verifyToken, addTransaction);
router.get("/get/transaction/history", verifyToken, getTransaction);
router.get("/search/transaction", verifyToken, getTransactionBySearch);
router.get("/total/ammount/transaction", getTotalAmmount);
router.post("/user/plane", getUserPlane);
router.put("/user/update_transaction/:id", verifyToken, updateTransaction);

// router.get("/allindices",verifyToken,allIndices)

module.exports = router;
