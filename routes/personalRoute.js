const express = require("express");
const router = express.Router();
const { protect, protectAdmin } = require("../middleware/auth");
const {
  allDetails,
  addDetails,
  updateDetails,
  add2Department,
  addExperience,
  deleteDetails,
  editSkills,
  editPrevJobs,
  editTrainings,
} = require("../controller/personal");
/**
 * @swagger
 * /person:
 *   get:
 *     summary: Get all personal details
 *     security:
 *       - BearerAuth: []  # Requires a bearer token
 *     responses:
 *       200:
 *         description: Successfully retrieved personal details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   address:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   dob:
 *                     type: string
 *       400:
 *         description: Failed to retrieve personal details
 */
router.get("/", protect, allDetails);

/**
 * @swagger
 * /person/add:
 *   post:
 *     summary: Add personal details
 *     security:
 *       - BearerAuth: []  # Requires a bearer token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               contact:
 *                 type: string
 *               dob:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - address
 *               - contact
 *               - dob
 *     responses:
 *       201:
 *         description: Successfully added personal details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 dob:
 *                   type: string
 *       400:
 *         description: Failed to add personal details
 */
router.post("/add", protect, protectAdmin, addDetails);

/**
 * @swagger
 * /person/update:
 *   put:
 *     summary: Update personal details
 *     security:
 *       - BearerAuth: []  # Requires a bearer token
 *     parameters:
 *       - in: query
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the personal details to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               details:
 *                 type: object
 *                 description: The updated personal details
 *             required:
 *               - details
 *     responses:
 *       201:
 *         description: Successfully updated personal details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 dob:
 *                   type: string
 *       400:
 *         description: Failed to update personal details
 */
router.put("/update", protect, protectAdmin, updateDetails);

/**
 * @swagger
 * /person/department/add/{id}:
 *   post:
 *     summary: Add a person to a department with a role
 *     security:
 *       - BearerAuth: []  # Requires a bearer token
 *     parameters:
 *       - in: query
 *         name: eid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the person to add to the department
 *       - in: query
 *         name: did
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the department to add the person to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               salary:
 *                 type: number
 *               duration:
 *                 type: number
 *             required:
 *               - name
 *               - salary
 *               - duration
 *     responses:
 *       201:
 *         description: Successfully added person to department with a role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 findingDepartment:
 *                   type: object
 *                 findingPerson:
 *                   type: object
 *       400:
 *         description: Failed to add person to department with a role
 */
router.put("/department/add", protect, protectAdmin, add2Department);

/**
 * @swagger
 * /person/experience/add:
 *   put:
 *     summary: Add Experience
 *     security:
 *       - BearerAuth: []  # Requires a bearer token
 *     tags:
 *       - Experience
 *     parameters:
 *       - in: query
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Personal document.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skills:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Skill'  # Reference to the Skills schema
 *               trainings:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Training'  # Reference to the Training schema
 *               prevJobs:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PrevJobs'  # Reference to the PrevJobs schema
 *     responses:
 *       201:
 *         description: Experience added successfully
 *       400:
 *         description: Failed to add experience
 */

router.put("/experience/add", protect, protectAdmin, addExperience);

/**
 * @swagger
 * /person/experience/edit/skills/{sid}:
 *   put:
 *     summary: Edit a skill by ID
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the skill to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *         description: The skill object to be edited.
 *     responses:
 *       201:
 *         description: Skill edited successfully
 *       400:
 *         description: Invalid request or error during editing
 */
router.put("/experience/edit/skills", protect, protectAdmin, editSkills);
/**
 * @swagger
 * /person/experience/edit/prevJobs/{pjid}:
 *   put:
 *     summary: Edit a previous job by ID
 *     parameters:
 *       - in: path
 *         name: pjid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the previous job to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrevJob'
 *         description: The previous job object to be edited.
 *     responses:
 *       201:
 *         description: Previous job edited successfully
 *       400:
 *         description: Invalid request or error during editing
 */
router.put("/experience/edit/prevjobs", protect, protectAdmin, editPrevJobs);
/**
 * @swagger
 * /person/experience/edit/trainings/{tid}:
 *   put:
 *     summary: Edit a training by ID
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the training to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Training'
 *         description: The training object to be edited.
 *     responses:
 *       201:
 *         description: Training edited successfully
 *       400:
 *         description: Invalid request or error during editing
 */

router.put("/experience/edit/trainings", protect, protectAdmin, editTrainings);
/**
 * @swagger
 * /person/delete:
 *   delete:
 *     summary: Delete personal details
 *     security:
 *       - BearerAuth: []  # Requires a bearer token
 *     parameters:
 *       - in: query
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the personal details to delete
 *     responses:
 *       201:
 *         description: Successfully deleted personal details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 dob:
 *                   type: string
 *       400:
 *         description: Failed to delete personal details
 */

router.put("/delete", protect, protectAdmin, deleteDetails);

module.exports = router;
