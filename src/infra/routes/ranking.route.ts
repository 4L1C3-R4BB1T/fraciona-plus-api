import { Request, Response, Router } from "express";
import firebaseAdmin from 'firebase-admin';
import { AuthUtil } from "../../utils/auth-util";
import userStatisticsModel from "../models/user_statistics.model";

const routes = Router();

// Rota para retornar o ranqueamento de usuários
routes.get('/', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid');        
                
        const userStatistics = await userStatisticsModel.find()
            .sort({ totalExp: -1, createdAt: 1 }).limit(100);

        const response = await Promise.all(
            userStatistics.map(async (statistics) => {
                const userRecord = await firebaseAdmin.auth().getUser(statistics.userId);
                return {
                    name: userRecord.displayName,
                    totalExp: statistics.totalExp,
                    isCurrentUser: statistics.userId === userId
                };
            })
        );

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estatísticas do usuário' });
    }
});

// Rota para retornar do ranking do usuário pelo ID
routes.get('/user', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid') as string;      
        const userRecord = await firebaseAdmin.auth().getUser(userId);
        
        const allStatistics = await userStatisticsModel.find().sort({ totalExp: -1 });
        const userPosition = allStatistics.findIndex(stat => stat.userId === userId);

        if (userPosition === -1) {
            return res.status(404).json({ message: 'Estatísticas do usuário não encontradas' });
        }

        const userStatistics = allStatistics[userPosition];

        res.json({
            ...userStatistics.toObject(),
            name: userRecord.displayName,
            position: userPosition + 1
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estatísticas do usuário' });
    }
});

export default routes;