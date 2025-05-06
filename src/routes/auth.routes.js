import express from 'express';
import { login, register, recoverPassword } from '../controllers/login-controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/recover-password', recoverPassword);

export default router;