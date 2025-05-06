const Favorite = require('../models/favorite.model');


exports.addFavorite = async (req, res) => {
  try {
    const { user_id, car_id } = req.body;

    const alreadyExists = await Favorite.findOne({ user_id, car_id });
    if (alreadyExists) {
      return res.status(400).json({ message: 'El coche ya está en favoritos' });
    }

    const favorite = new Favorite({ user_id, car_id });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir favorito', error });
  }
};


exports.getFavoritesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const favorites = await Favorite.find({ user_id }).populate('car_id');
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error });
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.json({ message: 'Favorito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar favorito', error });
  }
};