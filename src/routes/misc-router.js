import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Get user login status
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns the login status of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Logged in"
 *       401:
 *         description: User not logged in
 * 
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
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
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 * 
 *   put:
 *     summary: Update user login credentials
 *     tags: [Auth]
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
 *         description: User credentials updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User credentials updated"
 *       400:
 *         description: Bad request
 * 
 *   delete:
 *     summary: Delete user session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out"
 *       401:
 *         description: User not logged in
 */

router.get('/login', (req, res) => {
    res.json({ status: "Logged in" });
});

router.post('/login', (req, res) => {
    // Lógica de login aquí
    res.json({ token: "jwt_token_example" });
});

router.put('/login', (req, res) => {
    // Lógica para actualizar credenciales
    res.json({ message: "User credentials updated" });
});

router.delete('/login', (req, res) => {
    // Lógica para cerrar sesión
    res.json({ message: "User logged out" });
});

export default router;