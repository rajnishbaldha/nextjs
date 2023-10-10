const express = require("express");
const { verifyToken } = require("../middelware/auth");
const upload = require("../middelware/fileUpload");
const {
  createInvoice,
  getSingleInvoiceDetail,
  deleteSingleInvoiceDetail,
  updateInvoice,
  deleteSinglePartsOrServiceFromInvoice,
  allInvoiceforSingleUser,
  getStatusWiseInvoiceForSingleUser,
  statusCountingInvoice,
  getInvoiceBySearch,
} = require("../controllers/invoiceController");
const Router = express.Router();

Router.post("/create_invoice/:id", verifyToken, createInvoice);
Router.get(
  "/get_single_invoice_detail/:id",
  verifyToken,
  getSingleInvoiceDetail
);
Router.delete(
  "/delete_single_invoice_detail/:id",
  verifyToken,
  deleteSingleInvoiceDetail
);
Router.put(
  "/update_single_invoice_detail/:id",
  upload.array("image"),
  verifyToken,
  updateInvoice
);
Router.put(
  "/delete_single_parts_or_service_from_invoice/:id",
  // verifyToken,
  deleteSinglePartsOrServiceFromInvoice
);

Router.get(
  "/get_all_invoice_for_single_user/:id",
  // verifyToken,
  allInvoiceforSingleUser
);

Router.get(
  "/get_status_wise_invoice_for_single_user/:id",
  // verifyToken,
  getStatusWiseInvoiceForSingleUser
);

Router.get("/status_counting_invoice/:id", 
// verifyToken,
 statusCountingInvoice);

Router.get("/invoice/search/:id", 
// verifyToken,
 getInvoiceBySearch);

module.exports = Router;
