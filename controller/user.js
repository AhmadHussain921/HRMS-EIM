const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const allUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    res.status(400);
    throw new Error("Failed to login the user");
  }
});
const register = asyncHandler(async (req, res, next) => {
  const { name, email, type, password } = req.body;
  console.log("message from register bdy")
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Insufficient Details");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(201).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      type: userExists.type,
      token: generateToken(userExists._id),
      new: false,
    });
  }
  const user = await User.create({
    name,
    email,
    type,
    password,
  });
  await user.save();
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      token: generateToken(user._id),
      new: true,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create new User");
  }
});
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Insufficient Details");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not Exists");
  }
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to login the user");
  }
});

module.exports = { register, login, allUsers };