const BikeCompanyName = require("../models/bikeCompanyName");

exports.multipleBikeCompanyName = async (req, res) => {
  try {
    const bikeData = req.body;

    for (let i = 0; i < bikeData.bikeCompanyName.length; i++) {
      await BikeCompanyName.create({
        companyName: bikeData.bikeCompanyName[i],
      });
    }
    const data = await BikeCompanyName.find();
    res.status(200).send({
      success: true,
      message: "bike data listing successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
    s;
  }
};

exports.addBikeCompanyModel = async (req, res) => {
  try {
    const id = req.params.id;
    const bikeModel = req.body.bikeModel;
    for (let i = 0; i < bikeModel.length; i++) {
      await BikeCompanyName.findByIdAndUpdate(
        id,
        {
          bikeModel: bikeModel,
        },
        { new: true, runValidators: true, userFindAndModify: false }
      );
    }
    const data = await BikeCompanyName.findById(id);
    res.status(200).send({
      success: true,
      message: "bike model name add.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.addSingleBikeCompany = async (req, res) => {
  try {
    const bikeData = req.body;
    const data = await BikeCompanyName.create({
      companyName: bikeData.companyName,
      bikeModel: bikeData.bikeModel,
    });

    res.status(200).send({
      success: true,
      message: "single bike company name add successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getSingleBikeCompanyDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BikeCompanyName.findById(id);
    res.status(200).send({
      success: true,
      message: "get single bike comapny detail successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateSingleBikeCompanyDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const bikeData = req.body;
    const data = await BikeCompanyName.findByIdAndUpdate(id, bikeData, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });
    res.status(200).send({
      success: true,
      message: "update single bike comapny detail successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.deleteSingleBikeCompanyDetail = async (req, res) => {
  try {
    const id = req.params.id;
    await BikeCompanyName.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "delete bike comapny detail successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getAllBikeCompany = async (req, res) => {
  try {
    const data = await BikeCompanyName.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
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
        message: "Get all bike company.",
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
