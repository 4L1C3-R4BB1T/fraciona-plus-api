import { Request, Response, Router } from "express";
import { AuthUtil } from "../../utils/auth-util";
import userAchievementsModel from '../models/user_achievement.model';
import userStatisticsModel from "../models/user_statistics.model";

const routes = Router();

routes.delete('/', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid');
        
        await userStatisticsModel.deleteOne({ userId });
        await userAchievementsModel.deleteMany({ userId });
        
        res.status(200).json({ message: "Usuário e dados relacionados deletados com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar o usuário e dados relacionados." });
    }
});

export default routes;
