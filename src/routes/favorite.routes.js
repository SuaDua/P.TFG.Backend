import express from 'express';
import { addFavorite, getFavoritesByUser, deleteFavorite } from '../controllers/favorite.controller.js';

const router = express.Router();

router.post('/', addFavorite);
router.get('/:user_id', getFavoritesByUser);
router.delete('/:id', deleteFavorite);

export default router;


