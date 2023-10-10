const VendorBillData = require("../models/vendorBillModel");

exports.createVendorBill = async (req, res) => {
  try {
    const userId = req.params.id;
    const vendorBillData = req.body;
    const data = await VendorBillData.create({
      userId: userId,
      vendorId: vendorBillData.vendorId,
      partDetailId: vendorBillData.partDetailId,
      quantity: vendorBillData.quantity,
      price: vendorBillData.price,
      totalAmount: vendorBillData.totalAmount,
      pendingAmount: vendorBillData.pendingAmount,
      dueAmount: vendorBillData.dueAmount,
    });

    res.status(200).json({
      success: true,
      message: "vendor bill create successfully.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getSingleVendorBillDetail = async (req, res) => {
  try {
    const vendorBillId = req.params.id;
    const data = await VendorBillData.findById(vendorBillId)
      .populate("vendorId")
      .populate("partDetailId");
    res.status(200).json({
      success: true,
      message: "get single vendor bill successfully.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getAllVendorBillDetailForSinlgeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await VendorBillData.find({ userId: userId })
      .populate("vendorId")
      .populate("partDetailId");

      
    res.status(200).json({
      success: true,
      message: "get single vendor bill successfully.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};
