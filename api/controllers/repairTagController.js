const RepairTag = require("../models/repairTagModel");

exports.addRepairTagforSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const repairTagData = req.body;
    const repairTag = await RepairTag.create({
      repairTagName: repairTagData.repairTagName,
      userId: id,
      userType: repairTagData.userType,
    });
    res.status(200).json({
      success: true,
      message: "repairTag added successfully",
      data: repairTag,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong.");
  }
};

exports.getAllRepairTagforSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data1 = await RepairTag.find({ userType: 1 });
    const data2 = await RepairTag.find({ userId: id });
    const newData = [...data1, ...data2];
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = newData.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = newData.slice(skip, skip + pageSize);
    if (page > totalPages) {
      return res.status(200).json({
        status: false,
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
        message: "Get all Repair Tag.",
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

exports.getSingleRepairTagDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await RepairTag.findById(id);
    res.status(200).json({
      success: true,
      message: "get single Repair Tag detail for single user successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateSingleRepairTagDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await RepairTag.findByIdAndUpdate(id, req.body);
    const data = await RepairTag.findById(id);
    res.status(200).json({
      success: true,
      message: "update single RepairTag detail for single user successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.deleteSingleRepairTagDetailforsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    await RepairTag.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "delete single RepairTag detail for single user successfully",
      data: [],
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

//search subadmin
exports.RepairTagSearch = async (req, res) => {
  try {
    const id = req.params.id;
    let event = req.query.search;
    event = event.split(" ").join("").trim();
    const regfirsname = new RegExp(event, "i"); //this is for we serch meet or Meet or MEET all are same
    // console.log(regfirsname);
    let repairTag = await RepairTag.find({
      repairTagName: regfirsname,
      userId: id,
    }).limit(10);
    let repairTagfind = await RepairTag.find({
      repairTagName: regfirsname,
      userType: 1,
    }).limit(10);
    const find2 = [...repairTag, ...repairTagfind];
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
