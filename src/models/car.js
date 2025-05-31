import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  mileage: { type: Number, required: true },
  fuel_type: { type: String, enum: ["Gasolina", "Diésel", "Eléctrico", "Híbrido"], required: true },
  transmission: { type: String, enum: ["Manual", "Automático"], required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["Disponible", "Vendido"], default: "Disponible" },
  created_at: { type: Date, default: Date.now },
  image: { type: String }
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);
export default Car;