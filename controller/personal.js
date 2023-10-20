const asyncHandler = require("express-async-handler");
const Personal = require("../models/personalModel");
const Role = require("../models/roleModel");
const Department = require("../models/departmentsModel");
const Skills = require("..//models/skillsModel");
const Training = require("../models/trainingModel");
const PrevJobs = require("../models/prevJobs");
const Experience = require("../models/experienceModel");
const allDetails = asyncHandler(async (req, res) => {
  try {
    const all = await Personal.find({});
    res.status(200).json(all);
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Invalid Error");
  }
});
const addDetails = asyncHandler(async (req, res) => {
  try {
    const { name, email, address, contact, dob } = req.body;
    if (!name || !email || !address || !contact || !dob) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const addingDetaiils = await Personal.create({
      name,
      email,
      address,
      contact,
      dob,
    });
    await addingDetaiils.save();
    res.status(201).json(addingDetaiils);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Error");
  }
});
const updateDetails = asyncHandler(async (req, res) => {
  try {
    const { pid } = req.query;
    const { details } = req.body;
    if (!pid || !details) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const addingDetaiils = await Personal.findOneAndUpdate(
      {
        _id: pid,
      },
      details,

      {
        new: true,
      }
    );
    await addingDetaiils.save();
    res.status(201).json(addingDetaiils);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Error");
  }
});

const deleteDetails = asyncHandler(async (req, res) => {
  try {
    const { pid } = req.query;
    if (!pid) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const findPerson = await Personal.findById(pid);
    if (!findPerson) {
      res.status(400);
      throw new Error("Worker not found");
    }
    if (findPerson?.experienceId) {
      const findExperience = await Experience.findById(findPerson.experienceId);
      if (findExperience) {
        if (findExperience?.prevJobsId.length > 0) {
          for (const prev of findExperience.prevJobsId) {
            await PrevJobs.findOneAndDelete(prev);
          }
        }
        if (findExperience?.trainingId.length > 0) {
          for (const training of findExperience.trainingId) {
            await Training.findOneAndDelete(training);
          }
        }
        if (findExperience?.skillsId.length > 0) {
          for (const skill of findExperience.skillsId) {
            await Skills.findOneAndDelete(skill);
          }
        }
        await Experience.findByIdAndDelete(findPerson.experienceId);
      }
    }
    if (findPerson?.roleId) {
      const findRole = await Role.findById(findPerson.roleId);
      if (findRole) {
        if (findRole?.departmentId) {
          const remWorkerFromDep = await Department.findOneAndUpdate(
            {
              _id: findRole.departmentId,
            },
            {
              $pull: { workers: findPerson._id },
            },
            {
              new: true,
            }
          );
        }
        const delRole = await Role.findByIdAndDelete(findPerson.roleId);
      }
    }
    const deletingDetails = await Personal.findByIdAndDelete({ _id: pid });
    res.status(201).json(deletingDetails);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Error");
  }
});
const add2Department = asyncHandler(async (req, res) => {
  try {
    const { eid, did } = req.query;
    const { name, salary, duration } = req.body;

    if (!eid || !did || !name || !salary || !duration) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const findingPerson = await Personal.findOne({ _id: eid });
    if (!findingPerson) {
      res.status(400);
      throw new Error("Person not found");
    }
    const findingDepartment = await Department.findOne({ _id: did });
    if (!findingDepartment) {
      res.status(400);
      throw new Error("Department not found");
    }

    if (findingPerson?.roleId) {
      res.status(400);
      throw new Error("Role already assigned");
    }
    const creatingRole = await Role.create({
      name,
      salary,
      duration,
      departmentId: did,
    });
    const created = await creatingRole.save();
    if (!created) {
      res.status(400);
      throw new Error("Role Creation fail");
    }
    findingPerson.roleId = created._id;
    await findingPerson.save();
    if (!findingDepartment.workers.includes(eid)) {
      findingDepartment.workers.push(eid);
      await findingDepartment.save();
    }

    res.status(201).json({ findingDepartment, findingPerson });
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Invalid Error");
  }
});
const addExperience = asyncHandler(async (req, res) => {
  try {
    const { pid } = req.query;
    const { skills, trainings, prevJobs } = req.body;
    if (!skills || !trainings || !prevJobs) {
      res.status(400);
      throw new Error("insufficient details");
    }
    const findingPersonal = await Personal.findOne({ _id: pid });
    if (!findingPersonal) {
      res.status(400);
      throw new Error("Worker not added");
    }
    if (findingPersonal.experienceId) {
      res.status(400);
      throw new Error("Experience Id already present");
    }
    const newExperience = new Experience();
    for (const skill of skills) {
      const addSkill = await Skills.create(skill);
      await addSkill.save();
      newExperience.skillsId.push(addSkill);
    }
    for (const training of trainings) {
      const addTraining = await Training.create(training);
      await addTraining.save();
      newExperience.trainingId.push(addTraining);
    }
    for (const prevJob of prevJobs) {
      const addPrevJob = await PrevJobs.create(prevJob);
      await addPrevJob.save();
      newExperience.prevJobsId.push(addPrevJob);
    }
    await newExperience.save();

    findingPersonal.experienceId = newExperience._id;
    await findingPersonal.save();
    const wholeData = await findingPersonal.populate({
      path: "experienceId",
      populate: {
        path: "prevJobsId trainingId skillsId",
      },
    });
    res.status(201).json(wholeData);
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Invalid Error");
  }
});
module.exports = {
  allDetails,
  addDetails,
  updateDetails,
  add2Department,
  deleteDetails,
  addExperience,
};