const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  confidence: {
    type: String,
    default: "",
  },
});
const Skills = mongoose.model("Skills", Schema);
module.exports = Skills;
