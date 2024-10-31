import { Request, Response, Router } from "express";
import achievementsModel from "../models/achievements.model";
import userAchievementsModel from '../models/user_achievement.model';

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

// // retorna todas as conquistas, se foram ganhas ou não
// routes.get('/', async (req: Request, res: Response) => {
//     try {
//         const userId = req['user'].uid;

//         const userAchievements = await userAchievementsModel.find({ userId: userId });
//         const userAchievementIds = new Set(userAchievements.map(ach => ach.achievementId.toString()));

//         const allAchievements = await achievementsModel.find();

//         const achievementsWithDisabled = allAchievements.map(globalAchievement => {
//             const achievementObj = {
//                 ...globalAchievement.toObject(),
//                 disabled: !userAchievementIds.has(globalAchievement._id.toString())
//             };
//             return achievementObj;
//         });

//         res.json(achievementsWithDisabled);
//     } catch (error) {
//         console.error('Erro ao buscar conquistas do usuário:', error);
//         res.status(500).json({ error: 'Erro ao buscar conquistas do usuário' });
//     }
// });

// Rota para buscar conquistas 
// Diz se o usuario obteve ou não a conquista
routes.get('/', async (req: Request, res: Response) => {
    try {
        const userId = req['user'].uid;

        // Busca as conquistas do usuário
        const userAchievements = await userAchievementsModel.find({ userId: userId });

        // Cria um mapa onde a chave é o achievementId e o valor é o createdAt
        const userAchievementMap = new Map(
            userAchievements.map(ach => [ach.achievementId.toString(), ach.createdAt])
        );

        // Busca todas as conquistas
        const allAchievements = await achievementsModel.find();

        const achievementsWithDetails = allAchievements.map(globalAchievement => {
            // Obtenha a data de criação se o usuário possuir a conquista
            const createdAt = userAchievementMap.get(globalAchievement._id.toString());

            // Cria o objeto de conquista
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

        // Busca as conquistas do usuário
        const userAchievements = await userAchievementsModel.find({ userId: userId });

        // Cria um conjunto de achievementIds que o usuário conquistou
        const userAchievementIds = new Set(userAchievements.map(ach => ach.achievementId.toString()));

        // Busca todas as conquistas disponíveis
        const allAchievements = await achievementsModel.find();

        // Filtra as conquistas do usuário para incluir apenas o título e a imagem
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