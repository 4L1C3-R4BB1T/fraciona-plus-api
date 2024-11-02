import { Request, Response, Router } from "express";
import { AuthUtil } from "../../utils/auth-util";
import achievementsModel from "../models/achievements.model";
import userAchievementsModel from '../models/user_achievement.model';
import userStatisticsModel from '../models/user_statistics.model';

const routes = Router();

// routes.get('/', async (req: Request, res: Response) => {
//     console.log(req['user']) // ou seja toda requisiççao que for feita, eu tenho o id do usuario e como eu pego informaçoões dele?
//     // simples, usando o firebaseadmin
//     console.log(await firebaseAdmin.auth().getUser(req['user'].uid));
//     // ou seja oq eu posso fazer pegar as conquistas de 1 usuario?
//     // eu sei que sempre vai ter o usuario logado e eu vou ter o req['user']
//     // pego o id do usuario e busco as conquistas dele.
//     // q ta aonde?
//     // achievement_user  e como seria isso?
//     achievementUser.find({ userId: req['user']['id'] }); // aqui eu busco todas as coquistas do usuario, entendeu?s


//     // vc pode usar um background job pra ficar verificando se o usuario atingiu determinado meta e ir setando as conquistas conforme
//     // ele for cumprindo, background job roda sozinho, tipo um while true, agr se vira.;

//     const achievements = await achievementsModel.find();
//     const result = achievements.map(doc => {
//         const obj = doc.toObject();
//         return {
//             id: obj._id,
//             title: obj.title,
//             content: obj.content,
//             imageUrl: obj.imageUrl,
//         }
//     });
//     res.json(result);
// });

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

        achievementsModel.find();
        
    } catch (error) {
        console.error('Erro ao verificar conquistas:', error);
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
        console.error('Erro ao buscar conquistas do usuário:', error);
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
        console.error('Erro ao buscar conquistas do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar conquistas do usuário' });
    }
});

export default routes;