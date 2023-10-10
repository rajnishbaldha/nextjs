const ServicePackage = require("../models/servicePackageModel");

exports.addServicePackageforSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const servicePackageData = req.body;
    const servicePackage = await ServicePackage.create({
      servicePackageName: servicePackageData.serviceName,
      includeServices: servicePackageData.includeServices,
      price: servicePackageData.price,
      userId: id,
    });
    res.status(200).json({
      success: true,
      message: "service added successfully",
      data: servicePackage,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getAllServicePackageforSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ServicePackage.find({ userId: id });
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = data.slice(skip, skip + pageSize);
    if (page > totalPages) {
      return res.status(200).json({
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
        message: "Get all Service.",
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

exports.getSingleServicePackageDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ServicePackage.findById(id);
    res.status(200).json({
      success: true,
      message: "get single service detail for single user successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateSingleServicePackageDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await ServicePackage.findByIdAndUpdate(id, req.body);
    const data = await ServicePackage.findById(id);
    res.status(200).json({
      success: true,
      message: "update single service detail for single user successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.deleteSingleServicePackageDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await ServicePackage.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "delete single service detail for single user successfully",
      data: [],
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

//search subadmin
exports.servicePackageSearch = async (req, res) => {
  try {
    const id = req.params.id;
    let event = req.query.search;
    event = event.split(" ").join("").trim();
    const regfirsname = new RegExp(event, "i"); //this is for we serch meet or Meet or MEET all are same
    // console.log(regfirsname);
    let service = await ServicePackage.find({
      servicePackageName: regfirsname,
      userId: id,
    }).limit(10);
    // console.log(user)
    res.status(200).send({
      message: "event listing successfully.....",
      data: service,
    });
    // console.log(user, "single Admin search");
  } catch (error) {
    res.send("error");
  }
};
