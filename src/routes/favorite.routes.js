const exppress = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller.js');


router.post('/',favoriteController.addFavorite);
router.get('/:user_id', favoriteController.getFavoritesByUser);
router.delete('favoriteController.deleteFavorite');

module.exports = router;

