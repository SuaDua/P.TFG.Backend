const Invoice = require('../models/invoice.model');


exports.createInvoice = async (req, res) => {
  try {
    const { buyer_id, seller_id, car_id, price, payment_method } = req.body;

    const newInvoice = new Invoice({
      buyer_id,
      seller_id,
      car_id,
      price,
      payment_method
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la factura', error });
  }
};


exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('buyer_id', 'name email')
      .populate('seller_id', 'name email')
      .populate('car_id');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener facturas', error });
  }
};


exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('buyer_id', 'name email')
      .populate('seller_id', 'name email')
      .populate('car_id');

    if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la factura', error });
  }
};