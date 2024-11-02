import { Request, Response, Router } from "express";
import { AuthUtil } from "../../utils/auth-util";
import achievementsModel from "../models/achievements.model";
import userAchievementsModel from '../models/user_achievement.model';
import userStatisticsModel from '../models/user_statistics.model';

const routes = Router();

// Rota para verificar se o usuário atingiu as conquistas
routes.get('/check-achievements', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid') as string;
        const userStatistics = await userStatisticsModel.findOne({ userId });

        if (!userStatistics) {
            return res.status(404).json({ message: 'Estatísticas não encontradas para o usuário.' });
        }  

        const achievements = await achievementsModel.find(); 

        // userId: String,
        // correctAnswers: Number,
        // wrongAnswers: Number,
        // qttAchievements: Number,
        // totalExp: Number

        // Pesquisar pelo tipo 

        for (const { type, goal } of achievements) {
            // Tipo isso, se for true o usuario adquire a conquista
            if (type === 'no-wrong' && userStatistics.wrongAnswers >= goal) {
                
            }            
        }

        // achievementsModel.find();
        
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar conquistas.' });
    }
});

// Rota para buscar conquistas, retorna se o usuario já obteve a conquista ou não 
routes.get('/', async (req: Request, res: Response) => {
    try {
        const userId = req['user'].uid;

        const userAchievements = await userAchievementsModel.find({ userId: userId });
        const userAchievementMap = new Map(
            userAchievements.map(ach => [ach.achievementId.toString(), ach.createdAt])
        );

        const allAchievements = await achievementsModel.find();

        const achievementsWithDetails = allAchievements.map(globalAchievement => {
            const createdAt = userAchievementMap.get(globalAchievement._id.toString());
            const achievementObj = {
                ...globalAchievement.toObject(),
                disabled: !createdAt, // Se createdAt for undefined, o achievement está desabilitado
                obtainedAt: createdAt ? createdAt.toLocaleDateString('pt-BR') : null // Formata a data
            };
            return achievementObj;
        });

        res.json(achievementsWithDetails);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar conquistas do usuário' });
    }
});

// Rota para buscar conquistas por ID do usuário
routes.get('/user', async (req: Request, res: Response) => {
    try {
        const userId = req['user'].uid;

        const userAchievements = await userAchievementsModel.find({ userId: userId });
        const userAchievementIds = new Set(userAchievements.map(ach => ach.achievementId.toString()));

        const allAchievements = await achievementsModel.find();

        const achievementsWithDetails = allAchievements
            .filter(globalAchievement => userAchievementIds.has(globalAchievement._id.toString()))
            .map(globalAchievement => ({
                image: globalAchievement.image,
                color: globalAchievement.color
            }));

        res.json(achievementsWithDetails);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar conquistas do usuário' });
    }
});

export default routes;