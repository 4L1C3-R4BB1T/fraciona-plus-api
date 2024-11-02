import { Request, Response, Router } from "express";
import userAchievementsModel from '../models/user_achievement.model';
import userStatisticsModel from "../models/user_statistics.model";
import { AuthUtil } from "../../utils/auth-util";

const routes = Router();

routes.delete('/delete', async (req: Request, res: Response) => {
    try {
        const userId = AuthUtil.getLoggedUser(req, 'uid');

        await userStatisticsModel.deleteOne({ userId });
        await userAchievementsModel.deleteMany({ userId });

        res.status(200).json({ message: "Usuário e dados relacionados deletados com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar o usuário e dados relacionados:", error);
        res.status(500).json({ error: "Erro ao deletar o usuário e dados relacionados." });
    }
});

export default routes;
