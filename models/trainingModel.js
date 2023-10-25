const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     Training:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the training.
 *         instituteName:
 *           type: string
 *           description: The name of the training institute.
 *         description:
 *           type: string
 *           description: Description of the training.
 *         duration:
 *           type: string
 *           description: Duration of the training.
 *         outcomes:
 *           type: string
 *           description: Expected outcomes of the training.
 */

const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  instituteName: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  duration: {
    type: String,
    default: "",
  },
  outcomes: {
    type: String,
    default: "",
  },
});
const Training = mongoose.model("Training", Schema);
module.exports = Training;
