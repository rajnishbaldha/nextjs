const Part = require("../models/partModel");
const PartDetail = require("../models/partDetailModel");

exports.addPart = async (req, res) => {
  try {
    const id = req.params.id;
    const part = await Part.create({
      partName: req.body.partName,
      userType: req.body.userType,
      userId: id,
    });
    res.status(200).json({
      success: true,
      message: "part add successfully",
      data: part,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.multiplePartAdd = async (req, res) => {
  try {
    const id = req.params.id;
    const partData = req.body;
    for (let i = 0; i < partData.partName.length; i++) {
      await Part.create({
        partName: partData.partName[i],
        userType: 1,
        userId: id,
      });
    }
    const data = await Part.find();
    res.status(200).json({
      success: true,
      message: "part add successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.addPartDetailByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const partDetail = await PartDetail.create({
      partName: req.body.partName,
      partType: req.body.partType,
      partNumber: req.body.partNumber,
      partPurchasePrice: req.body.partPurchasePrice,
      partSalePrice: req.body.partSalePrice,
      inStock: req.body.inStock,
      minStock: req.body.minStock,
      rack: req.body.rack,
      hsn: req.body.hsn,
      shopName: req.body.shopName,
      workShopName: req.body.workShopName,
      workShopAddress: req.body.workShopAddress,
      discription: req.body.discription,
      userId: userId,
    });
    res.status(200).json({
      success: true,
      message: "part detail add successfully",
      data: partDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getAllPartForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userPart = await PartDetail.find({ userId: userId });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = userPart.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = userPart.slice(skip, skip + pageSize);

    if (page > totalPages) {
      return res.status(200).json({
        status: false,
        message: "No data found",
      });
    }
    if (userPart.length === 0) {
      res
        .status(200)
        .json({ message: "No part find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "Get all user part.",
        count: result.length,
        page,
        totalPages,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getAllPartForAdmin = async (req, res) => {
  try {
    const adminPart = await Part.find({ userType: 1 });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = adminPart.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = adminPart.slice(skip, skip + pageSize);

    if (page > totalPages) {
      return res.status(200).json({
        status: false,
        message: "No data found",
      });
    }
    if (adminPart.length === 0) {
      res
        .status(200)
        .json({ message: "No part find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "Get all user part.",
        count: result.length,
        page,
        totalPages,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getSinglePart = async (req, res) => {
  try {
    const id = req.params.id;
    const part = await Part.findById(id);
    res.status(200).json({
      status: true,
      message: "Get single Part.",
      data: part,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getSinglePartDetailByUser = async (req, res) => {
  try {
    const partId = req.params.id;
    const partDetail = await PartDetail.findById(partId);
    if (partDetail) {
      res.status(200).json({
        status: true,
        message: "Get single part detail.",
        data: partDetail,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "not found part detail.",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.updateSinglePartDetailByUser = async (req, res) => {
  try {
    const id = req.params.id;
    await PartDetail.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const partDetail = await PartDetail.findById(id);
    res.status(200).json({
      status: true,
      message: "update single part detail.",
      data: partDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.updateSinglePartByAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await Part.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const part = await Part.findById(id);
    res.status(200).json({
      status: true,
      message: "update single part detail.",
      data: part,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.deleteSinglePartDetailInPartDetail = async (req, res) => {
  try {
    const id = req.params.id;
    await PartDetail.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "delete single part detail.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.deleteSinglePartInPart = async (req, res) => {
  try {
    const id = req.params.id;
    await Part.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "delete single part detail.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getUserAllPartDetail = async (req, res) => {
  try {
    const data = await PartDetail.find({ userId: req.body.userId });
    res.status(200).json({
      status: true,
      message: "user part details listing successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getStockinOut = async (req, res) => {
  try {
    let partDetail;
    if (req.body.stock === "in") {
      partDetail = await PartDetail.find({
        userId: req.body.userId,
        inStock: { $ne: 0 },
      });
    } else if (req.body.stock === "out") {
      partDetail = await PartDetail.find({
        userId: req.body.userId,
        inStock: 0,
      });
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = partDetail.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = partDetail.slice(skip, skip + pageSize);

    if (page > totalPages) {
      return res.status(200).json({
        status: false,
        message: "No data found",
      });
    }
    if (partDetail.length === 0) {
      res
        .status(200)
        .json({ message: "No part find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "Get all user part.",
        count: result.length,
        page,
        totalPages,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};
