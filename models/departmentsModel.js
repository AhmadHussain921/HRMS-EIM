const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema;
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roleId: {
    type: ObjectId,
    ref: "Role",
   
  },
  workers:[{
    type: ObjectId,
    ref: "Personal",
   
  }]
});
const Department = mongoose.model("Department", Schema);
module.exports = Department;
