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
  img: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
  },
  dob: {
    type: String,
    required: true,
  },
  roleId: {
    type: ObjectId,
    ref: "Role",

  },
  experienceId: {
    type: ObjectId,
    ref: "Experience",
  },
});
const Personal = mongoose.model("Personal", PersonalSchema);
module.exports = Personal;
