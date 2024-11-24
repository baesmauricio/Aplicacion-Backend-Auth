const express = require("express");
const { registerUser, loginUser, verifyToken, updateUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Users]
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /verify:
 *   get:
 *     tags: [Users]
 *     summary: Verify user token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Invalid or missing token
 */
router.get("/verify", authMiddleware, verifyToken);

/**
 * @swagger
 * /update:
 *   put:
 *     tags: [Users]
 *     summary: Update user information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */
router.put("/update", authMiddleware, updateUser);

module.exports = router;
