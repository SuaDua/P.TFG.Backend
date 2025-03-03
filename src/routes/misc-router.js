import { Router } from 'express';
import { pingController, htmlController } from '../controllers/misc-controller.js';

const router = Router();

router.get('/ping', pingController);
router.get('/html', htmlController);

export default router;
