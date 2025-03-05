import { Router } from 'express';
import miscRouter from './misc-router.js';

const router = Router();

router.use('/misc', miscRouter); // Agrega las rutas necesarias

export default router; // ✅ Exportamos `default`