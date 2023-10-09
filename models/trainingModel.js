const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  instituteName: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  outcomes: {
    type: String,
    default: "",
  },
});
const Training = mongoose.model("Training", Schema);
module.exports = Training;
