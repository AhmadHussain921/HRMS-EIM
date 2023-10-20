const express = require("express");
const router = express.Router();
const { register, login, allUsers } = require("../controller/user");
router.get("/", allUsers);
router.post("/register", register);
router.post("/login", login);

//export your routes
module.exports = router;