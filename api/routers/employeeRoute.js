const express = require("express");
const { verifyToken } = require("../middelware/auth");
const {
  createEmployee,
  garageEmployee,
  deleteEmployee,
  getSingleEmployee,
  updateEmployee,
  loginUser,
} = require("../controllers/employeeController");

const Router = express.Router();

Router.post("/add/employee", verifyToken, createEmployee);
Router.get("/garage/employee/:id", verifyToken, garageEmployee);
Router.delete("/delete/employee/:id", verifyToken, deleteEmployee);
Router.get("/get/single/employee/:id", verifyToken, getSingleEmployee);
Router.put("/update/employee/:id", verifyToken, updateEmployee);
Router.post("/login/employee", loginUser);

module.exports = Router;
