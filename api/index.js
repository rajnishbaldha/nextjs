const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
const user = require("./routers/userRouter");
const service = require("./routers/serviceRouter");
const admin = require("./routers/adminRouter");
const setting = require("./routers/settingRouter");
const invoice = require("./routers/invoiceRouter");
const car = require("./routers/carRouter");
const bike = require("./routers/bikeRouter");
const vendor = require("./routers/vendorRouter");
const sendEmail = require("./middelware/sendMail");
const servicePackage = require("./routers/servicePackage");
const parts = require("./routers/partsRouter");
const repairTag = require("./routers/repairTagRouter");
const transaction = require("./routers/transactionRouter");
const employee = require("./routers/employeeRoute");
const account = require("./routers/accountRoute");
const plan = require("./routers/planRoute");
const port = process.env.PORT;


mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 200,
  })
  .then(() => {
    console.log("Connection Successfully ✌");
  })
  .catch((e) => {
    console.log(e)
    console.log("No connection 🥵");
  });
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/api/v1", admin);
app.use("/api/v1", bike);
app.use("/api/v1", car);
app.use("/api/v1", invoice);
app.use("/api/v1", parts);
app.use("/api/v1", repairTag);
app.use("/api/v1", service);
app.use("/api/v1", servicePackage);
app.use("/api/v1", setting);
app.use("/api/v1", transaction);
app.use("/api/v1", user);
app.use("/api/v1", vendor);
app.use("/api/v1", invoice);
app.use("/api/v1", car);
app.use("/api/v1", parts);
app.use("/api/v1", employee);
app.use("/api/v1", account);
app.use("/api/v1", plan);

app.listen(port, () => console.log(`App listening on port ${port}.`));
