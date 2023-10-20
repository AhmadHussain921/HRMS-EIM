const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
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
    enum: [0, 1],
  },
  password: {
    type: String,
    required: true,
  },
});
Schema.methods.matchPassword = async function (enteredPassword) {
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