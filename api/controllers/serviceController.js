const Service = require("../models/serviceModel");

exports.addServiceforSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const serviceData = req.body;
    const service = await Service.create({
      serviceName: serviceData.serviceName,
      userId: id,
      userType: serviceData.userType,
    });
    res.status(200).json({
      success: true,
      message: "service added successfully",
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getAllServiceforSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data1 = await Service.find({ userType: 1 });
    const data2 = await Service.find({ userId: id });
    const newData = [...data1, ...data2];
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = newData.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = newData.slice(skip, skip + pageSize);
    if (page > totalPages) {
      return res.status(200).json({
        status:false,
        message: "No data found",
      });
    }
    if (newData.length === 0) {
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

exports.getSingleServiceDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Service.findById(id);
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

exports.updateSingleServiceDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Service.findByIdAndUpdate(id, req.body);
    const data = await Service.findById(id);
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

exports.deleteSingleServiceDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Service.findByIdAndDelete(id);
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
exports.serviceSearch = async (req, res) => {
  try {
    const id = req.params.id;
    let event = req.query.search;
    event = event.split(" ").join("").trim();
    const regfirsname = new RegExp(event, "i"); //this is for we serch meet or Meet or MEET all are same
    // console.log(regfirsname);
    let service = await Service.find({ serviceName: regfirsname, userId: id }).limit(
      10
    );
    let servicefind = await Service.find({
      serviceName: regfirsname,
      userType: 1,
    }).limit(10);
    console.log(servicefind)
    const find2 = [...service, ...servicefind];
    // console.log(user)
    res.status(200).send({
      message: "event listing successfully.....",
      data: find2,
    });
    // console.log(user, "single Admin search");
  } catch (error) {
    res.send("error");
  }
};
