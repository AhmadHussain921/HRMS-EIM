const express = require("express");
const {
  allDetails,
  addDetails,
  updateDetails,
  add2Department,
  addExperience,
} = require("../controller/personal");
const router = express.Router();
router.get("/", allDetails);
router.post("/add", addDetails);
router.put("/update", updateDetails);
router.put("/department/add", add2Department);
router.put("/experience/add", addExperience);

module.exports = router;
