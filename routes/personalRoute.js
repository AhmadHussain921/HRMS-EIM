const express = require("express");
const router = express.Router();
const { protect, protectAdmin } = require("../middleware/auth");
const {
  allDetails,
  addDetails,
  updateDetails,
  add2Department,
  addExperience,
  deleteDetails,
} = require("../controller/personal");
router.get("/", protect, allDetails);
router.post("/add", protect, protectAdmin, addDetails);
router.put("/update", protect, protectAdmin, updateDetails);
router.put("/department/add", protect, protectAdmin, add2Department);
router.put("/experience/add", protect, protectAdmin, addExperience);
router.put("/delete", protect, protectAdmin, deleteDetails);

module.exports = router;
