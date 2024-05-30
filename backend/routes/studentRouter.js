//require
const express = require("express");
const {
  getAllStudents,
  getIndividual,
  addNewStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/studentController");

//create studentRouter
const studentRouter = new express.Router();

//routing
studentRouter.get("/",getAllStudents);
studentRouter.get("/:id",getIndividual);
studentRouter.post("/",addNewStudent);
studentRouter.patch("/:id",updateStudent);
studentRouter.delete("/:id",deleteStudent);

//export
module.exports = studentRouter;
