import Invoice from '../models/Invoice.js';
import Car from '../models/car.js';
import User from '../models/user.js';

// POST: Crear una factura de compra
export const createInvoice = async (req, res) => {
  try {
    const { seller_id, car_id, payment_method } = req.body;
    const buyer_id = req.user.id;

    const car = await Car.findById(car_id);
    if (!car) {
      return res.status(404).json({ message: 'Coche no encontrado' });
    }

    const invoice = new Invoice({
      buyer_id,
      seller_id,
      car_id,
      price: car.price,
      payment_method,
    });

    await invoice.save();
    res.status(201).json({ message: 'Factura creada con éxito', invoice });
  } catch (error) {
    console.error('❌ Error al crear factura:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// GET: Obtener facturas del usuario logueado
export const getMyInvoices = async (req, res) => {
  try {
    const buyer_id = req.user.id;
    const invoices = await Invoice.find({ buyer_id })
      .populate('car_id')
      .populate('seller_id', 'username');
    res.json(invoices);
  } catch (error) {
    console.error('❌ Error al obtener facturas del usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// GET: Obtener todas las facturas (solo admin)
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('car_id')
      .populate('buyer_id', 'username')
      .populate('seller_id', 'username');
    res.json(invoices);
  } catch (error) {
    console.error('❌ Error al obtener todas las facturas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// DELETE: Eliminar una factura por ID (solo admin)
export const deleteInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }

    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Factura eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar factura:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
