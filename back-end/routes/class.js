const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const Classes = require("../models/classes.js");
const Students = require("../models/students");
router.use(bodyParser.json());

// get all available classes
router.get("/", async (req, res) => {
  try {
    const classes = await Classes.find();
    res.status(200).json({
      status: "success",
      classes,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
});
// get class data by id
router.get("/:id", async (req, res) => {
  try {
    const classes = await Classes.find({ id: req.params.id });
    res.status(200).json({
      status: "success",
      classes,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: "there is no class at that id",
    });
  }
});
// creating a class
router.post("/", async (req, res) => {
  try {
    const classArray = await Classes.find();
    // console.log(req.body)
    // console.log(classArray);
    const classes = await Classes.create({
      id: classArray.length+1,
      class:req.body.class,
      studentCount: req.body.studentCount
    });
    res.status(200).json({
      status: "success",
      classes,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error,
    });
  }
});
// registering a student
router.post("/:id/students", async (req, res) => {
  try {
    // console.log(req.params)
    const studentSize = await Students.find({
      classId: req.params.id,
    });
    // console.log(studentSize);
    const students = await Students.create({
      name: req.body.name,
      classId: req.params.id,
      studentId: studentSize.length + 1,
    });
    res.status(200).json({
      status: "success",
      studentId: studentSize.length + 1,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed to register",
      error,
    });
  }
});
//get all students in a class
router.get("/:id/students", async (req, res) => {
  try {
    const students = await Students.find({
      classId: req.params.id,
    });
    res.status(200).json({
      status: "success",
      students,
    });
  } catch (error) {
    res.status(404).json({
      error: "there are no students at the id",
    });
  }
});
//get specific student details from specific class
router.get("/:classId/students/:studentId", async (req, res) => {
  try {
    // console.log(req.params)
    const students = await Students.find({
      classId: req.params.classId,
      studentId: req.params.studentId,
    });
    res.status(200).json({
      students,
    });
  } catch (error) {
    res.status(404).json({
      error: "there is no student at the id",
    });
  }
});
// update a student
router.put("/:classId/students/:studentId", async (req, res) => {
  try {
    // console.log(req.params)
    const students = await Students.findOneAndUpdate(
      {
        classId: req.params.classId,
        studentId: req.params.studentId,
      },
      req.body,
    );
    res.status(204).json({
      status: "success",
      students,
    });
  } catch (error) {
    res.status(404).json({
      error: "there is no task at the id",
    });
  }
});

//delete a class
router.delete("/:id", async (req, res) => {
  try {
    // console.log(req.params)
    const classes = await Classes.findOneAndDelete({
      id: req.params.id,
    });
    res.status(204).json({
      status: "success",
      classes,
    });
  } catch (error) {
    res.status(404).json({
      error: "there is no task at the id",
    });
  }
});
//delete a student

router.delete("/:classId/students/:studentId", async (req, res) => {
  try {
    // console.log(req.params)
    const students = await Students.findOneAndDelete(
      {
        classId: req.params.classId,
        studentId: req.params.studentId,
      },
      req.body,
    );
    res.status(204).json({
      status: "success",
      students,
    });
  } catch (error) {
    res.status(404).json({
      error: "there is no task at the id",
    });
  }
});

module.exports = router;
