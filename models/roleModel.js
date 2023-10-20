const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  salary: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  departmentId: {
    type: ObjectId,
    ref: "Department",
  },
});
const Role = mongoose.model("Role", Schema);
module.exports = Role;
