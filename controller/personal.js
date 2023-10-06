const Personal = require("../models/personalModel");
const Department = require("../models/departmentsModel");
const Role = require("../models/roleModel");
const addDetails = async (req, res) => {
    try {
        const { name, email, address, contact, dob, departmentId } = req.body;
        if (!name || !email || !address || !contact || !dob) {
            res.status(400);
            throw new Error("Insufficient Details")
        }
        const addingDetaiils = await Personal.create({
            name, email, address, contact, dob, departmentId
        })
        await addingDetaiils.save();
        res.status(201).json("created")
    } catch (e) {
        res.status(400);
        throw new Error("Invalid Error")
    }
}
const add2Department = async (req, res) => {
    try {
        const { eid, did } = req.query;
        if (!id) {
            res.status(400);
            throw new Error("Insufficient Details")
        }
        const findingDepartment = await Department.findOne({ _id: did });
        findingDepartment.workers.push(eid);
        await findingDepartment.save();
        res.status(201).json("employee added")
    } catch (e) {
        res.status(400);
        throw new Error("Invalid Error")
    }
}
const addRole2Department = async (req, res) => {
    try {
        const { did } = req.query;
        const { name, salary, duration } = req.body;
        if (!id || !name || !salary || !duration) {
            res.status(400);
            throw new Error("Insufficient Details")
        }
        const creatingRole = await Role.create({
            name, salary, duration
        });
        const created = await creatingRole.save();
        const findingDepartment = await Department.findOne({ _id: did });
        findingDepartment.roleId = created._id;
        await findingDepartment.save()

        res.status(201).json("role added")
    } catch (e) {
        res.status(400);
        throw new Error("Invalid Error")
    }
}
module.exports = { addDetails, add2Department }