const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the skill.
 *         duration:
 *           type: string
 *           description: The duration of the skill.
 *         confidence:
 *           type: string
 *           description: The confidence level in the skill.
 */
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  confidence: {
    type: String,
    default: "",
  },
});
const Skills = mongoose.model("Skills", Schema);
module.exports = Skills;
