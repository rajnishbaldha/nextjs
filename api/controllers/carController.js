const carCompanyName = require("../models/carCompanyName");
const CarCompanyName = require("../models/carCompanyName");

exports.multipleCarCompanyName = async (req, res) => {
  try {
    const carData = req.body;

    for (let i = 0; i < carData.carCompanyName.length; i++) {
      await CarCompanyName.create({
        companyName: carData.carCompanyName[i],
      });
    }
    const data = await CarCompanyName.find();
    res.status(200).send({
      success: true,
      message: "car data listing successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
    s;
  }
};

exports.addCarCompanyModel = async (req, res) => {
  try {
    const id = req.params.id;
    const carModel = req.body.carModel;
    for (let i = 0; i < carModel.length; i++) {
      await CarCompanyName.findByIdAndUpdate(
        id,
        {
          carModel: carModel,
        },
        { new: true, runValidators: true, userFindAndModify: false }
      );
    }
    const data = await CarCompanyName.findById(id);
    res.status(200).send({
      success: true,
      message: "car model name add.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.addSingleCarCompany = async (req, res) => {
  try {
    const carData = req.body;
    const data = await carCompanyName.create({
      companyName: carData.companyName,
      carModel: carData.carModel,
    });

    res.status(200).send({
      success: true,
      message: "single car company name add successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getSingleCarCompanyDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await carCompanyName.findById(id);
    res.status(200).send({
      success: true,
      message: "get single car comapny detail successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.updateSingleCarCompanyDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const carData = req.body;
    const data = await carCompanyName.findByIdAndUpdate(id, carData, {
      new: true,
      runValidators: true,
      userFindAndModify: false,
    });
    res.status(200).send({
      success: true,
      message: "update single car comapny detail successfully....",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.deleteSingleCarCompanyDetail = async (req, res) => {
  try {
    const id = req.params.id;
    await carCompanyName.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "delete car comapny detail successfully....",
    
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Somthing went wrong.");
  }
};

exports.getAllCarCompany = async (req, res) => {
  try {
    const data = await CarCompanyName.find().sort({createdAt:-1});
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
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
        message: "Get all Car company.",
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
