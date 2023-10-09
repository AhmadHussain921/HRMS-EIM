const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const ExperienceSchema = new mongoose.Schema({
  prevJobsId: [
    {
      type: ObjectId,
      ref: "PrevJobs",
      required: true,
    },
  ],
  trainingId: [
    {
      type: ObjectId,
      ref: "Training",
      required: true,
    },
  ],
  skillsId: [
    {
      type: ObjectId,
      ref: "Skills",
      required: true,
    },
  ],
});
const Experience = mongoose.model("Experience", ExperienceSchema);
module.exports = Experience;
