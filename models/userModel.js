const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
});
Schema.methods.matchPassword = async function (enteredPassword) {
  bcrypt.compare(enteredPassword, this.password, function (err, result) {
    if (err) {
      console.error(err);
    } else if (result === true) {
      console.log("Password matched");
    } else {
      console.log("Password does not match");
    }
  });

  return await bcrypt.compare(enteredPassword, this.password);
};
Schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
const User = mongoose.model("User", Schema);
module.exports = User;