import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import firebaseAdmin from 'firebase-admin';
import registry from './core/provider-registry';
import UserService from './infra/services/user.service';
import userRoutes from './infra/routes/user.route';

dotenv.config();

// Inicializando o Firebase 
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(process.env.FIREBASE_SECRET_KEY),
});

const port = process.env.PORT ?? '3000';

const app = express();

// Injeção de Dependência
registry.register(UserService.name, new UserService());

// middlewares
app.use(cors());

// Registrar rotas
app.use('/users', userRoutes);

app.listen(port, () => console.log(`Servidor aberto em http://localhost:${port}`))