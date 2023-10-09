const Personal = require("../models/personalModel");
const Department = require("../models/departmentsModel");
const Skills = require("..//models/skillsModel");
const Training = require("../models/trainingModel");
const PrevJobs = require("../models/prevJobs");
const Experience = require("../models/experienceModel");
const allDetails = async (req, res) => {
  try {
    const all = await Personal.find({});
    res.status(200).json(all);
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Invalid Error");
  }
};
const addDetails = async (req, res) => {
  try {
    const { name, email, address, contact, dob, departmentId } = req.body;
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
      departmentId,
    });
    await addingDetaiils.save();
    res.status(201).json(addingDetaiils);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Error");
  }
};
const updateDetails = async (req, res) => {
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
};
const add2Department = async (req, res) => {
  try {
    const { eid, did } = req.query;
    if (!eid || !did) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const findingDepartment = await Department.findOne({ _id: did });

    findingDepartment.workers.push(eid);
    await findingDepartment.save();
    res.status(201).json(findingDepartment);
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Invalid Error");
  }
};
const deleteDetails = async (req, res) => {
  try {
    const { pid } = req.query;

    if (!pid) {
      res.status(400);
      throw new Error("Insufficient Details");
    }
    const deletingDetails = await Personal.findByIdAndDelete({ _id: pid });
    res.status(201).json(deletingDetails);
  } catch (e) {
    res.status(400);
    throw new Error("Invalid Error");
  }
};
const addSkill = async (req, res) => {
  try {
    const { name, duration, confidence } = req.body;
    if (!name || !duration || !confidence) {
      res.status(400);
      throw new Error("insufficient details");
    }
    const addSkills = await Skills.create({
      name,
      duration,
      confidence,
    });
    await addSkills.save();
    res.status(201).json(addSkills);
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error("Invalid Error");
  }
};
const addExperience = async (req, res) => {
  try {
    const { pid } = req.query;
    const { skills, trainings, prevJobs } = req.body;
    if (!skills || !trainings || !prevJobs) {
      res.status(400);
      throw new Error("insufficient details");
    }
    const newExperience = new Experience();
    for (const skill of skills) {
      console.log("I am here...");
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

    const findingPersonal = await Personal.findOne({ _id: pid });
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
};
module.exports = {
  allDetails,
  addDetails,
  updateDetails,
  add2Department,
  deleteDetails,
  addExperience,
};
