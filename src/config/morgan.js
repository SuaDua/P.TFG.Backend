import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import router from '../routes/index.js';
import { errorMiddleware } from '../middlewares/error-middleware.js';
import { morganMiddleware } from '../config/morgan.js';
import { swaggerDoc } from '../openapi/index.js';

export default function(server){   
    /* Config */
    server.use(cors()); // Habilita CORS
    server.use(express.json()); // Parseo de JSON
    server.use(express.urlencoded({ extended: true})); // Parseo de URL-encoded
    /* Static files */
    server.use(express.static('public')); // Archivos estáticos
    /* Swagger */
    server.get('/docs', (req, res) => res.send(swaggerDoc)); // Documentación de Swagger en JSON
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // Interfaz de Swagger UI
    /* MDW */
    server.use(morganMiddleware); // Middleware de Morgan para registro de solicitudes
    /* Routes */
    server.use(router); // Enrutador principal
    /* Error handler */
    server.use(errorMiddleware); // Middleware de manejo de errores
}


