import express from 'express';
import {
  getAllCars,
  getCarById,
  createCar,
  uploadCarWithImage,
  updateCar,
  deleteCar
} from '../controllers/cars.controller.js';

import verifyToken from '../middlewares/verifytoken.js';
import checkRole from '../middlewares/checkRole.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Obtener todos los coches
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Lista de coches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', getAllCars);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Obtener un coche por ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coche encontrado
 *       404:
 *         description: Coche no encontrado
 */
router.get('/:id', getCarById);

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Crear un coche (solo vendedores)
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Coche creado
 */
router.post('/', verifyToken, checkRole('vendedor'), createCar);


router.post('/upload', verifyToken, upload.single('image'), uploadCarWithImage);
router.put('/:id', verifyToken, updateCar);
router.delete('/:id', verifyToken, deleteCar);

export default router;


