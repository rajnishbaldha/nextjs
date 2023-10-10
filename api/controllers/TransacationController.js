const Transaction = require("../models/transactionModel");
const User = require("../models//userModel");

exports.addTransaction = async (req, res) => {
  try {
    const { user, plane, transactionId } = req.body;
    // const subscription = await Subscription.findById(plane);
    const userData = await User.findById(user);
    // console.log(userData)
    let today = new Date();
    var eightMonthsFromJan312009 = new Date().setMonth(today.getMonth() + 12);
    var date = new Date(eightMonthsFromJan312009);
    date.toString("MMM dd");
    const transactionFind = await Transaction.findOne({ user: userData._id });
    if (transactionFind) {
      if (transactionFind && new Date() > transactionFind.endDate) {
        const transaction = await Transaction.create({
          user: req.body.user,
          name: userData.name,
          email: userData.email,
          ammount: req.body.ammount,
          startDate: today,
          endDate: date,
          duration: 12,
          transactionId: req.body.transactionId,
        });
        await User.findByIdAndUpdate(userData._id, {
          isExpire: false,
          startDate: today,
          endDate: date,
        });
        res.status(200).json({
          success: true,
          message: "plan added succesfully...",
          data: transaction,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "your plan has not expire",
          data: [],
        });
      }
    } else {
      const transaction = await Transaction.create({
        user: req.body.user,
        name: userData.name,
        email: userData.email,
        ammount: req.body.ammount,
        startDate: today,
        endDate: date,
        duration: 12,
        transactionId: req.body.transactionId,
      });
      await User.findByIdAndUpdate(userData._id, {
        isExpire: false,
      });
      res.status(200).json({
        success: true,
        message: "plane added succesfully...",
        data: transaction,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(_id);
    const data = await Transaction.findByIdAndUpdate(
      _id,
      {
        endDate: req.body.endDate,
      },
      {
        new: true,
        runValidators: true,
        userFindAndModify: true,
      }
    );
    const transaction = await Transaction.findById(_id);
    res.status(200).json({
      success: true,
      message: "plane added succesfully...",
      data: transaction,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// get all transaction

exports.getTransaction = async (req, res) => {
  try {
    // console.log("user");
    let data;
    let total;
    if (req.body.user) {
      data = Transaction.find({ user: req.body.user }).sort({ createdAt: -1 });
    } else {
      data = Transaction.find().sort({ createdAt: -1 });
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * pageSize;
    if (req.body.user) {
      total = await Transaction.countDocuments({ user: req.body.user });
    } else {
      total = await Transaction.countDocuments();
    }
    const totalPages = Math.ceil(total / pageSize);
    data = data.skip(skip).limit(pageSize);
    if (page > totalPages) {
      return res.status(201).json({
        success: false,
        message: "No data found",
      });
    }
    const result = await data;
    res.status(200).send({
      success: true,
      message: "Transaction listing successfully....",
      count: result.length,
      page,
      totalPages,
      data: result,
    });
    console.log(result, "get all transaction");
  } catch (error) {
    res.send("error");
  }
};

//search transaction
exports.getTransactionBySearch = async (req, res) => {
  try {
    let event = req.query.search;
    event = event.split(" ").join("").trim();
    // console.log(event)
    const regfirsname = new RegExp(event, "i"); //this is for we serch meet or Meet or MEET all are same
    // console.log(regfirsname);
    let user = await Transaction.find({
      $or: [{ name: regfirsname }, { email: regfirsname }],
    });
    // console.log(user)
    res.status(200).send({
      message: "event listing successfully.....",
      data: user,
    });
    console.log(user, "get Transaction By Search");
  } catch (error) {
    res.send("error");
  }
};

// total earning
exports.getTotalAmmount = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $group: { _id: null, sum: { $sum: "$ammount" } } },
    ]);
    res.status(200).send({
      message: "total of the ammount",
      data: data,
    });
    console.log(data, "get Total Ammount");
  } catch (error) {
    res.send("error");
  }
};

// all transaction of user
exports.getUserPlane = async (req, res) => {
  try {
    const data = await Transaction.find({ user: req.body.user })
      .sort({ createdAt: -1 })
      .limit(1);
    res.status(200).send({
      message: "user plane listing successfully",
      data: data,
    });
  } catch (error) {
    res.send("error");
  }
};
