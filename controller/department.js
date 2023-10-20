const asyncHandler = require("express-async-handler");
const Department = require("../models/departmentsModel");
const Role = require("../models/roleModel");
const Personal = require("../models/personalModel");
const allDetails = asyncHandler(async (req, res) => {
  try {
    const allDepart = await Department.find({});
    res.status(200).json(allDepart);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Error");
  }
});

const addDetails = asyncHandler(async (req, res) => {
    try {
    const { name, email, contact, description } = req.body;
    if (!name || !email || !contact || !description) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const addingDetaiils = await Department.create({
      name,
      email,
      contact,
      description,
    });
    const output = await addingDetaiils.save();
    res.status(201).json(output);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Error");
  }
});
const updateDetails = asyncHandler(async (req, res) => {
    try {
    const { id } = req.query;
    const { details } = req.body;
    if (!id || !details) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const updating = await Department.findOneAndUpdate(
      {
        _id: id,
      },
      details,
      {
        new: true,
      }
    );
    res.status(201).json(updating);
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Invalid Error");
  }
});
const deleteDepartment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const findDepartment = await Department.findById(id);
    if (!findDepartment) {
      res.status(400);
      throw new Error("Department not found");
    }
    if (findDepartment.workers.length > 0) {
      for (const worker of findDepartment.workers) {
        const findWorker = await Personal.findById(worker);
        if (findWorker?.roleId) {
                    const remDepFromRole = await Role.findByIdAndUpdate(
            findWorker.roleId,
            {
              $unset: { departmentId: 1 },
            },
            {
              new: true,
            }
          );
        }
      }
    }
    const deleting = await Department.findOneAndDelete({
      _id: id,
    });
    res.status(201).json(deleting);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Error");
  }
});

module.exports = {
  allDetails,
  addDetails,
  updateDetails,
  deleteDepartment,
};
