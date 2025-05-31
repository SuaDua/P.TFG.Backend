import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  price: { type: Number, required: true },
  payment_method: { type: String, enum: ["Transferencia", "Tarjeta", "Efectivo"], required: true },
  created_at: { type: Date, default: Date.now }
});

const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
export default Invoice;