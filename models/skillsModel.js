const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    required: true,
  },
  condifence: {
    type: String,
    required: true,
  },
 
});
const Skills = mongoose.model("Skills", Schema);
module.exports = Skills;
