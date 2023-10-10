const Setting = require("../models/settingsModel");
const User = require("../models/userModel");

exports.addSetting = async (req, res) => {
  try {
    const find = await Setting.findOne();

    if (!find) {
      const data = await Setting.create({
        trialDays: req.body.trialDays,
      });
      res.status(200).send({
        success: true,
        message: "settings create successfully",
        user: data,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "setting already exists",
      });
    }
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.editSetting = async (req, res) => {
  try {
    const data = await Setting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      userFindAndModify: true,
    });
    res.status(200).send({
      success: true,
      message: "settings update successfully",
      user: data,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.deleteSetting = async (req, res) => {
  try {
    await Setting.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "settings deleted successfully",
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getSetting = async (req, res) => {
  try {
    const data = await Setting.find({});
    res.status(200).send({
      success: true,
      message: "setting listing successfully",
      data: data,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getUserSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({});
    const user = await User.findById(req.params.id);
    var eightMonthsFromJan312009 = new Date(
      new Date(user.createdAt).getFullYear(),
      new Date(user.createdAt).getMonth(),
      new Date(user.createdAt).getDate() + Number(setting.trialDays)
    );
    var date = new Date(eightMonthsFromJan312009);
    let today = new Date();
    if (today > date) {
      user.isExpire = true;
      await user.save();
    } else {
      user.isExpire = false;
      await user.save();
    }
    res.status(200).send({
      success: true,
      message: "user setting listing successfully",
      data: user,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "something went wrong",
    });
  }
};
