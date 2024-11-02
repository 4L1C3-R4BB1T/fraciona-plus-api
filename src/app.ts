import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import firebaseAdmin from 'firebase-admin';
import mongoose from 'mongoose';
import * as path from 'node:path';
import firebaseAuthMiddleware from './infra/middlewares/firebase-auth.middleware';
import achievementRoutes from './infra/routes/achievements.route';
import challengeRoutes from './infra/routes/challenge.route';
import rankingRoutes from './infra/routes/ranking.route';
import statisticsRoutes from './infra/routes/statistics.route';
import userRoutes from './infra/routes/user.route';
import { populateDB } from './utils/populate';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => bootstrap())
    .catch(error => console.log(error));

async function bootstrap() {
    // Inicializando o Firebase 
    firebaseAdmin.initializeApp({
        // credential: firebaseAdmin.credential.cert(process.env.FIREBASE_SECRET_KEY!),
        credential: firebaseAdmin.credential.cert(JSON.parse(process.env.FIREBASE_SECRET_KEY!)),
    });
    
    const port = process.env.PORT ?? '3000';

    const app = express();
    
    // Middlewares
    app.use(cors());
    app.use(express.json());

    app.use('/public', express.static(path.resolve('public')));
    
    // Middleware de autenticação, obriga que o token seja disponibilizado
    app.use(firebaseAuthMiddleware);
    
    // Registrar rotas
    app.use('/achievements', achievementRoutes);
    app.use('/statistics', statisticsRoutes);
    app.use('/ranking', rankingRoutes);
    app.use('/user', userRoutes);
    app.use('/challenges', challengeRoutes);
    
    // Global Exception Handler
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof Error) {
            return res.json({
                error: error.message,
            });
        }
        res.json({
            error: 'Sorry, an error was occurred but we are work for repair it.',
        });
    });
    
    populateDB();

    app.listen(port, () => console.log(`Servidor aberto em http://localhost:${port}`));
}
