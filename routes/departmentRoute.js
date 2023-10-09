const express = require("express");
const {
  addDetails,
  updateDetails,
  deleteDepartment,
  allDetails,
  addRole2Department,
} = require("../controller/department");
const router = express.Router();
router.get("/", allDetails);
router.post("/add", addDetails);
router.put("/role/add", addRole2Department);
router.put("/update", updateDetails);
router.put("/delete", deleteDepartment);
module.exports = router;
