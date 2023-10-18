const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  allDetails,
  addDetails,
  updateDetails,
  add2Department,
  addExperience,
} = require("../controller/personal");
router.get("/", protect, allDetails);
router.post("/add", protect, addDetails);
router.put("/update", protect, updateDetails);
router.put("/department/add", protect, add2Department);
router.put("/experience/add", protect, addExperience);

module.exports = router;
