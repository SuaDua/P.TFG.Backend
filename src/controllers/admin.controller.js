import User from '../models/user.js';
import Car from '../models/car.js';
import Invoice from '../models/Invoice.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const [userCount, carCount, invoiceCount] = await Promise.all([
      User.countDocuments(),
      Car.countDocuments(),
      Invoice.countDocuments(),
    ]);

    const totalRevenue = await Invoice.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const mostSoldCars = await Invoice.aggregate([
      { $group: { _id: "$car_id", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "cars",
          localField: "_id",
          foreignField: "_id",
          as: "car"
        }
      },
      { $unwind: "$car" },
      {
        $project: {
          _id: 0,
          model: "$car.model",
          brand: "$car.brand",
          timesSold: "$count"
        }
      }
    ]);

    res.json({
      users: userCount,
      cars: carCount,
      invoices: invoiceCount,
      totalRevenue: totalRevenue[0]?.total || 0,
      mostSoldCars
    });

  } catch (error) {
    console.error("❌ Error en dashboard:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};