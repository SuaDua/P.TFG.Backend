const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }
});

module.exports = mongoose.model("Favorite", favoriteSchema);
