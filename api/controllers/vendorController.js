const Vendor = require("../models/vendorModel");

exports.createVendor = async (req, res) => {
  try {
    const userId = req.params.id;
    const vendorData = req.body;
    const vendor = await Vendor.create({
      vendorName: vendorData.vendorName,
      vendorShopName: vendorData.vendorShopName,
      mobileNo: vendorData.mobileNo,
      email: vendorData.email,
      address: vendorData.address,
      gstIn: vendorData.gstIn,
      panCard: vendorData.panCard,
      vendorReferanceId: vendorData.vendorReferanceId,
      userId: userId,
    });
    res.status(200).json({
      success: true,
      message: "vendor create successfully",
      data: vendor,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendorData = req.body;
    const vendor = await Vendor.findByIdAndUpdate(vendorId, vendorData, {
      new: true,
      runValidators: true,
      userFindAndModify: true,
    });
    res.status(200).json({
      success: true,
      message: "vendor update successfully",
      data: vendor,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getAllVendorForSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await Vendor.find({ userId: userId });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = data.slice(skip, skip + pageSize);

    if (page > totalPages) {
      return res.status(404).json({
        status: false,
        message: "No data found",
      });
    }
    if (data.length === 0) {
      res
        .status(200)
        .json({ message: "No job find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "Get All Vendor For Single User successfully",
        count: result.length,
        page,
        totalPages,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getSingleVendorDetail = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const data = await Vendor.findById(vendorId);
    res.status(200).json({
      status: true,
      message: "Get Single Vendor Detail successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.deleteSingleVendorDetail = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const data = await Vendor.findByIdAndDelete(vendorId);
    res.status(200).json({
      status: true,
      message: "delete Single Vendor Detail successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};
