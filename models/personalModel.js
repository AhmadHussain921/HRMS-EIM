const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const PersonalSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  departmentId: {
    type: ObjectId,
    ref: "Department",

  },
  experienceId: {
    type: ObjectId,
    ref: "Experience"
  },
});
const Personal = mongoose.model("Personal", PersonalSchema);
module.exports = Personal;
