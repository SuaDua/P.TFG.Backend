import express from 'express';
import verifyToken from '../middlewares/verifytoken.js';
import checkRole from '../middlewares/checkRole.js';
import User from '../models/user.js';
import Car from '../models/car.js';
import Invoice from '../models/Invoice.js';
import { getAdminDashboard } from '../controllers/admin.controller.js';

const router = express.Router();

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/users', verifyToken, checkRole('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

/**
 * @swagger
 * /admin/invoices:
 *   get:
 *     summary: Obtener todas las facturas (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facturas
 */
router.get('/invoices', verifyToken, checkRole('admin'), async (req, res) => {
  const invoices = await Invoice.find().populate('buyer_id seller_id car_id');
  res.json(invoices);
});

/**
 * @swagger
 * /admin/cars/{id}:
 *   delete:
 *     summary: Eliminar coche por ID (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coche eliminado
 */
router.delete('/cars/:id', verifyToken, checkRole('admin'), async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: 'Coche eliminado por admin' });
});

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete('/users/:id', verifyToken, checkRole('admin'), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Usuario eliminado por admin' });
});

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Obtener estadísticas del panel admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas generales
 */
router.get('/dashboard', verifyToken, checkRole('admin'), getAdminDashboard);

export default router;