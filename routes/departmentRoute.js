const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.js");
const {
  addDetails,
  updateDetails,
  deleteDepartment,
  allDetails,
  addRole2Department,
} = require("../controller/department");
router.get("/", protect, allDetails);
router.post("/add", protect, addDetails);
router.put("/role/add", protect, addRole2Department);
router.put("/update", protect, updateDetails);
router.put("/delete", protect, deleteDepartment);
module.exports = router;
