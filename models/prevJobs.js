const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    required: true,
  },
  companyContact: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
});
const PrevJobs = mongoose.model("PrevJobs", Schema);
module.exports = PrevJobs;
