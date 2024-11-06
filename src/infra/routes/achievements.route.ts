import { Request, Response, Router } from "express";
import { AuthUtil } from "../../utils/auth-util";
import achievementsModel from "../models/achievements.model";
import userAchievementsModel from '../models/user_achievement.model';
import userStatisticsModel from '../models/user_statistics.model';

const routes = Router();

// Rota para buscar conquistas, retorna se o usuário já obteve a conquista ou não 
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

        // Ordena os achievements: primeiro os que possuem 'obtainedAt' (mais recentes primeiro), depois os que não possuem
        const sortedAchievements = achievementsWithDetails.sort((a, b) => {
            // Se ambos têm ou não têm 'obtainedAt', não há diferença
            if (a.obtainedAt && b.obtainedAt) {
                const dateA = new Date(a.obtainedAt);
                const dateB = new Date(b.obtainedAt);
                return dateB.getTime() - dateA.getTime(); // Ordena da data mais recente para a mais antiga
            }
            // Se um tem 'obtainedAt' e o outro não, coloca o que tem na frente
            if (a.obtainedAt && !b.obtainedAt) return -1;
            if (!a.obtainedAt && b.obtainedAt) return 1;
            return 0; // Se ambos não têm 'obtainedAt', a ordem é mantida
        });

        res.json(sortedAchievements);
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

// Rota para verificar se o usuário atingiu as conquistas
routes.get('/check-achievements', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid') as string;
        const userStatistics = await userStatisticsModel.findOne({ userId });

        if (!userStatistics) {
            return res.status(404).json({ message: 'Estatísticas não encontradas para o usuário.' });
        }

        const achievements = await achievementsModel.find();

        const updateUserAchievements = async (type: string, goal: number, obj: any) => {
            if (await userAchievementsModel.findOne(obj)) return; // Se já obtido, não faz nada
            const conditions = {
                'no-error': userStatistics.correctAnswers >= goal,
                'learning': (userStatistics.wrongAnswers + userStatistics.correctAnswers) >= goal,
                'challenge': userStatistics.challengesCompleted >= goal,
                'trial-period': userStatistics.createdAt < new Date('2024-11-18'),
                'consecutive-days': userStatistics.offensive >= goal
            };
            if (conditions[type]) {
                await userAchievementsModel.create(obj);
                await userStatisticsModel.findOneAndUpdate({ userId }, { $inc: { qttAchievements: 1 } });
            }
        };

        const promises = achievements.map(({ type, goal, _id }) => {
            const obj = { userId, achievementId: _id };
            return updateUserAchievements(type, goal, obj);
        });

        await Promise.all(promises);

        res.status(200).json({ message: 'Conquistas verificadas com sucesso' });
    } catch (error) {
        console.error('Erro ao verificar conquistas:', error);
        res.status(500).json({ error: 'Erro ao verificar conquistas' });
    }
});


export default routes;