const Invoice = require("../models/invoiceModel");

exports.sumOfPrice = async (req, res) => {
  // console.log(req.params.id)
  try {
    const total = await Invoice.aggregate([
      {
        $match: { userId: req.params.id },
      },
      {
        $group: {
          _id: null,
          receivePayment: { $sum: "$receivePayment" },
          duePayment: { $sum: "$duePayment" },
        },
      },
    ]);
    console.log(total, "total");
    res.status(200).json({
      success: true,
      message: "sum listing successfully",
      total: total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.accountInvoiceList = async (req, res) => {
  try {
    const userId = req.params.id;
    const type = req.body.type;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    let day;
    let data;
    if (type) {
      if (type === "today") {
        day = 1;
      } else if (type == "week") {
        day = 7;
      } else if (type == "month") {
        day = 30;
      } else if (type == "year") {
        day = 365;
      }
      data = await Invoice.find({
        userId: userId,
        createdAt: { $gte: new Date(Date.now() - day * 24 * 60 * 60 * 1000) },
      }).sort({ createdAt: -1 });
    } else if (startDate && endDate) {
      data = await Invoice.find({
        userId: userId,
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      }).sort({ createdAt: -1 });
    } else {
      data = await Invoice.find({
        userId: userId,
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }).sort({ createdAt: -1 });
    }
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);
    const result = data.slice(skip, skip + pageSize);

    if (page > totalPages) {
      return res.status(404).json({
        success: false,
        massage: "No data found",
        data: [],
      });
    }
    if (data.length === 0) {
      res
        .status(200)
        .json({ message: "No data find.", data: [], success: false });
    } else {
      res.status(200).json({
        status: true,
        message: "get all invoice listing.",
        count: result.length,
        page,
        totalPages,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
