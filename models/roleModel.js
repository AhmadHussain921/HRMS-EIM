const mongoose = require("mongoose");
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
});
const Role = mongoose.model("Role", Schema);
module.exports = Role;
