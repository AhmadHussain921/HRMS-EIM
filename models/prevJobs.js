const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "",
  },
  companyContact: {
    type: String,
    default: "",
  },
  salary: {
    type: String,
    default: "",
  },
});
const PrevJobs = mongoose.model("PrevJobs", Schema);
module.exports = PrevJobs;
