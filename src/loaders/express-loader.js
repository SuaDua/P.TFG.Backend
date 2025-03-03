import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import router from '../routes/index.js';
import { errorMiddleware } from '../middlewares/error-middleware.js';
import { morganMiddleware } from '../config/morgan.js';
import { swaggerDoc } from '../openapi/index.js';

export default function(server){   
    /* Config */
    server.use(cors());
    server.use(helmet()); // Seguridad
    server.use(express.json());
    server.use(express.urlencoded({ extended: true}));
    server.use(compression()); // Compresión
    /* Rate Limiting */
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100 // límite de 100 solicitudes por IP
    });
    server.use(limiter);
    /* Static files */
    server.use(express.static('public'));
    /* Swagger */
    server.get('/docs', (req, res) => res.send(swaggerDoc));
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    /* MDW */
    server.use(morganMiddleware);
    /* Routes */
    server.use(router);
    /* Error handler */
    server.use(errorMiddleware);
}
