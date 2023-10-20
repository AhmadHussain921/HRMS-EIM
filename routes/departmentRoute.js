const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.js");
const { protect, protectAdmin } = require("../middleware/auth.js");
const {
  addDetails,
  updateDetails,
  deleteDepartment,
  allDetails,
  addRole2Department,
} = require("../controller/department");
router.get("/", protect, allDetails);
router.post("/add", protect, protectAdmin, addDetails);

router.put("/update", protect, protectAdmin, updateDetails);
router.put("/delete", protect, protectAdmin, deleteDepartment);
module.exports = router;
