import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  create_at: { type: Date, default: Date.now },
});

const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;