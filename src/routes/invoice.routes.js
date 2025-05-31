import express from 'express';
import {
  createInvoice,
  getMyInvoices,
  deleteInvoiceById,
  getAllInvoices
} from '../controllers/invoice.controller.js';

import verifyToken from '../middlewares/verifytoken.js';
import checkRole from '../middlewares/checkRole.js';

const router = express.Router();

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Crear una factura (solo comprador)
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Factura creada con éxito
 */
router.post('/', verifyToken, checkRole('comprador'), createInvoice);

/**
 * @swagger
 * /invoices/mine:
 *   get:
 *     summary: Obtener las facturas del usuario logueado
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facturas del comprador
 */
router.get('/mine', verifyToken, getMyInvoices);

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Obtener todas las facturas (solo admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de facturas
 */
router.get('/', verifyToken, checkRole('admin'), getAllInvoices);

/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Eliminar una factura por ID (solo admin)
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
 *         description: Factura eliminada
 */
router.delete('/:id', verifyToken, checkRole('admin'), deleteInvoiceById);

export default router;