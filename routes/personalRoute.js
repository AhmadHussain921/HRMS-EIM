const express=require("express");
const {addDetails, add2Department }=require("../controller/personal");
const router=express.Router();
router.post("/add",addDetails);
router.put("/add/department",add2Department);
module.exports=router;