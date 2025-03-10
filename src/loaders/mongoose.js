import mongoose from 'mongoose';
import config from '../config.js'; // Asegúrate de tener la URL de MongoDB en tu configuración

export default async function connectDB() {
    try {
        await mongoose.connect(config.db.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('🚀 Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
}