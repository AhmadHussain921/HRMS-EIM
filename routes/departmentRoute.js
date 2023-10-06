const express=require("express");
const {addDetails,updateDetails,deleteDepartment }=require("../controller/department");
const router=express.Router();
router.post("/add",addDetails);
router.put("/update",updateDetails);
router.put("/delete",deleteDepartment);
module.exports=router;