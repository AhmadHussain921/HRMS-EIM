const express = require("express");
const router = express.Router();
const { protect, protectAdmin } = require("../middleware/auth.js");
const {
  addDetails,
  updateDetails,
  deleteDepartment,
  allDetails,
  addRole2Department,
} = require("../controller/department");
/**
 * @swagger
 * /department:
 *   get:
 *     summary: Get all department details
 *     tags:
 *       - Department
 *     description: Retrieve all department details from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A JSON array of department details.
 *       '400':
 *         description: Invalid Error.
 */
router.get("/", protect, allDetails);


/**
 * @swagger
 * /department/add:
 *   post:
 *     summary: Add a new department.
 *     tags:
 *       - Department
 *     description: Create a new department with the provided details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Department details to add.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               contact:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully added the department.
 *       '400':
 *         description: Invalid Error.
 */
router.post("/add", protect, protectAdmin, addDetails);

/**
 * @swagger
 * /department/update:
 *   put:
 *     summary: Update department details.
 *     tags:
 *       - Department
 *     description: Update the details of a department with the provided ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The ID of the department to update.
 *         required: true
 *         schema:
 *           type: string
 *       - name: details
 *         in: body
 *         description: Updated department details.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 description:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Successfully updated the department details.
 *       '400':
 *         description: Invalid Error.
 */

router.put("/update", protect, protectAdmin, updateDetails);

/**
 * @swagger
 * /department/delete:
 *   delete:
 *     summary: Delete a department.
 *     tags:
 *       - Department
 *     description: Delete a department by its ID. This will also remove the department from any related workers' roles.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The ID of the department to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Successfully deleted the department.
 *       '400':
 *         description: Invalid Error.
 */

router.delete("/delete", protect, protectAdmin, deleteDepartment);
module.exports = router;
