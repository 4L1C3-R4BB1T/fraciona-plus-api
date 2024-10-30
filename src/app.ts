import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import firebaseAdmin from 'firebase-admin';
import mongoose from 'mongoose';
import registry from './core/provider-registry';
import UserService from './infra/services/user.service';
import userRoutes from './infra/routes/user.route';
import achievementRoutes from './infra/routes/achievements.route';
import * as path from 'node:path';
import achievementsModel from './infra/models/achievements.model';
import fs from 'node:fs';
import firebaseAuthMiddleware from './infra/middlewares/firebase-auth.middleware';
import userAchievementsModel from './infra/models/user_achievements.model';

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
    app.use('/users', userRoutes);
    app.use('/achievements', achievementRoutes);
    
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
    
    populateAchievements()
    populateUserAchievements()

    app.listen(port, () => console.log(`Servidor aberto em http://localhost:${port}`));
}


// function populateAchievements() {
//     fs.readdir(path.resolve('public'), 'utf-8', (err, files) => {
//         files.forEach(async file => {
//             await achievementsModel.create({
//                 title: 'a1',
//                 content: 'dsdsd',
//                 imageUrl: `http://localhost:${3000}/public/${file}`,
//             });
//         })
//     });
// }


const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const baseURL = `http://${host}:${port}/public`;

const achievements = [
    {
        title: 'Primeiros Passos',
        description: 'Complete uma atividade',
        image: `${baseURL}/anchievements/baby.png`,
        color: '#39FF14'
    },
    {
        title: 'Racha Cuca',
        description: 'Complete um desafio',
        image: `${baseURL}/anchievements/puzzle.png`,
        color: '#39FF14'
    },
    {
        title: 'Genial',
        description: 'Complete uma atividade sem erros',
        image: `${baseURL}/anchievements/brain.png`,
        color: '#00BFFF'
    },
    {
        title: 'Desbravador',
        description: 'Complete 10 atividades',
        image: `${baseURL}/anchievements/explorer.png`,
        color: '#00BFFF'
    },
    {
        title: 'Focado',
        description: 'Estude por 7 dias consecutivos',
        image: `${baseURL}/anchievements/marathon.png`,
        color: '#00BFFF'
    },
    {
        title: 'Caixinha de Surpresas',
        description: 'Complete 10 desafios',
        image: `${baseURL}/anchievements/box.png`,
        color: '#8A2BE2'
    },
    {
        title: 'Grande Amigo',
        description: 'Participou do perído de testes do aplicativo',
        image: `${baseURL}/anchievements/graduation.png`,
        color: '#FF4500'
    },
    {
        title: 'Estrela da Festa',
        description: 'Complete 100 atividades sem erros',
        image: `${baseURL}/anchievements/party.png`,
        color: '#8A2BE2',
    },
    {
        title: 'Mestre das Frações',
        description: 'Complete 200 atividades sem erros',
        image: `${baseURL}/anchievements/wizard.png`,
        color: '#8A2BE2',
    }
];

async function populateAchievements() {
    try {
        // Conta o número de documentos na collection
        const count = await achievementsModel.countDocuments({});
        // Popula a collection apenas se estiver vazia
        if (count === 0) {
            await achievementsModel.insertMany(achievements);
            console.log("Dados populados com sucesso!");
        } else {
            console.log("A collection já possui dados.");
        }
    } catch (err) {
        console.error("Erro ao popular a collection:", err);
    }
}


async function populateUserAchievements() {
    try {
        // Conta o número de documentos na collection
        const count = await userAchievementsModel.countDocuments({});

        // Popula a collection apenas se estiver vazia
        if (count === 0) {
            // Busca o achievement com o título "Grande Amigo"
            const achievement = await achievementsModel.findOne({ title: "Grande Amigo" });

            // Verifica se o achievement foi encontrado
            if (achievement) {
                // Cria um novo documento na collection userAchievements
                await userAchievementsModel.create({
                    userId: "xVcG3vhNs1azaNxgvkflxM7lHW32",
                    achievementId: achievement._id // Usa _id para pegar o ID correto
                });
                console.log("Dados populados com sucesso!");
            } else {
                console.log("Achievement não encontrado.");
            }
        } else {
            console.log("A collection já possui dados.");
        }
    } catch (err) {
        console.error("Erro ao popular a collection:", err);
    }
}
