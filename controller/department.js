const Department = require("../models/departmentsModel");
const addDetails = async (req, res) => {
    try {
        const { name, email, contact, description } = req.body;
        if (!name || !email || !contact || !description) {
            res.status(400);
            throw new Error("Insufficient Details")
        }
        const addingDetaiils = await Department.create({
            name, email, contact, description
        })
        const output=await addingDetaiils.save();
        res.status(201).json(output)
    } catch (e) {
        res.status(400);
        throw new Error("Invalid Error")
    }
}
const updateDetails = async (req, res) => {
    try {
        const { id } = req.query;
        const { details } = req.body;
        if (!id || !details) {
            res.status(400);
            throw new Error("Insufficient Details")
        }
        const updating = await Department.findOneAndUpdate({
            _id: id
        }, details, {
            new: true
        })
        res.status(201).json("updated")

    } catch (e) {
        res.status(400);
        throw new Error("Invalid Error")
    }
}
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.query;
      
        if (!id) {
            res.status(400);
            throw new Error("Insufficient Details")
        }
        const updating = await Department.findOneAndDelete({
            _id: id
        })
        res.status(201).json("deleted")

    } catch (e) {
        res.status(400);
        throw new Error("Invalid Error")
    }
}
module.exports = { addDetails,updateDetails,deleteDepartment }