const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     PrevJobs:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the previous job.
 *         companyName:
 *           type: string
 *           description: The name of the company.
 *         companyContact:
 *           type: string
 *           description: Contact details of the company.
 *         salary:
 *           type: string
 *           description: Salary at the previous job.
 */
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "",
  },
  companyContact: {
    type: String,
    default: "",
  },
  salary: {
    type: String,
    default: "",
  },
});
const PrevJobs = mongoose.model("PrevJobs", Schema);
module.exports = PrevJobs;
