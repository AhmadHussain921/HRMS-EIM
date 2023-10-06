const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  instituteName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  outcomes: {
    type: String,
    required: true,
  },
});
const Training = mongoose.model("Training", Schema);
module.exports = Training;
