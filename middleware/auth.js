const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("Not authorize token failed");
      }
      next();
    } catch (e) {
      res.status(401);
      throw new Error("Not authorize token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token ");
  }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
  try {
    if (req.user) {
      const role = req.user.type;
      if (role === 1) {
        next();
      } else {
        res.status(401);
        throw new Error("No authorized Access ");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token ");
    }
  } catch (e) {
    res.status(401);
    throw new Error("Not authorized, no token ");
  }
});
module.exports = { protect, protectAdmin };