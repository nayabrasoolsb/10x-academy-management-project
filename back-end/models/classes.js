const mongoose = require("mongoose");
const { Schema } = mongoose;

const classSchema = new Schema({
  id: Number,
  class: String,
  studentCount: Number,
});

const classModel = mongoose.model("classes", classSchema);
module.exports = classModel;
