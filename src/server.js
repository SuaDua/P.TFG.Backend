const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Si usas archivo .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Conexión a MongoDB Atlas (cadena de conexión sin espacios y con base de datos)
mongoose.connect("mongodb+srv://alvarosuarez:Alvaro%2A2@cluster0.ianhh.mongodb.net/coches", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// Rutas
const carRoutes = require('./routes/cars.routes.js');
app.use('/api/cars', carRoutes);  // Ruta base para API de coches

// ✅ Nueva ruta de autenticación
const authRoutes = require('./routes/auth.routes.js');
app.use('/api/auth', authRoutes);  // Ruta base para autenticación (login, register, etc.)

// Nueva ruta para favoritos
const favoriteRoutes = require('./routes/favorite.routes');
app.use('/api/favorites', favoriteRoutes);

//Nueva ruta  para la factura
const invoiceRoutes = require('./routes/invoice.routes');
app.use('/api/invoices', invoiceRoutes);

// Puerto
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

