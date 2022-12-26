const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: String,
  classId: Number,
  studentId: {type:Number, unique:true},
});
const studentModel = mongoose.model("students", studentSchema);
module.exports = studentModel;
