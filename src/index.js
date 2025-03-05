import express from 'express';
import init from './loaders/express-loader.js';

const server = express();
const PORT = process.env.PORT || 3000;

// Inicializar configuraciones del servidor
init(server);

// Iniciar servidor en el puerto definido
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});