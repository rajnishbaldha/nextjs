const express = require("express");

const { verifyToken } = require("../middelware/auth");
const {
  sumOfPrice,
  accountInvoiceList,
} = require("../controllers/accountController");
const router = express.Router();

router.get("/sum/ammount/:id", verifyToken, sumOfPrice);
router.post("/account_invoice_list/:id", verifyToken, accountInvoiceList);

module.exports = router;
