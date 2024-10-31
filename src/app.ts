import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import firebaseAdmin from 'firebase-admin';
import mongoose from 'mongoose';
import * as path from 'node:path';
import registry from './core/provider-registry';
import firebaseAuthMiddleware from './infra/middlewares/firebase-auth.middleware';
import achievementRoutes from './infra/routes/achievements.route';
import statisticsRoutes from './infra/routes/statistics.route';
import UserService from './infra/services/user.service';
import { populateDB } from './utils/populate';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => bootstrap())
    .catch(error => console.log(error));

async function bootstrap() {
    // Inicializando o Firebase 
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(process.env.FIREBASE_SECRET_KEY!),
    });

    const port = process.env.PORT ?? '3000';

    const app = express();

    // Injeção de Dependência
    registry.register(UserService.name, new UserService());

    // Middlewares
    app.use(cors());

    app.use('/public', express.static(path.resolve('public')));
    
    // Middleware de autenticação, obriga que o token seja disponibilizado
    app.use(firebaseAuthMiddleware);
    
    // Registrar rotas
    app.use('/achievements', achievementRoutes);
    app.use('/statistics', statisticsRoutes);
    
    // Global Exception Handler
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof Error) {
            return res.json({
                error: error.message,
            });
        } 
        res.json({
            error: 'sorry, an error was occurred but we are work for repair it',
        });
    }); 
    
    populateDB();

    app.listen(port, () => console.log(`Servidor aberto em http://localhost:${port}`));
}
