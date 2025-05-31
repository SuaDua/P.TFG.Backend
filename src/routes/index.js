import { Router } from 'express';
import miscRouter from './misc-router.js';
import userRouter from './user.router.js'; // Import the new user router

const router = Router();

router.use('/misc', miscRouter); // Agrega las rutas necesarias
router.use('/users', userRouter); // Add the new user router

export default router; // ✅ Exportamos `default`